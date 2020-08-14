import React, { useState } from 'react';

import ShareLikeButton from './Header/Button.jsx';

import CloseButton from './Modal/CloseButton.jsx';
import ScrollButton from './Modal/ScrollButton.jsx';

import styles from './Modal.scss';

export default ({ showImages, allImages }) => {
  const [currentImage, setCurrentImage] = useState(allImages);
  const [currentImageNum, setCurrentImageNum] = useState(0);

  let clickHanlder = () => {
    console.log('ive been clicked')
    showImages()
  }

  let scrollHandler = (direction) => {
    if (direction === 'left') {
      setCurrentImageNum(currentImageNum - 1)
    } else {
      setCurrentImageNum(currentImageNum + 1)
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <CloseButton showImages={showImages} />
        <p className={styles.p}>{`${currentImageNum + 1} / ${allImages.length}`}</p>
        <div className={styles.buttons}>
          <ShareLikeButton buttonName={"Share"} isLabeled={false} />
          <ShareLikeButton buttonName={"Save"} isLabeled={false} />
        </div>
      </div>
      <div className={styles.display}>
        {currentImageNum === 0 ? <p className={styles.fake}></p> : <ScrollButton direction="left" scrollHandler={scrollHandler} />}
        <div className={styles.imgContainer}>
          <img src={currentImage[currentImageNum].imageURL} className={styles.img} height='510'></img>
        </div>
        {currentImageNum === allImages.length - 1 ? <p className={styles.fake}></p> : <ScrollButton direction="right" scrollHandler={scrollHandler} />}
      </div >
      <div className={styles.other}>
      </div>
    </div >
  )
};
