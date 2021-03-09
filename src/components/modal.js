import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import GlobalStyle from './GlobalStyle'

const ModalContainer = styled.div`
  position: relative;
`

const CloseButton = styled.Link`
  position: absolute;
  top: 20px;
  right: 20px;

`

const Content = styled.div`
   padding: 1.5rem 1rem;
`


const Modal = ({ prevPage, children }) => {
  return (
    <>
    <GlobalStyle/>
      <ModalContainer>
        <CloseButton to={prevPage}>X</CloseButton>
        <Content>
          <main>{children}</main>
        </Content>
      </ModalContainer>
    </>
  )
}

export default Modal