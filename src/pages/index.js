import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const transitionSpeed = 2;
const slideSpeed = 5;

const StyledDiv = styled.div`
  position: relative;
`
const Welcome = styled.div`
  position: absolute;
  top: 45%;
  right: 13%;
  p {
    font-size: 1.7rem;
    font-weight: 500;
    margin-bottom: 0;
  }
`

const ImageSlider = styled(GatsbyImage)`
  /* animation: fadeIn ease 2s;
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  } */
  /* transition: opacity 1s;
  opacity: ${({ state }) => (state === "entering" || state === "entered") ? 1 : 0}; */
  position: absolute;
  top: 5%;
  left: 22%;
  &.image-enter {
    opacity: 0;
  }
  &.image-enter-active {
    opacity: 1;
    transition: opacity ${transitionSpeed}s;
  }
  &.image-exit {
    opacity: 1;
  }
  &.image-exit-active {
    opacity: 0;
    transition: opacity ${transitionSpeed}s;
  }
  /* &.image-leave-done {
    opacity: 0
  } */
`

const IndexPage = ({ data }) => { 
  const [index, setIndex] = useState(0)
  const [playSlides, setPlaySlides] = useState(true)
  // const [animate, setAnimate] = useState(false)

  const slides = data.allMarkdownRemark.nodes
  const lenSlides = slides.length - 1;
  console.log(slides)

  // executes when component renders or re-renders
  useEffect( () => {
    let timer

    if (playSlides) {
      timer = setTimeout( () => {
        // pass in a function that receives the current and then updates it
        // setIndex(currIndex => currIndex + 1)
        nextSlide()
      }, slideSpeed * 1000)
    }
    return () => {
      clearTimeout(timer)
    }
  })

  const nextSlide = () => {
    // setAnimate(false)
    // setAnimate(false)
    // setTimeout(() => { 
    //   setIndex(prevIdx => prevIdx === lenSlides ? 0 : prevIdx + 1)
    //   setAnimate(true)
    // }, 1000)
    // setAnimate(true)
      setIndex(prevIdx => prevIdx === lenSlides ? 0 : prevIdx + 1)
  }

  const previousSlide = () => {
    // setAnimate(false)
    // setTimeout(() => { 
    //   setIndex(prevIdx => prevIdx === 0 ? lenSlides : prevIdx - 1)
    //   setAnimate(true)
    // }, 1000)
    // setIndex(prevIdx => prevIdx === 0 ? lenSlides : prevIdx - 1)
    // setAnimate(true)
      setIndex(prevIdx => prevIdx === 0 ? lenSlides : prevIdx - 1)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Welcome>
        <p>My name is Emily.</p>
        <p>I paint stuff.</p>

        {/* <Transition in={animate} timeout={1000}>
          {(state) => (
            <ImageSlider state={state} image={getImage(slides[index].frontmatter.image)}/>
          )}
        </Transition> */}
        {/* <CSSTransition in={animate} timeout={2000} classNames="image">
          <ImageSlider image={getImage(slides[index].frontmatter.image)}/>
        </CSSTransition> */}
        {/* <p>We're on index {index}</p> */}
        {/* <button onClick={() => setIndex(0)}>reset</button>
        <button onClick={() => previousSlide()}>-</button>
        <button onClick={() => nextSlide()}>+</button>
        <button onClick={() => setPlaySlides(play => !play)}>toggle timer</button>
        <button onClick={() => setAnimate(animate => !animate)}>Toggle animate</button> */}
      </Welcome>
        <TransitionGroup component={null}>
          <CSSTransition key={index} timeout={transitionSpeed * 1000} classNames="image">
            <ImageSlider image={getImage(slides[index].frontmatter.image)}/>
          </CSSTransition>
        </TransitionGroup>
    </Layout>
  )
 }

export default IndexPage

export const slideQuery = graphql`
query slideQuery {
  allMarkdownRemark(
    # limit: 5
    filter: {frontmatter: {layout: {eq: "paint"}}}
    sort: {fields: frontmatter___title}
  ) {
    nodes {
      frontmatter {
        title
        slug
        year
        image {
          childImageSharp {
            gatsbyImageData(
              placeholder: NONE,
              width: 550,
            )
          }
        }
      }
    }
  }
}
`