import * as React from "react"
import { ThirdwebProvider, ChainId, useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const desiredChainId = ChainId.Goerli;

const App = () => {
  const address = useAddress();
  const { contract, isLoading: isContractLoading } = useContract('0x714a27164cF6C161ebE3bA8AB4EcC1094d3018Ad');
  const { mutate: mintPacks, isLoading: isMintLoading, error } = useContractWrite(contract, "mintPacks");
  console.log({error});
  if (address) {
    return (
      <div>
        <h1>Hi {address} </h1>
        {isContractLoading && <p>Loading contract ...</p>}
        {!isContractLoading && address && 
          <button onClick={() => mintPacks(['0x5583DBBB0b6F1d95808C3511A3d9B496bA774e3E', 1, {value: ethers.utils.parseEther('0.01')}])}>Buy pack</button>}
        {isMintLoading && <p>Minting your pack...</p>}

      </div>
    )
  } else {
    return (
      <h1>Please connect your wallet</h1>
    )
  }
};

const Album = () => {
  console.log(ChainId);
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <ConnectWallet
        // Some customization of the button style
        colorMode="light"
        accentColor="#F213A4"
      />
      <App />
    </ThirdwebProvider>
  )
};

export default Album

export const Head = () => <title>App</title>