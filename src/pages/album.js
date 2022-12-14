import React, { useState, useEffect } from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { ThirdwebProvider, ChainId, useAddress, useContract } from "@thirdweb-dev/react";
import { usePapaParse } from 'react-papaparse';

// Components
import Button from "../components/Button";
import Error from "../components/Error";
import WalletModal from "../components/modals/Wallet";
import AlbumBar from "../components/AlbumBar";
import UserStickers from "../components/UserStickers";
import OpenPacksModal from "../components/modals/OpenPacks";
import PacksModal from "../components/modals/Packs";
import TransferModal from "../components/modals/Transfer";

const AlbumPage = () => {
  const wallet = useAddress();
  const { readRemoteFile } = usePapaParse();
  
  const [ collectionData, setCollectoinData ] = useState([]);
  const [ errorVisible, showErrorNotice] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ openPackVisible, setOpenPackVisible ] = useState(false);
  const [ buyPacksVisibile, showBuyPacks] = useState(false);
  const [ transferVisibe, showTransfer ] = useState(false);
  const [ activePanel, setActivePanel ] = useState('stickers');

  const { contract, error: errorLoadingContract } = useContract(process.env.GATSBY_CONTRACT_ADDRESS);
  
  function showError(message) {
    if (!errorVisible) {
      showErrorNotice(true);
    }
    if (message !== errorMessage) {
      setErrorMessage(message)
    }
  }
  
  if (errorLoadingContract) showError(errorLoadingContract.message);
  
  useEffect(() => {
    readRemoteFile('/data/collection.csv', {
      complete: (results) => {
        setCollectoinData(results.data);
      },
      error: (error, file) => {
        console.log('Error while parsing:', error, file);
      }
    });
  }, [readRemoteFile]);

  return (
    <React.Fragment>
      <Error message={errorMessage} hide={!errorVisible} onClick={() => showErrorNotice(false)} />
      <WalletModal show={!wallet} />
      <OpenPacksModal onError={showError} show={openPackVisible} onClose={() => setOpenPackVisible(false)} contract={contract} collection={collectionData} />
      <PacksModal onComplete={() => {setOpenPackVisible(true); showBuyPacks(false);}} completeText="Open pack" onError={showError} show={buyPacksVisibile} onClose={() => showBuyPacks(false)} contract={contract} />
      <TransferModal onError={showError} show={transferVisibe} onClose={() => showTransfer(false)} contract={contract} />
      <div className="container mx-auto max-w-6xl p-4">
        <AlbumBar contract={contract} wallet={wallet} collection={collectionData}  onTransfer={() => showTransfer(true)}  />
        <div className="mt-8">
          <div className="md:border-lime-400 md:border-b md:pb-4 flex md:flex-row flex-col space-y-4 md:space-y-0">
            <div className="hidden md:flex flex-row w-1/2 md:space-x-4">
              <button onClick={() => setActivePanel('stickers')} className="md:bg-lime-400 text-neutral-800 px-4 flex items-center">Stickers</button>
              <button onClick={() => setActivePanel('album')} className="flex px-4 items-center">Album</button>
              <button onClick={() => setActivePanel('trades')} className="flex px-4 items-center">Trades</button>
            </div>
            <div className="md:hidden">
              <select id="tabs" className="bg-transparent border-b border-b-lime-400 focus:ring-offset-lime-400 focus:border-lime-400 block w-full p-4">
                <option>Stickers</option>
                <option>Album</option>
                <option>Trades</option>
              </select>
            </div>
            <div className="md:text-right md:w-1/2 space-x-4 md:space-y-0 order-first md:order-last flex flex-row md:justify-end justify-center">
              <Button onClick={() => setOpenPackVisible(true)} alternate className="flex flex-1 md:flex-none justify-center">Open packs</Button>
              <Button onClick={() => showBuyPacks(true)}  className="flex flex-1 justify-center md:flex-none">Buy packs</Button>
            </div>
          </div>
        </div>
        {activePanel === 'stickers' && <UserStickers contract={contract} wallet={wallet} collection={collectionData} /> }
        {activePanel !== 'stickers' && <h1 className="text-xl my-4">Section not available yet. <OutboundLink className="text-lime-400 underline" href="https://twitter.com/the_pixelcup" rel="noreferrer" target="_blank" aria-label="Twitter">Follow us</OutboundLink> for the latest updates.</h1>}
      </div>
    </React.Fragment>
  );
};

const Album = () => {
  return (
    <ThirdwebProvider
      desiredChainId={Number(process.env.GATSBY_CHAIN_ID)}
      chainRpc={{
        [ChainId.Goerli]: 'https://goerli.infura.io/v3/b2db0a6a309a4d71aa2fd1e87cea5a07',
        [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/b2db0a6a309a4d71aa2fd1e87cea5a07',
        [ChainId.Mumbai]: 'https://polygon-mumbai.infura.io/v3/b2db0a6a309a4d71aa2fd1e87cea5a07',
        [ChainId.Polygon]: 'https://polygon-mainnet.infura.io/v3/b2db0a6a309a4d71aa2fd1e87cea5a07'
      }}
    >
      <AlbumPage />
    </ThirdwebProvider>
  )
};

export default Album

export const Head = () => <title>The Pixel Cup Album</title>