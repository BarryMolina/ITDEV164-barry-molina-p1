import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

// control slideshow speeds
const transitionSpeed = 2;
const slideSpeed = 5;

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
  position: absolute;
  top: 5%;
  left: 22%;

  /* classes managed by TransitionGroup */
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
`

const IndexPage = ({ data }) => { 
  const [index, setIndex] = useState(0)

  const slides = data.allMarkdownRemark.nodes
  const lenSlides = slides.length - 1;

  // executes when component renders
  useEffect( () => {
    let timer

    timer = setTimeout( () => {
      nextSlide()
    }, slideSpeed * 1000)

    // clean up function is called when component unmounts
    return () => {
      clearTimeout(timer)
    }
  })

  const nextSlide = () => {
      setIndex(prevIdx => prevIdx === lenSlides ? 0 : prevIdx + 1)
  }

  // const previousSlide = () => {
  //     setIndex(prevIdx => prevIdx === 0 ? lenSlides : prevIdx - 1)
  // }

  return (
    <Layout>
      <SEO title="Home" />
      <Welcome>
        <p>My name is Emily.</p>
        <p>I paint stuff.</p>
      </Welcome>
      {/* Set component to null so TransitionGroup doesn't create a surrounding div element */}
      <TransitionGroup component={null}>
        {/* This Transition component will be swapped out by TransitionGroup when its key attribute changes. */}
        {/* Class names starting with image-* will be applied while entering and leaving */}
        <CSSTransition key={index} timeout={transitionSpeed * 1000} classNames="image">
          <ImageSlider 
            image={getImage(slides[index].frontmatter.image)}
            alt={slides[index].frontmatter.title}
          />
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