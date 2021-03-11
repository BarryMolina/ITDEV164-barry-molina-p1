import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Modal from '../components/modal'
import styled from "styled-components"

import SEO from '../components/seo'

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`

const FlexItem = styled.div`
  flex: 1 1 0;
  /* border: 1px solid black; */
`

const ImageItem = styled(FlexItem)`
  flex-basis: 10%;
  flex-grow: 2;
  max-width: 600px;
`

const InfoItem = styled(FlexItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: .5rem;
`

const Info = styled.div`
  display: inline-block;
  h1 {
    display: table;
    font-size: .9rem;
    margin-bottom: .7rem;
  }
  p {
    display: table;
    margin-bottom: .1rem;
    font-size: .7rem;
    color: #666;
  }
`

// const StyledImage = styled(GatsbyImage)`
//   display: block;
//   max-width: 40%;
//   margin: 0 auto;
// `

// const ImageContainer = styled.div`
//   max-width: 50%;
// `

const Painting = ({ data }) => {
  const { title, year, image } = data.markdownRemark.frontmatter
  const { html } = data.markdownRemark

  return (
    <Modal prevPage={`/paint/${year}`}>
      <SEO title={`${title}`} />
      <FlexContainer>
        <InfoItem>
          <Info>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </Info>
        </InfoItem>
        <ImageItem>
          <GatsbyImage
            image={getImage(image)}
            alt={title}
          />
        </ImageItem>
        <FlexItem/>
      </FlexContainer>
    </Modal>
  )
}

export default Painting

export const pageQuery = graphql`
  query paintingQuery($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
        year
        image {
          childImageSharp {
            gatsbyImageData(
              placeholder: NONE,
              # width: 800
            )
          }
        }
      }
    }
  }
`


