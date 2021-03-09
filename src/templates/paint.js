import React from 'react'
import { graphql, navigate } from 'gatsby'
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
  &:hover {
    cursor: pointer;
  }
  /* box-shadow: 1px 1px 5px black; */
`

const PaintYear = ({ location, data }) => { 
  console.log(location)
    
  return (
    <Layout>
      <GridContainer>
        {
          data.allMarkdownRemark.nodes.map(node => {
            return (
              <GridItem key={node.id} >
                <GatsbyImage
                  image={getImage(node.frontmatter.image)}
                  alt={node.frontmatter.title}
                  onClick={() => navigate(`${location.pathname}${node.fields.slug}`)}
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
      id
      fields {
        slug
      }
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
    }
  }
}

`