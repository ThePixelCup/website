import React, { useEffect } from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useMetamask, useCoinbaseWallet, useWalletConnect, useAddress } from "@thirdweb-dev/react";

import metamaskIcon from "../../assets/images/icons/metamask.svg";
import coinbaseIcon from "../../assets/images/icons/coinbase.svg";
import walletConnectIcon from "../../assets/images/icons/walletconnect.svg";

const Wallet = ({show, onClose, onSucced}) => {
  const wallet = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();

  useEffect(() => {
    if (wallet && onSucced && onClose) {
      onSucced();
      onClose();
    }
  }, [wallet]);
  
  if (!show) return null;

  if (wallet) {
    return null;
  }

  return (
    <div aria-hidden="true" className="backdrop-blur-sm bg-neutral-600/40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full">
      <div className="relative p-4 mx-auto max-w-md h-full md:h-auto">
        <div className="mt-12 md:mt-24 relative rounded-lg bg-neutral-900 shadow-lg shadow-neutral-600">
          <div className="py-4 px-6 rounded-t border-b border-lime-400 flex flex-row items-center">
            <h3 className="text-xl font-semibold flex-grow">Connect Wallet</h3>
            <button type="button" className="text-right mt-1" onClick={onClose}>
              <FontAwesomeIcon className="text-neutral-300 text-xl" icon={faCircleXmark} />
            </button>
          </div>
          <div className="p-6">
            <p className="text-sm text-neutral-400">Start by connecting with one of the wallets below. Make sure you are in https://www.thepixelcup.com</p>
            <ul className="my-4 space-y-3">
              <li>
                <button onClick={connectWithMetamask} className="flex w-full items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <img className="h-4" src={metamaskIcon} alt="Metamask Wallet" />
                  <span className="flex-grow text-left ml-3 whitespace-nowrap">MetaMask</span>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                </button>
              </li>
              <li>
                <button onClick={connectWithCoinbaseWallet} className="flex w-full items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <img className="h-5" src={coinbaseIcon} alt="Metamask Wallet" />
                  <span className="flex-grow text-left ml-3 whitespace-nowrap">Coinbase Wallet</span>
                </button>
              </li>
              <li>
                <button onClick={connectWithWalletConnect} className="flex w-full items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <img className="h-5" src={walletConnectIcon} alt="Metamask Wallet" />
                  <span className="flex-grow text-left ml-3 whitespace-nowrap">Wallet Connect</span>
                </button>
              </li>
            </ul>
            <div>
              <p className="text-sm text-neutral-400">
                Haven't got a wallet yet? &nbsp;
                <Link className="decoration-lime-400 underline underline-offset-8" to="/docs/">
                  Learn how to connect
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Wallet;