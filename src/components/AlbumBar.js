import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import { useContractRead, useDisconnect } from "@thirdweb-dev/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faNoteSticky, faCircleXmark, faUserCircle } from "@fortawesome/free-solid-svg-icons";

// Assets
import logoMini from "../assets/images/logo-mini.png";
import iconImg from "../assets/images/icon.png";

const AlbumBar = ({contract, wallet, collection}) => {
  const [ userMenuVisible, showUserMenu ] = useState(false);
  const [ totalStickers, setTotalStickers ] = useState(0);
  const tokenIds = collection.filter(s => Number(s[5]) > 0).map(s => s[6]);
  const disconnect = useDisconnect();

  const {
    data: packBalance, isLoading: isPackBalanceLoading, error: errorLoadingPackBalance
  } = useContractRead(contract, 'packBalance', wallet);
  const {
    data: stickerBalance, isLoading: isStickerBalanceLoading, error: errorLoadingStickerBalance
  } = useContractRead(contract, 'balanceOfBatch', tokenIds.map(t => wallet), tokenIds);

  useEffect(() => {
    if (stickerBalance && stickerBalance.length > 0) {
      const total = stickerBalance.filter(s => s.toNumber() > 0).reduce((p, a) => p + a.toNumber(), 0);
      setTotalStickers(total);
    }
  }, [stickerBalance])

  return (
  <React.Fragment>
    <div aria-hidden="true" onClick={() => showUserMenu(!userMenuVisible)} className={`${userMenuVisible ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full`}>
    </div>
    <div className="flex flex-row relative">
      <div className="inline">
        <Link to="/"><img className="mx-auto h-12" src={logoMini} alt="The Pixel Cup" /></Link>
      </div>
      <div className="grow text-right">
        <div className="flex flex-row-reverse items-center">
          <div className="text-right">
            <FontAwesomeIcon className="text-neutral-300 text-4xl cursor-pointer mt-3 md:-mt-2" icon={faUserCircle} onClick={() => showUserMenu(!userMenuVisible)} />
          </div>
          <div className="hidden md:flex flex-row mr-4">
            <div className="inline w-16 text-center pt-1"><FontAwesomeIcon className="text-neutral-300 text-4xl" icon={faNoteSticky} /></div>
            <div className="mr-4 h-14 text-left text-2xl">{totalStickers} <span className="text-sm block -mt-2">stickers</span></div>
          </div>
          <div className="hidden md:flex flex-row mr-4">
            <div className="inline w-16 text-center pt-1"><FontAwesomeIcon className="text-neutral-300 text-4xl" icon={faLayerGroup} /></div>
            <div className="h-14 text-left text-2xl">{packBalance ? packBalance.toNumber() : 0} <span className="text-sm block -mt-2">packs</span></div>
          </div>
        </div>
      </div>
      <div className={`absolute ${userMenuVisible ? 'flex' : 'hidden'} bg-neutral-300 z-[51] w-64 right-2 top-16 text-neutral-700 rounded-lg pl-1 pr-4 pt-4 pb-4 flex-col space-y-4`}>
        <div className="flex flex-row">
          <span className="w-10 text-center"><FontAwesomeIcon className="text-neutral-800 text-xl" icon={faLayerGroup} /></span>
          <span>Packs balance</span>
          <span className="grow text-right mr-1">{packBalance ? packBalance.toNumber() : 0}</span>
        </div>
        <div className="flex flex-row">
          <span className="w-10 text-center"><FontAwesomeIcon className="text-neutral-800 text-xl" icon={faNoteSticky} /></span>
          <span>Stickers balance</span>
          <span className="grow text-right mr-1">{totalStickers}</span>
        </div>
        <div className="flex flex-row">
          <span className="w-10 text-center"><FontAwesomeIcon className="text-neutral-800 text-xl" icon={faCircleXmark} /></span>
          <button onClick={() => { disconnect(); showUserMenu(!userMenuVisible); navigate('/')}}>Disconnect wallet</button>
        </div>
      </div>
    </div>
  </React.Fragment>
  );
};

export default AlbumBar;