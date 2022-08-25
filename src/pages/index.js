import * as React from "react"
import styled, { createGlobalStyle } from "styled-components"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"
import { config } from '@fortawesome/fontawesome-svg-core';
import { Script } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"

// Images
import logo from "../images/logo.png";
import packFront from "../images/pack-front.png";
import packBack from "../images/pack-back.png"
import bodyBg from "../images/bg.svg";

// Colors
const primaryColor = "#B2ED09";
const whiteColor = '#FEFEFC';
const blackColor = '#1D1D1B';
const grayColor = '#7B7B79';
const fontFamily = 'Cabin';

// Fix issue with icons appearing big
config.autoAddCss = false; 

const PageStyle = createGlobalStyle`
  body {
    background-color: ${blackColor};
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background-image: url(${bodyBg});
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: ${whiteColor};
    font-family: ${fontFamily};
  }
  .mobile-only {
    display: block;
  }
  .desktop-only {
    display: none;
  }
  @media (min-width: 768px) {
    .mobile-only {
      display: none;
    }
    .desktop-only {
      display: block;
    }
  }
  h1 {
    font-size: 24px;
    line-height: 34px;
    @media (max-width: 768px) {
      width: 300px;
      margin: 40px auto 0;
    }
  }
  p {
    font-size: 16px;
    line-height: 24px;
  }
`;
const Container = styled.div`
  text-align: center;
  width: 100%;
  padding: 40px 0;
  .logo {
    width: 90px;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    max-width: 1024px;
    margin: 0 auto;
    padding: 100px 25px;
    text-align: left;
    .logo {
      width: 120px;
    }
  }
`;

const Text = styled.div`
  width: 310px;
  margin: 40px auto;
  @media (min-width: 768px) {
    margin: 100px 0 40px;
  }
`;

const Pack = styled.div`
  background:radial-gradient(circle at 50% 50%, #000000 26%, #1D1D1B 70%);
  position: relative;
  width: 100%;
  height: 380px;
  margin-top: 40px;
  img {
    width: 300px;
    position: absolute;
    left: 50%;
    margin-left: -150px;
  }
  @media (min-width: 768px) {
    float: right;
    width: 50%;
    height: 500px;
    img {
      width: 350px;
      position: absolute;
      left: 50%;
      margin-left: -175px;
    }
  }
`;
const Social = styled.div`
  color: ${primaryColor};
  text-align: center;
  margin-top: 40px;
  @media (min-width: 768px) {
    float: right;
    width: 50%;
    margin-top: 10px;
  }
  p {
    font-family: ${fontFamily};
    text-transform: uppercase;
    font-weight: 500;
  }
  .icon {
    margin: 0 5px;
  }
  a {
    text-decoration: none;
    color: ${primaryColor};
  }
`;
const FormContainer = styled.div`
  margin-top: 40px;
  @media (min-width: 768px) {
    float: left;
  }
  .email {
    border-radius: 18px;
    font-family: ${fontFamily};
    background: transparent;
    font-size: 16px;
    padding: 4px 16px;
    width: 260px;
    color: ${whiteColor};
    border: solid 1px ${primaryColor};
    margin-right: 20px;
    ::placeholder {
      color: ${grayColor};
      opacity: 1; /* Firefox */
    }
    @media (max-width: 768px) {
      display: block;
      margin: 0 auto 20px;
    }
  }
  .submit {
    border-radius: 24px;
    font-family: ${fontFamily};
    background: ${primaryColor};
    color: ${blackColor};
    font-size: 16px;
    padding: 6px 16px;
  }
  input {
    outline: none;
    border: none;
  }
`;
const IndexPage = () => {
  return (
    <React.Fragment>
      <PageStyle/>
      <Script src="https://getlaunchlist.com/js/widget-diy.js" defer />
      <Container>
        <img className="logo" src={logo} alt="The Pixel Cup" />
        <h1 className="mobile-only">The first fully decentralized <strong>NFT</strong> sticker album</h1>
        <Pack>
          <img src={packBack} alt="The Pixel Cup Pack Back" />
          <img src={packFront} alt="The Pixel Cup Pack Front" />
        </Pack>
        <Text>
          <h1 className="desktop-only">The first fully decentralized <strong>NFT</strong> sticker album</h1>
          <p>Buy a pack, collect the unique 96 pixel jerseys from the WC 2022 teams and win the ca$h pool prize</p>
        </Text>
        <FormContainer>
          <form className="launchlist-form" action="https://getlaunchlist.com/s/QNlPv0" method="POST">
            <input className="email" name="email" type="email" placeholder="Enter your email" />
            <input className="submit" type="submit" value="Join Waitlist"/>
          </form>
        </FormContainer>
        <Social>
          {/* <FontAwesomeIcon icon={faDiscord} size="xl" className="icon" /> */}
          <OutboundLink href="https://twitter.com/the_pixelcup" rel="noreferrer" target="_blank" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} size="xl" className="icon" />
          </OutboundLink>
          <OutboundLink href="https://github.com/thepixelcup" rel="noreferrer" target="_blank" aria-label="Github">
            <FontAwesomeIcon icon={faGithub} size="xl" className="icon" />
          </OutboundLink>
          <p>Join the pixel cup club</p>
        </Social>
      </Container>
    </React.Fragment>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
