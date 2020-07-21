import React from "react";
import styled from "styled-components";

export default function AppFooter() {
  return (
    <FooterContainer>
      <h3>rate me</h3>
      <h3>license stuff</h3>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0px;
  width: 100%;
  text-align: center;
  height: 50px;
  border: 1px solid blue;
  background: black;
  color: white;
  margin-top: 10px;
`;
