import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Modal from '../components/modal'
import Layout from '../components/layout'
import styled from "styled-components"

// const Painting = ({ data }) => {
const Painting = () => {
  // const { title, description, year, image } = data.mardownRemark.fontmatter

  return (
    // <Modal prevPage={`/paint/${year}/`}>
    <Layout>
      <div>
        <h1>title</h1>
        <p>description</p>
      </div>
    </Layout>
      // <GatsbyImage image={getImage(image)}/>
    // </Modal>
  )
}

export default Painting


// export const pageQuery = graphql`
//   query MyQuery($slug: String!) {
//     markdownRemark(fields: {slug: {eq: $slug}}) {
//       frontmatter {
//         description
//         title
//         year
//         image {
//           childImageSharp {
//             gatsbyImageData
//           }
//         }
//       }
//     }
//   }
// `


