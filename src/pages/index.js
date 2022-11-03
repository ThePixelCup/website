import React, { useEffect, useState } from "react"
import { Link, Script } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEthereum } from "@fortawesome/free-brands-svg-icons"
import { faLayerGroup, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";

import logo from "../assets/images/logo.png";
import logoMini from "../assets/images/logo-mini.png";
import iconImg from "../assets/images/icon.png";
import packFront from "../assets/images/pack-front.png";
import packBack from "../assets/images/pack-back.png";
import packVideo from "../assets/videos/pack-open.mp4";

import sticker1 from "../assets/images/stickers/1.png";
import sticker2 from "../assets/images/stickers/2.png";
import sticker3 from "../assets/images/stickers/3.png";
import sticker4 from "../assets/images/stickers/4.png";

import packsImg from "../assets/images/packs.png";
import albumImg from "../assets/images/album.png";
import packOpenedImg from "../assets/images/pack-opened.png";
import tradeImg from "../assets/images/trade.png";
import prizeImg from "../assets/images/prize.png";
import dividerImg from "../assets/images/divider.png";

import Social from "../components/Social";

const buttonClass = 'cursor-pointer bg-lime-400 hover:bg-lime-500 rounded-md text-neutral-900 py-2.5 px-10';

const IndexPage = () => {
  const settings = {
    dots: false,
    className: 'center',
    centerMode: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: '100px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 900,
        settings: {
          centerPadding: '60px',
          slidesToShow: 4
        }
      },
      {
        breakpoint: 750,
        settings: {
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  const [topBarFixed, fixTopBar] = useState(false);

  useEffect(() => {
    const handleScroll = event => {
      if (window && window.scrollY > 70) {
        fixTopBar(true);
      }
      if (window && window.scrollY < 70) {
        fixTopBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <Script src="https://getlaunchlist.com/js/widget-diy.js" defer />
      <div className={`fixed z-50 text-right w-full ${topBarFixed ? 'bg-neutral-900 shadow-md shadow-neutral-600' : ''}`}>
        <div className="container mx-auto max-w-6xl p-4 flex flex-row">
          <div className={`inline ${topBarFixed ? 'md:inline': 'md:hidden'}`}>
            <img className="mx-auto h-12"  src={logoMini} alt="The Pixel Cup" />
          </div>
          <div className="grow text-right">
            <span className="hidden md:inline">Already have a pack?</span> <button className="ml-4 cursor-pointer hover:bg-lime-400 border-lime-400 border text-lime-400 hover:text-neutral-900 rounded-md md:w-36 p-2.5">Connect Wallet</button>
          </div>
        </div>
      </div>
      <div className="container pt-16 md:pt-0 mx-auto max-w-6xl">
        <div className="grid grid-flow-row md:grid-cols-2 gap-4 mx-4">
          <div className="hidden md:block order-1 text-center md:text-left">
            <img className="w-1/3 md:w-1/5 inline-block mt-6" src={logo} alt="The Pixel Cup" />
          </div>
          <div className="md:row-span-3 order-1 md:order-2 md:pt-24">
            <video loop="true" autoPlay="autoplay" muted className="h-[480px] mx-auto">
              <source src={packVideo} type="video/mp4" />
              <img src={packBack} alt="The Pixel Cup Pack Back" />
              <img className="absolute top-0" src={packFront} alt="The Pixel Cup Pack Front" />
            </video>
          </div>
          <div className="order-2 md:order-3 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl mt-6 mx-4 md:mx-0 font-semibold lg:pr-16">The first fully decentralized NFT sticker album</h1>
            <p className="text-neutral-300 mt-4 md:mt-8 lg:pr-16 ">Mint a pack to get a random set of stickers. Collect the unique 96 pixel jerseys from the WC 2022 teams and win the ca$h pool prize. </p>
            <button className={`${buttonClass} mt-8`}>Buy a Pack</button>
            <div className="flex mt-12">
              <div className="w-1/5 md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0">
                <div className="md:inline md:w-14 md:h-14 text-center pt-1"><FontAwesomeIcon className="text-neutral-300 text-5xl" icon={faEthereum} /></div>
                <div className="md:w-24 md:h-14 text-center md:text-left text-3xl">0.01 <span className="text-sm block">eth / pack</span></div>
              </div>
              <div className="w-2/5 md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0">
                <div className="md:inline md:w-20 md:h-14 text-center pt-1"><FontAwesomeIcon className="text-neutral-300 text-5xl" icon={faLayerGroup} /></div>
                <div className="md:w-32 md:h-14 text-center md:text-left text-3xl">10,000 <span className="text-sm block">packs left</span></div>
              </div>
              <div className="w-2/5 md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0">
                <div className="md:inline md:w-20 md:h-14 text-center pt-1"><FontAwesomeIcon className="text-neutral-300 text-5xl" icon={faSackDollar} /></div>
                <div className="md:w-32 md:h-14 text-center md:text-left text-3xl">$1,234 <span className="text-sm block">1.1 eth pool prize</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 overflow-auto">
          <Slider {...settings}>
            <div className="mx-4 !w-40 md:!w-36">
              <img className="" src={sticker1} alt="The Pixel Cup Sticker" />
            </div>
            <div className="mx-4 !w-40 md:!w-36">
              <img className="" src={sticker2} alt="The Pixel Cup Sticker" />
            </div>
            <div className="mx-4 !w-40 md:!w-36">
              <img className="" src={sticker3} alt="The Pixel Cup Sticker" />
            </div>
            <div className="mx-4 !w-40 md:!w-36">
              <img className="" src={sticker4} alt="The Pixel Cup Sticker" />
            </div>
            <div className="mx-4 !w-40 md:!w-36">
              <img className="" src={sticker1} alt="The Pixel Cup Sticker" />
            </div>
            <div className="mx-4 !w-40 md:!w-36">
              <img className="" src={sticker2} alt="The Pixel Cup Sticker" />
            </div>
            <div className="mx-4 !w-40 md:!w-36">
              <img className="" src={sticker3} alt="The Pixel Cup Sticker" />
            </div>
            <div className="mx-4 !w-40 md:!w-36">
              <img className="" src={sticker4} alt="The Pixel Cup Sticker" />
            </div>
          </Slider>
        </div>
        <div className="mt-20">
          <h2 className="text-4xl text-center mt-24 mx-4 md:mx-0 font-semibold">How it works</h2>
          <p className="text-neutral-300 mt-4 md:mt-8 mx-6 text-center">
            Collect the unique 96 pixel jerseys from the WC 2022 teams and win the ca$h pool prize. &nbsp;
            <Link className="decoration-lime-400 underline underline-offset-8" to="/docs/">Read our docs.</Link>
          </p>
          <div className="grid grid-flow-row md:grid-cols-3 gap-6 gap-y-20 mt-24">
            <div className="text-center">
              <img className="mx-auto max-h-64"  src={packsImg} alt="The Pixel Cup Pack" />
              <div>
                <h3 className="text-xl md:text-2xl mt-6 mx-4 md:mx-0 font-semibold">1. Buy a Pack</h3>
                <p className="text-neutral-300 mt-2 md:mt-4">
                  Using your cyrpto wallet you can buy 1 or many packs of stickers. There are only 10,000 packs.
                </p>
              </div>
            </div>
            <div className="text-center">
              <img className="mx-auto max-h-64" src={packOpenedImg} alt="The Pixel Cup Pack Opened" />
              <div>
                <h3 className="text-xl md:text-2xl mt-6 mx-4 md:mx-0 font-semibold">2. Open a Pack</h3>
                <p className="text-neutral-300 mt-2 md:mt-4">
                  If you hold a pack in your wallet you can exchange it for 3 random stickers. &nbsp;
                  <span className="text-lime-400">Starts on Nov. 22nd.</span>
                </p>
              </div>
            </div>
            <div className="text-center">
              <img className="mx-auto max-h-64" src={albumImg} alt="The Pixel Cup Album" />
              <div>
                <h3 className="text-xl md:text-2xl mt-6 mx-4 md:mx-0 font-semibold">3. Complete the album</h3>
                <p className="text-neutral-300 mt-2 md:mt-4">
                  Collect the 96 unique stickers in your album. Only 10 albums can be completed.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center py-12 md:py-24">
          <button className={`${buttonClass}`}>Buy a Pack</button>
        </div>
        <div className="py-6 md:py-12">
          <img className="mx-auto"  src={dividerImg} alt="The Pixel Cup Pack" />
        </div>
        <div className="flex flex-col md:flex-row items-center mt-12 md:mt-24 w-10/12 mx-auto gap-y-4">
          <div className="flex-1 md:order-1 order-2">
            <h3 className="text-4xl mt-6 font-semibold">Exchange Stickers With Confidence</h3>
            <p className="text-neutral-300 mt-6">
              Duplicated sticker? You can exchange stickers with other collectors using our platform for free. Exchanges are done in the smart contract and secured by the blockchain.
            </p>
            <Link className="decoration-lime-400 underline underline-offset-8 mt-6 inline-block" to="/docs/">Learn more.</Link>
          </div>
          <div className="flex-1 md:order-2 order-1">
            <img className="w-4/5 md:w-3/5 mx-auto" src={tradeImg} alt="The Pixel Cup Sticker Trading" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-12 md:mt-36 w-10/12 mx-auto gap-y-4">
          <div className="flex-1 text-center">
            <img className="md:ml-4 md:w-3/4" src={prizeImg} alt="The Pixel Cup Sticker" />
          </div>
          <div className="flex-1">
            <h3 className="text-4xl mt-6 font-semibold">Win The Cash Prize</h3>
            <p className="text-neutral-300 mt-2 md:mt-4">
              50% of each pack sale, goes towards a pool prize. Every time someone completes the album, they can claim 50% of the available pool prize. Only 10 possible winners. The last one takes it all.
            </p>
            <Link className="decoration-lime-400 underline underline-offset-8 mt-6 inline-block" to="/docs/">Learn more.</Link>
          </div>
        </div>
        <div className="py-16 md:py-36">
          <img className="mx-auto"  src={dividerImg} alt="The Pixel Cup Pack" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl text-center mx-4 md:mx-0 font-semibold">Join The Community</h2>
          <p className="text-neutral-300 mt-4 md:mt-8 md:mx-auto text-center mx-6 md:w-2/3">
            We want to create a community of sports and collectible lovers, a safe place for our holders to interact and enjoy the biggest football competition in the world together. We will create unique and fun activities for our community members to win virtual and physical prizes.
          </p>
          <Link className={`${buttonClass} inline-block mx-auto mt-12`} to="/docs/">Join Discord</Link>
        </div>
        <div className="py-16 md:py-36">
          <img className="mx-auto"  src={dividerImg} alt="The Pixel Cup Pack" />
        </div>
        <div className="p-4">
          <h2 className="text-2xl md:text-4xl text-center mx-4 md:mx-0 font-semibold">Frequently Asked Questions</h2>
          <div className="grid mt-12 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
            <div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      What do you mean by "Figma assets"?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.</p>
              </div>
              <div className="mb-10">                        
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      What does "lifetime access" exactly mean?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Once you have purchased either the design, code, or both packages, you will have access to all of the future updates based on the roadmap, free of charge.</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      How does support work?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">We're aware of the importance of well qualified support, that is why we decided that support will only be provided by the authors that actually worked on this project.</p>
                  <p className="text-gray-500 dark:text-gray-400">Feel free to <a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline" target="_blank" rel="noreferrer">contact us</a> and we'll help you out as soon as we can.</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      I want to build more than one project. Is that allowed?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">You can use Windster for an unlimited amount of projects, whether it's a personal website, a SaaS app, or a website for a client. As long as you don't build a product that will directly compete with Windster either as a UI kit, theme, or template, it's fine.</p>
                  <p className="text-gray-500 dark:text-gray-400">Find out more information by <Link to="/license" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">reading the license</Link>.</p>
              </div>
            </div>
            <div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      What does "free updates" include?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">The free updates that will be provided is based on the <a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">roadmap</a> that we have laid out for this project. It is also possible that we will provide extra updates outside of the roadmap as well.</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      What does the free version include?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">The <a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">free version</a> of Windster includes a minimal style guidelines, component variants, and a dashboard page with the mobile version alongside it.</p>
                  <p className="text-gray-500 dark:text-gray-400">You can use this version for any purposes, because it is open-source under the MIT license.</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      What is the difference between Windster and Tailwind UI?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Although both Windster and Tailwind UI are built for integration with Tailwind CSS, the main difference is in the design, the pages, the extra components and UI elements that Windster includes.</p>
                  <p className="text-gray-500 dark:text-gray-400">Additionally, Windster is a project that is still in development, and later it will include both the application, marketing, and e-commerce UI interfaces.</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      Can I use Windster in open-source projects?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Generally, it is accepted to use Windster in open-source projects, as long as it is not a UI library, a theme, a template, a page-builder that would be considered as an alternative to Windster itself.</p>
                  <p className="text-gray-500 dark:text-gray-400">With that being said, feel free to use this design kit for your open-source projects.</p>
                  <p className="text-gray-500 dark:text-gray-400">Find out more information by <Link to="/license" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">reading the license</Link>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer" className="border-t-4 border-lime-400 mt-12 bg-neutral-900">
        <div className="container mx-auto max-w-6xl p-4 items-center flex flex-row">
          <div className="flex-1 space-x-4">
            <Link className="decoration-lime-400 underline underline-offset-8" to="/docs/">Documentation</Link>
          </div>
          <div className="flex-1 text-right space-x-4">
            <Social size="2x"/>
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
