import React from "react"
import { Link, Script } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";

import logo from "../images/logo.png";
import packFront from "../images/pack-front.png";
import packBack from "../images/pack-back.png"

import Social from "../components/Social";

const IndexPage = () => {
  return (
    <React.Fragment>
      <Script src="https://getlaunchlist.com/js/widget-diy.js" defer />
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-flow-row md:grid-cols-2 gap-4 mx-4">
          <div className="order-1 text-center md:text-left">
            <img className="w-1/3 md:w-1/5 inline-block mt-6" src={logo} alt="The Pixel Cup" />
          </div>
          <div className="md:row-span-3 order-3 md:order-2">
            <div className="w-2/3 md:w-2/3 lg:w-3/5 relative mx-auto mt-2 md:mt-20">
              <img src={packBack} alt="The Pixel Cup Pack Back" />
              <img className="absolute top-0" src={packFront} alt="The Pixel Cup Pack Front" />
            </div>
          </div>
          <div className="order-2 md:order-3">
            <h1 className="text-2xl md:text-4xl text-center md:text-left mt-6 mx-4 md:mx-0 font-semibold lg:pr-16">The first fully decentralized NFT sticker album</h1>
          </div>
          <div className="order-4">
            <p className="text-neutral-300 mt-4 md:mt-2 lg:pr-16">Mint a pack to get a random set of stickers. Collect the unique 96 pixel jerseys from the WC 2022 teams and win the ca$h pool prize. </p>
            <p className="text-neutral-300 mt-2 md:mt-4"><Link className="decoration-lime-400 underline underline-offset-8" to="/docs/">Read the whitepaper.</Link></p>
          </div>
          <div className="order-5">
            <form className="launchlist-form" action="https://getlaunchlist.com/s/QNlPv0" method="POST">
              <div className="flex flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-2 mt-4 md:mt-6 lg:pr-16">
                <input className="grow focus:outline-none focus:border-lime-400 bg-neutral-700 border border-neutral-700 text-neutral-400 sm:text-sm rounded-md p-2.5" name="email" type="email" placeholder="Enter your email" />
                <input className="cursor-pointer bg-lime-400 hover:bg-lime-500 rounded-md text-neutral-900 md:w-36 p-2.5" type="submit" value="Join Waitlist"/>
              </div>
            </form>
            <p className="mt-4"><FontAwesomeIcon icon={faStar} size="m" className="" /> Top referrers get a place in the whitelist and a free pack. </p>
          </div>
          <div className="order-6 text-lime-400 space-x-4 text-center mt-8">
              <Social />
              <p className="mt-2 uppercase">Join The Pixel Cup Club</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>The Pixel Cup</title>
    <meta name="description" content="The first fully decentralized NFT sticker album. Collect the unique 96 pixel jerseys from the WC 2022 teams and win the ca$h pool prize." />
  </>
)
