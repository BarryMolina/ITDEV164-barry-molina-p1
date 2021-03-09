import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const StyledDiv = styled.div`
  position: relative;
`
const Welcome = styled.div`
  position: absolute;
  top: 40%;
  left: 45%;
  p {
    font-size: 1.7rem;
    font-weight: 500;
    margin-bottom: 0;
  }
`
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Welcome>
      <p>My name is Emily.</p>
      <p>I paint stuff.</p>
    </Welcome>
    {/* <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p> */}
  </Layout>
)

export default IndexPage