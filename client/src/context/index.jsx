import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useNavigate } from "react-router-dom";

import {ABI, CONTRACT_ADDRESS} from '../contract/index'

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState('');
  const [contract, setContract] = useState('');

  // connect to core wallet and set the wallet address
  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    updateCurrentWalletAddress();

    window.ethereum.on('accountsChanged', updateCurrentWalletAddress)
  }, []);

  // Setting the provider and contract to the state of the application
  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      setProvider(newProvider);
      setContract(newContract);
    };

    setSmartContractAndProvider();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        contract, walletAddress
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
