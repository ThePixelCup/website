import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons"
import { useDisconnect, ChainId, useContractWrite, useAddress, useNetworkMismatch } from "@thirdweb-dev/react";
import { ethers } from "ethers";

// assets
import packImg from "../../assets/images/pack-front-st.png";
import stickerBackImg from "../../assets/images/stickers/back.jpg";
import packVideo from "../../assets/videos/pack-open.mp4";
import packFront from "../../assets/images/pack-front.png";
import packBack from "../../assets/images/pack-back.png";

// components
import Button from "../Button";

const Sticker = ({className = '', token, active, style = {}, onReveal}) => {
  const stickerRef = useRef(null);
  if (active) {
    style.zIndex = 1;
  }

  function reveal() {
    stickerRef.current.style.transform = 'rotateY(180deg)';
    if (onReveal) onReveal(token)
  }

  return (
    <div className={`sticker absolute ${className}`} style={style}>
      <div ref={stickerRef} className="sticker-inner">
        <div className="sticker-front">
          <img className="inline w-full" src={`/image/sticker/${token}.jpg`} alt="Sticker back" />
        </div>
        <div className="sticker-back">
          <img onClick={reveal} className="inline w-full cursor-auto" src={stickerBackImg} alt="Sticker back" />
        </div>
      </div>
    </div>
  )
}

const OpenPacks = ({show, onClose, contract, collection, onError}) => {
  const wallet = useAddress();
  const videoRef = useRef(null);
  const stickersContainerRef = useRef(null);
  const [ stickersInPack, setStickersInPack ] = useState([]);
  const [ packOpening, setPackOpening ] = useState(false);
  const [ packOpened, setPackOpened ] = useState(false);
  const [ transactionCompleted, setTransactionCompleted ] = useState(false);
  const [ resetOpen, setResetOpen ] = useState(false);
  const [numberOfPacks, setNumberOfPacks] = useState(3);
  const [purchaseInProgress, setPurchaseInProgress] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const disconnect = useDisconnect();
  const isMismatched = useNetworkMismatch()
  const { mutateAsync: openPack, isLoading: isMintLoading, error } = useContractWrite(contract, 'openPacks');

  useEffect(() => {
    const video = videoRef.current;
    const handleTime = () => {
      if (!transactionCompleted && packOpening && video.currentTime > 4.9) {
        video.currentTime = 0;
      }
      if (transactionCompleted && video.currentTime > 8) {
        video.pause();
        stickersContainerRef.current.style.display = 'block';
        setPackOpening(false);
        setPackOpened(true);
      }
    }
    if (video) video.addEventListener('timeupdate', handleTime);

    if (packOpening) {
      video.play();
    }

    if (resetOpen && video) {
      video.currentTime = 0;
      video.pause();
      setResetOpen(false);
    }
    
    return () => {
      if (video) video.removeEventListener('timeupdate', handleTime)
    }
  }, [videoRef, packOpening, transactionCompleted, show, resetOpen]);
  
  if (!show) return null;

  function nextSticker() {
    const activeIndex = stickersInPack.findIndex(s => s.active);
    let indexToActive;
    if (activeIndex === 0) {
      indexToActive = stickersInPack.length - 1;
    } else {
      indexToActive = activeIndex - 1;
    }

    setStickersInPack(stickersInPack.map((s, i) => {
      if (i == indexToActive) {
        return {id: s.id, active: true, reveal: s.reveal}
      }
      return {id: s.id, reveal: s.reveal};
    }));
  }

  function close() {
    if (isMintLoading) return null;
    setPackOpened(false);
    setPackOpening(false);
    setTransactionCompleted(false);
    if (onClose) onClose();
  }

  async function startOpenPack() {
    if (isMintLoading) return null;
    try {
      setPackOpening(true);
      const gasLimit = await contract.estimator.gasLimitOf('openPacks', [1]);
      contract.interceptor.overrideNextTransaction(() => ({
        gasLimit: gasLimit.add(gasLimit.div(4))
      }));
      const { receipt } = await openPack([1]);
      const stickers = receipt.events.find(e => e.event === 'PackOpened').args._stickers;
      setStickersInPack(stickers.map((s, i) => ({id: s.toNumber(), active: i === 2})));
      setTransactionCompleted(true);
    } catch (error) {
      if (error && onError) {
        const errorMessage = error.message ? error.message.substring(0, 140) : 'Error from the wallet provider';
        onError(errorMessage); 
      }
      setResetOpen(true);
      setPackOpening(false);
      setTransactionCompleted(false);
    }
  }

  function getActiveStickerName() {
    if (!stickersInPack || stickersInPack.length === 0) return;
    const activeSticker = stickersInPack.find(s => s.active);
    const stickerData = collection.find(sd => Number(sd[6]) === activeSticker.id);
    if (activeSticker.reveal) {
      return (
        <p className="text-center -mt-14 py-4">{stickerData[1]} | {stickerData[3]} | {stickerData[12]}</p>
      );
    }
    return null;
  }

  function onStickerReveal(token) {
    setStickersInPack(stickersInPack.map((s, i) => ({id: s.id, active: s.active, reveal: s.id === token || s.reveal})));
  }

  return (
    <div aria-hidden="true" className="backdrop-blur-sm bg-neutral-600/40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full items-center">
      <div className="relative p-4 mx-auto max-w-md h-full md:h-auto">
        <div className="mt-12 md:mt-16 relative rounded-lg bg-[#21201F] shadow-lg shadow-neutral-600">
          <video ref={videoRef} playsInline muted="muted" preload="auto" className="w-[320px] mx-auto py-6">
            <source src="/video/opening.mp4" type="video/mp4" />
            <img src={packBack} alt="The Pixel Cup Pack Back" />
            <img className="absolute top-0" src={packFront} alt="The Pixel Cup Pack Front" />
          </video>
          <div className="absolute top-0 left-0 py-4 px-6 rounded-t border-b border-lime-400 flex flex-row items-center w-full">
            <h3 className="text-xl font-semibold flex-grow">Open a Pack</h3>
            <button type="button" className="text-right mt-1" onClick={close}>
              <FontAwesomeIcon className="text-neutral-300 text-xl" icon={faCircleXmark} />
            </button>
          </div>
          <div ref={stickersContainerRef} className="absolute w-full top-[163px] z-10 flex-row justify-items-center items-center text-center hidden brightness-[1.16]">
            {getActiveStickerName()}
            <div className="relative w-full">
              {stickersInPack.map((s, i) => {
                const left = 108 - (i * 15);
                const style = {left: `${left}px`}
                new Image().src = `/image/sticker/${s.id}.jpg`;
                return <Sticker key={s.id} active={s.active} style={style} token={s.id} onReveal={onStickerReveal} />
              })}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full px-6 mb-6">
            {!transactionCompleted && <Button className="w-full" onClick={startOpenPack} isLoading={packOpening} loadingText="Waiting Confirmation...">
              Open Pack
            </Button>}
            {packOpened && <div className="flex flex-row items-center">
              <span className="flex-grow text-center text-l">
                {stickersInPack.filter(s => s.reveal).length < 3 && 'Click on a sticker to reveal'}
              </span>
              <button onClick={nextSticker} className="hover:bg-lime-400 border-lime-400 border text-lime-400 hover:text-neutral-900 rounded-md py-2.5 px-5">
                <FontAwesomeIcon className="text-l" icon={faChevronRight} />
              </button>
            </div> }
          </div>
        </div>
      </div>
    </div>
  )
};

export default OpenPacks;