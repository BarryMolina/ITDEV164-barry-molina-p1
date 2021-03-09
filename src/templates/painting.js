import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Modal from '../components/modal'
import Layout from '../components/layout'
import styled from "styled-components"

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const Info = styled.div`
  max-width: 300px;
  h1 {
    font-size: .9rem;
  }
  p {
    font-size: .7rem;
    color: #666;
  }
  
`

const StyledImage = styled(GatsbyImage)`
  max-width: 70%;
`

// const ImageContainer = styled.div`
//   max-width: 50%;
// `

const Painting = ({ data }) => {
  const { title, description, year, image } = data.markdownRemark.frontmatter

  return (
    <Modal prevPage={`/paint/${year}`}>
      <FlexContainer>
        <Info>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </Info>
        <StyledImage
          image={getImage(image)}
          alt={title}
        />
      </FlexContainer>
    </Modal>
  )
}

export default Painting

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      frontmatter {
        description
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


