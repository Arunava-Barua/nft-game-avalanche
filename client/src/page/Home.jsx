import React from 'react';
import { useContext, useState } from 'react';
import { PageHOC, Input, Button } from '../components';

import { useGlobalContext } from '../context';

const Home = () => {
  const {contract, walletAddress, setShowAlert} = useGlobalContext();
  const [playerName, setPlayerName] = useState('');

  // handleClick for the register button
  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being summoned!`
        })
      } else throw Error('WRRRRONNNNGG');
    } catch (error) {
      console.log(error);
      setShowAlert({
        status: true,
        type: 'failure',
        message: "Something went wrong"
      })
    }
  }

  return (
    <div className='flex flex-col'>
      <Input 
        label = "Name"
        placeholder = "Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <Button 
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  )
};

export default PageHOC(
  Home,
  <>Welcome to Avax Gods <br/> a Web3 NFT Card Game</>,
  <>Connect your wallet to start playing <br/> the ultimate Web3 battle Card game</>
  );