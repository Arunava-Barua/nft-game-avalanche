import React from 'react'
import {useNavigate} from 'react-router-dom'

import {logo, heroImg} from '../assets';
import styles from '../styles'

import { useGlobalContext } from '../context';
import {Alert} from './index'

const PageHOC = (Component, title, description) => () => {
    const {showAlert} = useGlobalContext();
    const navigate = useNavigate();
  return (
    <div className={styles.hocContainer}>
        {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message}/>}
        <div className={styles.hocContentBox}>
            <img width={200} src={logo} alt="logo" onClick={() => navigate('/')} />

            <div className={styles.hocBodyWrapper}>
                <div className="flex flex-row w-full">
                    <h1 className={`flex ${styles.headText} head-text`}>
                        {title}
                    </h1>
                </div>

                <p className={`${styles.normalText} my-10`}>{description}</p>
                <Component/>
            </div>

            <p className={styles.footerText}>Made by Arunava Barua</p>
        </div>
        <div className='flex flex-1'>
            <img src={heroImg} alt="hero image" className='w-full xl:h-full object-cover'/>
        </div>
    </div>
  )
}

export default PageHOC