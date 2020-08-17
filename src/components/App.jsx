import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavBar from './NavBar.jsx'
import Header from './Header.jsx';
import Images from './Images.jsx'
import Modal from './Modal.jsx';
import ShareModal from './ShareModal.jsx';

import styles from './App.scss';

export default () => {
  const [isLoading, setLoading] = useState(true);

  const [home, setHome] = useState({});
  const [allImages, setAllImages] = useState([]);
  const [superhost, setSuperhost] = useState('');

  const [isModalShowing, setModalShowing] = useState(false);
  const [modal, setModal] = useState(styles.hidden);
  const [currentPic, setCurrentPic] = useState(0);

  const [isShowingShareModal, setShowingShareModal] = useState(false);
  const [shareModal, setShareModal] = useState(styles.hideShareModal);

  let getHouse = () => {
    let id = Math.floor(Math.random() * 20);
    axios.get(`/properties/${id}`)
      .then((house) => {
        let houseInfo = house.data[0];
        setSuperhost(houseInfo.superhost);
        setHome(houseInfo);
        let arrayImages = [
          houseInfo.images.house,
          houseInfo.images.kitchen,
          houseInfo.images.backyard,
          ...houseInfo.images.bedrooms,
          ...houseInfo.images.bathrooms,
        ];
        setAllImages(arrayImages);
        setLoading(false);
      })
      .catch(console.log)
  };

  let showAllImages = (num) => {
    // if (num !== undefined) {
    //   console.log('its coming inside of here')
    //   setCurrentPic(num)
    // }

    if (isModalShowing) {
      setModalShowing(false);
      // setCurrentPic(0);
      setModal(styles.hidden);
    } else {
      setModalShowing(true);
      setModal(styles.show);
    }
    console.log('num', currentPic)
  };

  let shareHandler = () => {
    if (isShowingShareModal) {
      setShowingShareModal(false);
      setShareModal(styles.hideShareModal);
    } else {
      setShowingShareModal(true);
      setShareModal(styles.showShareModal);
    }
  };
  useEffect(() => {
    getHouse()
  }, []);
  if (isLoading) {
    return (<div>...</div>)
  }
  return (
    <div className={styles.container}>
      <NavBar />
      <Header description={home.description} starRating={home.starRating} totalReviews={home.reviewTotal} location={home.location} shareHandler={shareHandler} />
      <Images images={allImages} showAllImages={showAllImages} />
      <div className={modal}>
        <Modal showAllImages={showAllImages} allImages={allImages} shareHandler={shareHandler} currentPic={currentPic} />
      </div>
      <div className={shareModal}>
        <ShareModal shareHandler={shareHandler} />
      </div>
    </div>
  )
}