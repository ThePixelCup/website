import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { ChainId, useContractWrite, useAddress, useNetworkMismatch } from "@thirdweb-dev/react";

// components
import Button from "../Button";

const Transfer = ({show, onClose, contract, onError}) => {
  const wallet = useAddress();
  const [ toAddress, setToAddress ] = useState('');
  const [ tokenToSend, setTokenToSend ] = useState(1);
  const [ qtyToSend, setQtyToSend ] = useState(1);

  const [transferInProgress, setTransferInProgress] = useState(false);
  const [transferCompleted, setTransferCompleted] = useState(false);
  const isMismatched = useNetworkMismatch()
  const { mutateAsync: transferToken, error } = useContractWrite(contract, "safeTransferFrom");

  useEffect(() => {
    if (error && onError) {
      const errorMessage = error.message ? error.message.substring(0, 140) : 'Error from the wallet provider';
      onError(errorMessage); 
    }
  }, [error, onError]);
  
  if (!show) return null;

  async function startTransfer(){
    if (isMismatched) {
      if (onError) onError(`You need to be connected to ${ChainId[process.env.GATSBY_CHAIN_ID]}`);
      return;
    }
    try {
      setTransferInProgress(true);
      await transferToken([wallet, toAddress, tokenToSend, qtyToSend, []]);
      setTransferInProgress(false);
      setTransferCompleted(true);
    } catch (e) {
      if (error && onError) {
        const errorMessage = error.message ? error.message.substring(0, 140) : 'Error from the wallet provider';
        onError(errorMessage); 
      }
      setTransferInProgress(false);
    }
  }

  function close() {
    if (transferInProgress) return null;
    if (onClose) onClose();
  }

  return (
    <div aria-hidden="true" className="backdrop-blur-sm bg-neutral-600/40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full">
      <div className="relative p-4 mx-auto max-w-md h-full md:h-auto">
        <div className="mt-12 md:mt-24 relative rounded-lg bg-neutral-900 shadow-lg shadow-neutral-600">
          <div className="py-4 px-6 rounded-t border-b border-lime-400 flex flex-row items-center">
            <h3 className="text-xl font-semibold flex-grow">Transfer</h3>
            <button type="button" className="text-right mt-1" onClick={close}>
              <FontAwesomeIcon className="text-neutral-300 text-xl" icon={faCircleXmark} />
            </button>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-neutral-100">To address</label>
              <input type="text" value={toAddress} onChange={(ev) => setToAddress(ev.target.value)} id="address" className="border text-sm rounded-lg focus:ring-lime-400 focus:border-lime-400 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" placeholder="0x0000" required />
            </div>
            <div className="mb-6">
              <label htmlFor="token" className="block mb-2 text-sm font-medium text-neutral-100">Token ID (1 for packs)</label>
              <input type="number" onChange={(ev) => setTokenToSend(ev.target.value)}  id="token" value={tokenToSend} className="border text-sm rounded-lg focus:ring-lime-400 focus:border-lime-400 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" required />
            </div>
            <div className="mb-6">
              <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-neutral-100">Quantity</label>
              <input type="number" onChange={(ev) => setQtyToSend(ev.target.value)}  id="quantity" value={qtyToSend} className="border text-sm rounded-lg focus:ring-lime-400 focus:border-lime-400 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" required />
            </div>
            {transferCompleted && <Button onClick={() => { setTransferCompleted(false); setToAddress('');}} className="w-full"><FontAwesomeIcon icon={faCircleCheck} /> Done</Button>}
            {!transferCompleted && <Button className="w-full" onClick={startTransfer} isLoading={transferInProgress} loadingText="Waiting Confirmation...">
              Send
            </Button>}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Transfer;