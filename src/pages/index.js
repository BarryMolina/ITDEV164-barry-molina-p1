import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Transition } from 'react-transition-group'
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const StyledDiv = styled.div`
  position: relative;
`
const Welcome = styled.div`
  position: absolute;
  top: 10%;
  left: 45%;
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
  transition: opacity 1s;
  opacity: ${({ animate }) => animate ? 1 : 0};

`

const IndexPage = ({ data }) => { 
  const [index, setIndex] = useState(0)
  const [playSlides, setPlaySlides] = useState(false)
  const [animate, setAnimate] = useState(true)

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
      }, 2000)
    }
    return () => {
      clearTimeout(timer)
    }
  })

  const nextSlide = () => {
    setIndex(prevIdx => prevIdx === lenSlides ? 0 : prevIdx + 1)
  }

  const previousSlide = () => {
    setIndex(prevIdx => prevIdx === 0 ? lenSlides : prevIdx - 1)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Welcome>
        <p>My name is Emily.</p>
        <p>I paint stuff.</p>
        {/* <Transition in={animate} timeout={500}>
          {(state) => ( */}
            <ImageSlider animate={animate} image={getImage(slides[index].frontmatter.image)}/>
          {/* )}
        </Transition> */}
        <p>We're on index {index}</p>
        <button onClick={() => setIndex(0)}>reset</button>
        <button onClick={() => previousSlide()}>-</button>
        <button onClick={() => nextSlide()}>+</button>
        <button onClick={() => setPlaySlides(play => !play)}>toggle timer</button>
        <button onClick={() => setAnimate(animate => !animate)}>Toggle animate</button>
      </Welcome>
    </Layout>
  )
 }

export default IndexPage

export const slideQuery = graphql`
query slideQuery {
  allMarkdownRemark(
    limit: 5
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
              width: 600
            )
          }
        }
      }
    }
  }
}
`