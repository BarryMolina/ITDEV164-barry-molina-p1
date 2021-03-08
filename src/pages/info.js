import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const Info = ({ data }) => {

    return (
        <Layout>
            <SEO title='Info' />
            <div dangerouslySetInnerHTML= {{__html: data.markdownRemark.html}}></div>
        </Layout>
    )
}

export default Info

export const query = graphql`
query {
  markdownRemark(fields: {slug: {eq: "/info/"}}) {
    html
  }
}
`