/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

 import * as React from "react"
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
   margin: 0 auto;
   max-width: 960px;
   padding: 1.5rem 1rem;
 `
 
 const Footer = styled.div`
   margin-top: 2rem;
   margin-left: 2rem;
   position: absolute;
   bottom: 3%;
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
       <Footer>
         © {new Date().getFullYear()}, Built with
         {` `}
         <a href="https://www.gatsbyjs.com">Gatsby</a>
       </Footer>
     </>
   )
 }
 
 Layout.propTypes = {
   children: PropTypes.node.isRequired,
 }
 
 export default Layout
 