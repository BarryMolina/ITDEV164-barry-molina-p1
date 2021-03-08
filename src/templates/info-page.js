import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const InfoPage = ({ data }) => {

    return (
        <Layout>
            <div dangerouslySetInnerHTML= {{__html: data.markdownRemark.html}}></div>
        </Layout>
    )
}

export default InfoPage

export const pageQuery = graphql`
query infoPageQuery($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    html
  }
}
`