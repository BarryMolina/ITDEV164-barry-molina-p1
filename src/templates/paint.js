import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import styled from "styled-components"

const GridContainer = styled.div`
  display: grid;
  grid-column-gap: 1.3rem;
  grid-row-gap: 1.3rem;
  grid-template-columns: auto auto auto;
`

const GridItem = styled.div`
  /* box-shadow: 1px 1px 5px black; */
`

const PaintYear = ({ data }) => { 
    
  return (
    <Layout>
      <GridContainer>
        {
          data.allMarkdownRemark.nodes.map(node => {
            return (
              <GridItem key={node.id}>
                <GatsbyImage
                  image={node.frontmatter.image.childImageSharp.gatsbyImageData}
                  alt={node.frontmatter.title}
                />
              </GridItem>
            )
          })
        }
      </GridContainer>
    </Layout>
  )
}

export default PaintYear

export const pageQuery = graphql`
query paintQuery($year: Int) {
  allMarkdownRemark(
    filter: {frontmatter: {layout: {eq: "paint"}, year: {eq: $year}}}
  ) {
    nodes {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(
              # transformOptions: {
              #   trim: 50,
              # },
              width: 300,
              placeholder: NONE,
            )
          }
        }
      }
      id
    }
  }
}

`