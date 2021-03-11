import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
 
import GlobalStyle from './GlobalStyle'
import Header from "./header"

const FlexContainer = styled.div`
   display: flex;
   margin-top: 1rem;
 `
 
const Content = styled.div`
  flex-grow: 1;
  padding: 1.5rem 1rem;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          artist {
            name
            full_name
          }
        }
      }
    }
  `)

  return (
    <>
    <GlobalStyle/>
      <FlexContainer>
        <Header artist={data.site.siteMetadata.artist || `Title`} />
        <Content>
          <main>{children}</main>
        </Content>
      </FlexContainer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
