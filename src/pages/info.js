import React from 'react'
import { graphql } from 'gatsby'
 import styled from "styled-components"

import Layout from '../components/layout'
import SEO from '../components/seo'

const StyledBody = styled.div`
  margin-top: 3rem;
  padding: 0 2rem;
  max-width: 1000px;
  h1 {
    font-size: .9rem;
  }
  p {
    margin-bottom: .5rem;
    font-size: .8rem;
    color: #666;
  }
`
const Info = ({ data }) => {
  return (
    <Layout>
      <SEO title='Info' />
      <StyledBody dangerouslySetInnerHTML= {{__html: data.markdownRemark.html}}></StyledBody>
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