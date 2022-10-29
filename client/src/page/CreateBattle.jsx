import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles";
import { useGlobalContext } from "../context";
import { Button, Input, PageHOC, GameLoad } from "../components";

const CreateBattle = () => {
  const {contract, battleName, setBattleName, gameData, walletAddress} = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false)
  const navigate = useNavigate();
  
  const handleClick = async () => {
    if (!battleName || !battleName.trim()) return null;

    try {
      await contract.createBattle(battleName);

      setWaitBattle(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(gameData?.myActiveBattle?.battleStatus === 0) {
      setWaitBattle(true);
    } 
    // else setWaitBattle(false)

    // alert('Wallet address changed')

    // console.log(walletAddress);
  }, [gameData, walletAddress])

  return (
    <>
      {waitBattle && <GameLoad/>}
      <div className="flex flex-col mb-5">
        <Input 
          label="Battle"  
          placeholder="Enter battle name"
          value={battleName}
          handleValueChange={setBattleName}
        />
        <Button
          title="Create Battle"
          handleClick={handleClick}
          restStyles= "mt-6"
        />
      </div>

      <p className={styles.infoText} onClick={()=>navigate('/join-battle')}>Or Join a existing battle</p>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Create <br /> a new Battle
  </>,
  <>Create your custom battle and invite players to join you</>
);
