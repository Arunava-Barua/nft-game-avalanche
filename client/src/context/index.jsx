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
import { createEventListeners } from "./createEventListeners";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState('');
  const [contract, setContract] = useState('');
  const [showAlert, setShowAlert] = useState({status: false, type: 'info', message: ''});
  const [battleName, setBattleName] = useState('');
  const [gameData, setGameData] = useState({
    players: [], pendingBattles: [], activeBattle: null
  })
  const [updateGamedata, setUpdateGamedata] = useState(0)

  const navigate = useNavigate();
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

  useEffect(()=> {
    if (contract) {
      createEventListeners({
        navigate, contract, provider, walletAddress, setShowAlert, setUpdateGamedata
      })
    }
  }, [contract])

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(()=> {
        setShowAlert({status: false, type: 'info', message: ''})
      }, [5000]);

      return () => clearTimeout(timer);
    }
  
  }, [showAlert]);

  // set game data to state
  useEffect(() => {
    const fetchGameData = async () => {
      const fetchedBattles = await contract.getAllBattles();
      const pendingBattles = fetchedBattles.filter(battle => battle.battleStatus === 0);
      let myActiveBattle = null;

      fetchedBattles.forEach((battle) => {
        if (battle.players.find((player) => player.toLowerCase() === walletAddress.toLowerCase())) {
          if (battle.winner.startsWith('0x00')) {
            myActiveBattle = battle;
          }
        }
      })

      setGameData({pendingBattles: pendingBattles.slice(1) , myActiveBattle});
      console.log(fetchedBattles);
    }

    if (contract) fetchGameData();
  }, [contract, updateGamedata])
  
  

  return (
    <GlobalContext.Provider
      value={{
        contract, walletAddress, showAlert, setShowAlert, battleName, setBattleName, gameData, setUpdateGamedata
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
