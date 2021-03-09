import React from 'react'
import { graphql } from 'gatsby'
import styled from "styled-components"

import Layout from '../components/layout'
import SEO from '../components/seo'

const StyledBody = styled.div`
  padding: 0 2rem;
  max-width: 1000px;
  h1 {
    font-size: .9rem;
    /* margin-bottom: .7rem; */
  }
  p {
    margin-bottom: .5rem;
    font-size: .8rem;
    color: #666;
  }
`
const CV = ({ data }) => {

    return (
        <Layout>
            <SEO title='CV' />
            <StyledBody dangerouslySetInnerHTML= {{__html: data.markdownRemark.html}}></StyledBody>
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