// import * as React from "react"
import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const Outer = styled.header`
  margin-bottom: 1.45rem;
`

const Inner = styled.div`
  margin: 0px;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const H1 = styled.h1`
  margin: 0px;
  font-size: 1.6em;
`

const H2 = styled.h2`
  margin: 0px;
  font-size: .7em;
  padding-top: 1rem;
  padding-left: .4rem;
  opacity: .5;
`

const StyledLink = styled(Link)`
  color: hsla(0, 0%, 0%, 0.8);
  text-decoration: none;
`

const Nav = styled.nav`
 display: "flex";
 flex: 1;
 flex-direction: "column";
 padding-top: 1rem;
 ul {
  list-style-type: none;
  margin: 0;
 }
 li {
   margin-bottom: .2rem;
 }
 ul ul {
   padding-left: .3rem;
 }
`

const Header = ({ artist }) => {
  // query for distinct painting years
  const data = useStaticQuery(graphql`
    query paintYearQuery {
      allMarkdownRemark {
        distinct(field: frontmatter___year)
      }
    }
  `)

  // sort descending
  let years = data.allMarkdownRemark.distinct.sort().reverse()

  return (
    <Outer>
      <Inner>
        <H1>
          <StyledLink to="/">
            {artist.name}
          </StyledLink>
        </H1>
        <H2>{artist.full_name}</H2>
        <Nav>
          <ul>
            <li>paint</li>
            <li>
              <ul>
                {years.map(year => (
                  <li key={year}>
                    {year}
                  </li>
                ))}
              </ul>
            </li>
            <li>info</li>
            <li>cv</li>
          </ul>
        </Nav>
      </Inner>
    </Outer>
  );
}


// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header

// export const pageQuery = graphql`
// query paintYearQuery {
//   allMarkdownRemark {
//     distinct(field: frontmatter___year)
//   }
// }
// `

// export const pageQuery = graphql`
// query paintYearQuery {
//   allMarkdownRemark {
//     nodes {
//       frontmatter {
//         year(formatString: "YYYY")
//       }
//     }
//   }
// }
// `
