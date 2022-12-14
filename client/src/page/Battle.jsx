import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles';
import { Alert } from '../components';
import { useGlobalContext } from '../context';
import { attack, attackSound, defense, defenseSound, player01 as player01Icon, player02 as player02Icon } from '../assets';
import {playAudio} from '../utils/animation'

const Battle = () => {
    const {contract, gameData, walletAddress, showAlert, setShowAlert} = useGlobalContext();
    const [player1, setPlayer1] = useState({});
    const [player2, setPlayer2] = useState({});
    const {battleName} = useParams();
    const navigate = useNavigate();
  return (
    <div className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround} astral`}>
        <h1 className='text-xl text-white'>{battleName}</h1>
    </div>
  )
}

export default Battle