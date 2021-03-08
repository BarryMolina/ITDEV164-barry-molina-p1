import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const CV = ({ data }) => {

    return (
        <Layout>
            <SEO title='CV' />
            <div dangerouslySetInnerHTML= {{__html: data.markdownRemark.html}}></div>
        </Layout>
    )
}

export default CV

export const query = graphql`
query {
  markdownRemark(fields: {slug: {eq: "/cv/"}}) {
    html
  }
}
`