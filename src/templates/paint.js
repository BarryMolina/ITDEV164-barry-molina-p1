import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

const PaintYear = ({ data }) => { 
    
  console.log(data)
  return (
    <Layout>
      <ul>
        {
          data.allMarkdownRemark.nodes.map(node => {
            return (
              <li key={node.id}>
                <GatsbyImage
                  image={node.frontmatter.image.childImageSharp.gatsbyImageData}
                  alt={node.frontmatter.title}
                />
              </li>
            )
          })
        }
      </ul>
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
            gatsbyImageData
          }
        }
      }
      id
    }
  }
}

`