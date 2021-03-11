import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const Outer = styled.header`
  min-width: 200px;
  margin-bottom: 1.45rem;
  margin-left: 1.7rem;
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
const UnderlinedLink = styled(Link)`
  color: hsla(0, 0%, 0%, 0.8);
  text-decoration: none;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: hsla(0, 0%, 0%, 0.8);
    visibility: hidden;
    transition: all 0.2s ease-in-out;
  }
  &:hover:before {
    visibility: visible;
    width: 100%;
  }
  &.active:before {
    visibility: visible;
    width: 100%;
    transition: none;
  }
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
                    <UnderlinedLink
                      to={`/paint/${year}`}
                      activeClassName="active"
                    >{year}</UnderlinedLink>
                  </li>
                ))}
              </ul>
            </li>
            <li><UnderlinedLink to="/info" activeClassName="active">info</UnderlinedLink></li>
            <li><UnderlinedLink to="/cv" activeClassName="active">cv</UnderlinedLink></li>
          </ul>
        </Nav>
      </Inner>
    </Outer>
  );
}

export default Header