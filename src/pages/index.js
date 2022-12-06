import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons"
import { faLayerGroup, faSackDollar, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ThirdwebProvider, ChainId, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

import logo from "../assets/images/logo.png";
import packFront from "../assets/images/pack-front.png";
import packBack from "../assets/images/pack-back.png";
import packVideo from "../assets/videos/pack-open.mp4";

import packsImg from "../assets/images/packs.png";
import albumImg from "../assets/images/album.png";
import packOpenedImg from "../assets/images/pack-opened.png";
import tradeImg from "../assets/images/trade.png";
import prizeImg from "../assets/images/prize.png";
import dividerImg from "../assets/images/divider.png";

// Hooks
import useEthPrice from "../hooks/useEthPrice";

// Components
import Button from "../components/Button";
import Social from "../components/Social";
import Error from "../components/Error";
import TopBar from "../components/TopBar";
import Faq from "../components/Faq";
import StickersSlider from "../components/StickersSlider";
import WalletModal from "../components/modals/Wallet";
import PacksModal from "../components/modals/Packs";

const IndexPage = () => {
  const wallet = useAddress();
  const ethPrice = useEthPrice();
  const { contract, isLoading: isContractLoading, error: errorLoadingContract } = useContract(process.env.GATSBY_CONTRACT_ADDRESS);
  const { data: mintedPacks, isLoading: isMintedPacksLoading, error: errorLoadingMintedPacks } = useContractRead(contract, 'mintedPacks');
  const { data: poolPrize, isLoading: isPoolPrizeLoading, error: errorLoadingPoolPrize } = useContractRead(contract, 'prizePoolBalance');

  const [ connectWalletVisibile, showConnectWallet] = useState(false);
  const [ buyPacksVisibile, showBuyPacks] = useState(false);
  const [ errorVisible, showErrorNotice] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ buyingPack, startBuyingPack ] = useState(false);

  const totalPacks = Number(process.env.GATSBY_TOTAL_PACKS);
  const packPrice = Number(process.env.GATSBY_PACK_PRICE);

  function showError(message) {
    if (!errorVisible) {
      showErrorNotice(true);
    }
    if (message !== errorMessage) {
      setErrorMessage(message)
    }
  }

  if (errorLoadingContract) showError(errorLoadingContract.message);
  if (errorLoadingMintedPacks) showError(errorLoadingMintedPacks.message);
  if (errorLoadingPoolPrize) showError(errorLoadingPoolPrize.message);

  function buyPack(){
    startBuyingPack(true);
    if (wallet) {
      return showBuyPacks(true);
    }
    return showConnectWallet(true);
  }

  return (
    <React.Fragment>
      <Error message={errorMessage} hide={!errorVisible} onClick={() => showErrorNotice(false)} />
      {buyingPack && <WalletModal show={connectWalletVisibile} onClose={() => showConnectWallet(false)} onSucced={() => showBuyPacks(true)} />}
      {buyingPack && <PacksModal onComplete={() => navigate('/album/')} completeText="Go to album" onError={showError} show={buyPacksVisibile} onClose={() => showBuyPacks(false)} contract={contract} />}
      <TopBar />
      
      <div className="container pt-16 md:pt-0 mx-auto max-w-6xl">
        <div className="grid grid-flow-row md:grid-cols-2 gap-4 mx-4">
          <div className="hidden md:block order-1 text-center md:text-left">
            <img className="w-1/3 md:w-1/5 inline-block mt-6" src={logo} alt="The Pixel Cup" />
          </div>
          <div className="md:row-span-3 order-1 md:order-2 md:pt-24">
            <video loop="loop" autoPlay playsInline muted="muted" preload="auto" className="h-[480px] mx-auto">
              <source src={packVideo} type="video/mp4" />
              <img src={packBack} alt="The Pixel Cup Pack Back" />
              <img className="absolute top-0" src={packFront} alt="The Pixel Cup Pack Front" />
            </video>
          </div>
          <div className="order-2 md:order-3 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl mt-6 mx-4 md:mx-0 font-semibold lg:pr-16">The first fully decentralized NFT sticker album</h1>
            <p className="text-neutral-300 mt-4 md:mt-8 lg:pr-16 ">Mint a pack to get a random set of stickers. Collect the unique 96 pixel jerseys from the WC 2022 teams and win the ca$h pool prize. </p>
            <Button onClick={buyPack} className="mt-8" isLoading={isContractLoading} loadingText="Connecting...">Buy a Pack</Button>
            <div className="flex mt-12 justify-center md:justify-start">
              <div className=" md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0">
                <div className="md:inline md:w-14 md:h-14 text-center pt-1"><FontAwesomeIcon className="text-neutral-300 text-5xl" icon={faEthereum} /></div>
                <div className="md:w-24 md:h-14 text-center md:text-left text-3xl">{packPrice} <span className="text-sm block">eth / pack</span></div>
              </div>
              <div className="mx-8 md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0">
                <div className="md:inline md:w-20 md:h-14 text-center pt-1"><FontAwesomeIcon className="text-neutral-300 text-5xl" icon={faLayerGroup} /></div>
                <div className="md:w-32 md:h-14 text-center md:text-left text-3xl">
                  {isMintedPacksLoading || errorLoadingMintedPacks ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : totalPacks - mintedPacks.toNumber()}
                  <span className="text-sm block">packs left</span></div>
              </div>
              <div className=" md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0">
                <div className="md:inline md:w-20 md:h-14 text-center pt-1"><FontAwesomeIcon className="text-neutral-300 text-5xl" icon={faSackDollar} /></div>
                <div className="md:w-32 md:h-14 text-center md:text-left text-3xl">
                  {isPoolPrizeLoading || errorLoadingPoolPrize || !ethPrice ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : '$'+(Number(ethers.utils.formatEther(poolPrize)) * ethPrice).toFixed(2)}
                  <span className="text-sm block">
                    {isPoolPrizeLoading ? 'pool prize' : `${ethers.utils.formatEther(poolPrize)} eth pool prize`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 overflow-auto">
          <StickersSlider />
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
                <p className="mx-6 md:mx-auto text-neutral-300 mt-2 md:mt-4">
                  Using your cyrpto wallet you can buy 1 or many packs of stickers. There are only 10,000 packs.
                </p>
              </div>
            </div>
            <div className="text-center">
              <img className="mx-auto max-h-64" src={packOpenedImg} alt="The Pixel Cup Pack Opened" />
              <div>
                <h3 className="text-xl md:text-2xl mt-6 mx-4 md:mx-0 font-semibold">2. Open a Pack</h3>
                <p className="mx-6 md:mx-auto text-neutral-300 mt-2 md:mt-4">
                  If you hold a pack in your wallet you can exchange it for 3 random stickers. &nbsp;
                  <span className="text-lime-400">Coming soon.</span>
                </p>
              </div>
            </div>
            <div className="text-center">
              <img className="mx-auto max-h-64" src={albumImg} alt="The Pixel Cup Album" />
              <div>
                <h3 className="text-xl md:text-2xl mt-6 mx-4 md:mx-0 font-semibold">3. Complete the album</h3>
                <p className="mx-6 md:mx-auto text-neutral-300 mt-2 md:mt-4">
                  Collect the 96 unique stickers to complete the album and claim the prize.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center py-12 md:py-24">
          <Button onClick={buyPack} className="mt-8" isLoading={isContractLoading} loadingText="Connecting...">Buy a Pack</Button>
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
              50% of each pack sale, goes towards a pool prize. Every time someone completes the album, they can claim 50% of the available pool prize. Only 32 possible winners. The last one takes it all.
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
          <Button className="inline-block mx-auto mt-12" onClick={() => document.location = 'https://discord.gg/uRyYuaAd4W'}>Join Discord</Button>
        </div>
        <div className="py-16 md:py-36">
          <img className="mx-auto"  src={dividerImg} alt="The Pixel Cup Pack" />
        </div>
        <div className="p-4">
          <h2 className="text-2xl md:text-4xl text-center mx-4 md:mx-0 font-semibold">Frequently Asked Questions</h2>
          <div className="grid mt-12 text-left md:gap-16 md:grid-cols-2">
            <Faq question="What is The Pixel Cup?">
              The Pixel Cup is a project that aims to offer users the world's first fully decentralized NFT sticker album. Just like a physical sticker collection, the user is able to buy packs that contain random stickers of a predetermined collection. The 2022 World Cup Album is the first collection of many others to come in the future.
            </Faq>
            <Faq question="How does it work?">
              The user can mint (buy) a pack that contains 3 random stickers, and use these stickers to complete the album. The first collection (2022 World Cup) is made of 96 stickers, 3 from each one of the 32 nations participating in the competition. Users can complete the album by minting packs and trading with other players.
            </Faq>
            <Faq question="How does trading work?">
              We offer a trading platform on our website where users can list their duplicates and propose trades to other players. They can also chat on the trading channel on our Discord to check for duplicates, buying/selling stickers and make deals that can be then finalized on the trading platform. Trades are done in the blockchain, for free but you will need to pay the gas fee associated (very low).
            </Faq>
            <Faq question="How many stickers are needed to complete the album?">
              To complete the 2022 World Cup album, you need to get 96 stickers, 3 from each nation - home, away and goalkeeper. Stickers can also have different numbers, but those don't count towards the completion of the album, you only need one version of each sticker.
            </Faq>
            <Faq question="What is the meaning of the numbers on the stickers?">
              Numbers represent a single player. For example, the Argentina kit with the number 10 represents Messi (who will be wearing the #10 shirt in the WC). During the competition, we will draw prizes relative to specific players' performances and holders of those specific stickers will be able to claim it.
            </Faq>
            <Faq question="How does the Cash Prize work?">
              50% of all the money made by the pack's sales will go straight to the prize pool. Whenever a user completes the album, they'll be able to claim the cash prize, which is 50% of the prize pool. So, let's say the prize pool is  $1000 and you claim it, you will get $500. The remaining $500 will remain on the pool so the next person to complete the album can also claim it. This amount will now continue growing with new sales and the game keeps on going. This way we can reward early achievers and still make it possible for everyone to compete. 
            </Faq>
          </div>
        </div>
      </div>
      <div id="footer" className="border-t-4 border-lime-400 mt-12 bg-neutral-900">
        <div className="container mx-auto max-w-6xl p-4 items-center flex flex-row">
          <div className="hidden md:block space-x-4">
            <Link className="decoration-lime-400 underline underline-offset-8" to="/docs/">Documentation</Link>
          </div>
          <div className="flex-grow text-center md:text-right space-x-4">
            <Social size="2x"/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const App = () => {
  return (
    <ThirdwebProvider
      desiredChainId={Number(process.env.GATSBY_CHAIN_ID)}
      chainRpc={{
        [ChainId.Goerli]: 'https://goerli.infura.io/v3/b2db0a6a309a4d71aa2fd1e87cea5a07',
        [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/b2db0a6a309a4d71aa2fd1e87cea5a07'
      }}
    >
      <IndexPage />
    </ThirdwebProvider>
  )
};

export default App;

export const Head = () => (
  <>
    <title>The Pixel Cup</title>
    <meta name="description" content="The first fully decentralized NFT sticker album. Collect the unique 96 pixel jerseys from the WC 2022 teams and win the ca$h pool prize." />
  </>
)
