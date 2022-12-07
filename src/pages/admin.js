import React, { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThirdwebProvider, ChainId, useAddress, useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react";
import { faLayerGroup, faNoteSticky, faSpinner, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ConnectWallet } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { usePapaParse } from 'react-papaparse';

import Button from "../components/Button";

const AdminPage = () => {
  const { readRemoteFile } = usePapaParse();
  const [ collectionData, setCollectoinData ] = useState([]);
  const { contract } = useContract(process.env.GATSBY_CONTRACT_ADDRESS);
  const { data: totalPacks } = useContractRead(contract, 'totalPacks');
  const { data: stickersPerPack } = useContractRead(contract, 'stickersPerPack');
  const { data: stickersAvailable } = useContractRead(contract, 'stickersAvailable');
  const { data: registeredStickers } = useContractRead(contract, 'registeredStickers');
  
  const RegisterSticker = ({countries, types, numbers, qtys}) => {
    const { mutateAsync: registerStickers, error } = useContractWrite(contract, 'registerStickers');
    const [ isDone, setDone ] = useState(false);
    const [ isLoading, setLoading ] = useState(false);

    if (error) {
      console.log('Error registering:', error);
    }

    async function callRegisterSticker() {
      setLoading(true);
      const tx = await registerStickers([countries, types, numbers, qtys]);
      console.log(`Done ${countries[0]}:`, tx);
      setDone(true);
      setLoading(false);
    }

    return (
      <div className="py-2">
        <span className="input-block mr-4">
          {countries.length === types.length && types.length === numbers.length && numbers.length === qtys.length && '✅'}
          &nbsp;
          Country: {countries[0]} <a onClick={() => setDone(true)}>test</a>
        </span>
        <Button isDone={isDone} doneText="Done" isLoading={isLoading} loadingText="Registering..." onClick={callRegisterSticker}>Register</Button>
        <input type="checkbox" />
      </div>
    )
  };

  useEffect(() => {
    readRemoteFile('/data/collection.csv', {
      complete: (results) => {
        setCollectoinData(results.data);
      },
      error: (error, file) => {
        console.log('Error while parsing:', error, file);
      }
    });
  }, []);

  const rows = [];
  let countryIds = [];
  let typeIds = [];
  let numbers = [];
  let qtys = [];
  let prevCountry = 0;
  let totalStickers = 0;
  collectionData.forEach((row, i) => {
    if (i === 0) return;
    if (i === 1) {
      prevCountry = row[0];
    }
    const [ countryId, , typeId, , number, qty ] = row;
    if (countryId !== prevCountry ) {
      // end of transaction
      rows.push(<RegisterSticker key={prevCountry} countries={[...countryIds]} types={[...typeIds]} numbers={[...numbers]} qtys={[...qtys]} />);
      countryIds = [];
      typeIds = [];
      numbers = [];
      qtys = [];
    }
    countryIds.push(countryId);
    typeIds.push(typeId);
    numbers.push(number);
    qtys.push(qty);
    totalStickers += Number(qty);
    prevCountry = countryId;
    if (i === (collectionData.length - 1) ) {
      // Last item 
      rows.push(<RegisterSticker key={prevCountry} countries={[...countryIds]} types={[...typeIds]} numbers={[...numbers]} qtys={[...qtys]} />);
    }
  })
  return (
    <div className="container mx-auto max-w-6xl p-4">
      <div className="flex flex-row w-full">
        <h1>The Pixel Cup Admin</h1>
        <div className="flex flex-1 justify-end">
          <ConnectWallet />
        </div>
      </div>
      {rows}
      <h2>Stickers to register: {totalStickers}</h2>
      {totalPacks && stickersPerPack && <h2>Stickers required: {totalPacks.toNumber() * stickersPerPack.toNumber()}</h2>}
      {registeredStickers && <h2>Reigster stickers {registeredStickers.toNumber()}</h2>}
      {stickersAvailable && <h2>Stickers available {stickersAvailable.toNumber()}</h2>}
    </div>
  );
};

const Admin = () => {
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
      <AdminPage />
    </ThirdwebProvider>
  )
};

export default Admin

export const Head = () => <title>The Pixel Cup Admin</title>