import React from "react"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faTwitter, faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { config } from '@fortawesome/fontawesome-svg-core';

// Fix issue with icons appearing big
config.autoAddCss = false; 

const Social = ({size = 'xl'}) => {
  return (
    <React.Fragment>
      <FontAwesomeIcon icon={faDiscord} size={size} />
      <OutboundLink href="https://twitter.com/the_pixelcup" rel="noreferrer" target="_blank" aria-label="Twitter">
        <FontAwesomeIcon icon={faTwitter} size={size} />
      </OutboundLink>
      <OutboundLink href="https://github.com/thepixelcup" rel="noreferrer" target="_blank" aria-label="Github">
        <FontAwesomeIcon icon={faGithub} size={size} />
      </OutboundLink>
    </React.Fragment>
  )
}

export default Social;