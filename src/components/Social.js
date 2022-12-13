import React from "react"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faTwitter, faGithub, faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { config } from '@fortawesome/fontawesome-svg-core';

import openseaIcon from "../assets/images/icons/opensea.svg";

// Fix issue with icons appearing big
config.autoAddCss = false; 

const Social = ({size = 'xl'}) => {
  let imgClass = '';
  switch(size) {
    case 'xl':
      imgClass = 'h-6';
      break;
    case '2x':
      imgClass = 'h-8 -mt-4';
      break;
    default:
  }

  return (
    <React.Fragment>
      <OutboundLink href="https://discord.gg/uRyYuaAd4W" rel="noreferrer" target="_blank" aria-label="Discord">
        <FontAwesomeIcon icon={faDiscord} size={size} />
      </OutboundLink>
      <OutboundLink href="https://www.instagram.com/the_pixelcup/" rel="noreferrer" target="_blank" aria-label="Instagram">
        <FontAwesomeIcon icon={faInstagram} size={size} />
      </OutboundLink>
      <OutboundLink href="https://twitter.com/the_pixelcup" rel="noreferrer" target="_blank" aria-label="Twitter">
        <FontAwesomeIcon icon={faTwitter} size={size} />
      </OutboundLink>
      <OutboundLink href="https://opensea.io/collection/the-pixel-cup" rel="noreferrer" target="_blank" aria-label="OpenSea">
        <img className={`inline ${imgClass}`} src={openseaIcon} alt="OpenSea" />
      </OutboundLink>
      <OutboundLink href="https://github.com/thepixelcup" rel="noreferrer" target="_blank" aria-label="Github">
        <FontAwesomeIcon icon={faGithub} size={size} />
      </OutboundLink>
    </React.Fragment>
  )
}

export default Social;