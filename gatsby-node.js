const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { Component } = require("react")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
  query MyQuery {
    allMarkdownRemark(filter: {frontmatter: {layout: {eq: "paint"}}}) {
      distinct(field: frontmatter___year)
      nodes {
        fields {
          slug
        }
        frontmatter {
          year
        }
      }
    }
  }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading the paint data`)
    return
  }

  const years = result.data.allMarkdownRemark.distinct.map(year => parseInt(year))

  // Create a page for each year of paintings
  years.forEach(year => {
    createPage({
      path: `/paint/${year}/`,
      component: path.resolve(`./src/templates/paint.js`),
      context: {
        year: year
      }
    })
  })

  const paintings = result.data.allMarkdownRemark.nodes

  // Create the modal page for each painting
  paintings.forEach(painting => {
    createPage({
      path: `/paint/${painting.frontmatter.year}${painting.fields.slug}`,
      component: path.resolve(`./src/templates/painting.js`),
      context: {
        slug: painting.fields.slug
      }
    })
  })
}

// Not entirely sure what the rest of this stuff does but I'm leaving it

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
