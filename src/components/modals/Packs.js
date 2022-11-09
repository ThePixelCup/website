import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons"
import { useDisconnect, ChainId, useContractWrite, useAddress, useNetworkMismatch } from "@thirdweb-dev/react";
import { ethers } from "ethers";

// assets
import packImg from "../../assets/images/pack-front-st.png";

// components
import Button from "../Button";

const Packs = ({show, onClose, contract, onError}) => {
  const wallet = useAddress();
  const [numberOfPacks, setNumberOfPacks] = useState(3);
  const [purchaseInProgress, setPurchaseInProgress] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const disconnect = useDisconnect();
  const isMismatched = useNetworkMismatch()
  const { mutate: mintPacks, isLoading: isMintLoading, error } = useContractWrite(contract, "mintPacks");

  useEffect(() => {
    if (error && onError) {
      const errorMessage = error.message ? error.message.substring(0, 140) : 'Error from the wallet provider';
      onError(errorMessage); 
    }
  }, [error]);
  
  if (!show) return null;
  
  const packPrice = Number(process.env.GATSBY_PACK_PRICE);
  const packsImg = [];
  for (let n = 1; n <= (numberOfPacks > 5 ? 5 : numberOfPacks); n++) {
    packsImg.push(<img key={n} className="w-36 inline -mr-28" src={packImg} alt="The Pixel Cup" />)
  }

  function buyPacks(){
    if (isMismatched) {
      if (onError) onError(`You need to be connected to Ethereum ${ChainId[process.env.GATSBY_CHAIN_ID]}`);
      return;
    }
    setPurchaseInProgress(true);
    setPurchaseCompleted(false);
    const value = ethers.utils.parseEther((packPrice*numberOfPacks).toString());
    mintPacks([wallet, numberOfPacks, { value }]);
  }

  if (!isMintLoading && purchaseInProgress) {
    setPurchaseInProgress(false);
    if (!error) {
      setPurchaseCompleted(true);
    }
  }

  function close() {
    if (isMintLoading) return null;
    setPurchaseCompleted(false);
    setPurchaseInProgress(false);
    if (onClose) onClose();
  }

  return (
    <div aria-hidden="true" className="backdrop-blur-sm bg-neutral-600/40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full">
      <div className="relative p-4 mx-auto max-w-md h-full md:h-auto">
        <div className="mt-12 md:mt-24 relative rounded-lg bg-neutral-900 shadow-lg shadow-neutral-600">
          <div className="py-4 px-6 rounded-t border-b border-lime-400 flex flex-row items-center">
            <h3 className="text-xl font-semibold flex-grow">Buy Packs</h3>
            <button type="button" className="text-right mt-1" onClick={close}>
              <FontAwesomeIcon className="text-neutral-300 text-xl" icon={faCircleXmark} />
            </button>
          </div>
          <div className="p-6">
            <div className="pr-28 h-48 mb-4 flex-row justify-items-center items-center text-center">
              {packsImg}
            </div>
            <p className="text-sm text-neutral-400">Select the number of packs to mint. Save on gas fees buying multiple packs.</p>
            <div className="flex flex-row items-center my-4">
              <button onClick={() => numberOfPacks > 1 ? setNumberOfPacks(numberOfPacks - 1) : null} className="hover:bg-lime-400 border-lime-400 border text-lime-400 hover:text-neutral-900 rounded-md py-2.5 px-5">-</button>
              <span className="flex-grow text-center text-2xl">{numberOfPacks}</span>
              <button onClick={() => setNumberOfPacks(numberOfPacks + 1)} className="hover:bg-lime-400 border-lime-400 border text-lime-400 hover:text-neutral-900 rounded-md py-2.5 px-5">+</button>
            </div>
            {purchaseCompleted && <Button className="w-full"><FontAwesomeIcon icon={faCircleCheck} /> Completed</Button>}
            {!purchaseCompleted && <Button className="w-full" onClick={buyPacks} isLoading={isMintLoading} loadingText="Waiting Confirmation...">
              Buy
            </Button>}
            {purchaseCompleted && <p className="text-center mt-4 text-lime-400">You will be able to open packs on Nov. 22nd,</p>}
            <div className="mt-4 flex flex-row items-center">
              <button onClick={() => {disconnect(); onClose();}} className="text-sm text-neutral-400 decoration-lime-400 underline underline-offset-8">
                Disconnect Wallet
              </button>
              <span className="flex-grow text-right text-xl">
                Total: <FontAwesomeIcon className="text-neutral-300" icon={faEthereum} /> {packPrice*numberOfPacks} 
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Packs;