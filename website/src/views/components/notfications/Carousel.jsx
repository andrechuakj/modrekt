/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

import styles from './Announcements.scss';

const Carousel = ({ requirements, activeIndex, setActiveIndex }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
  
  // {satisfied ? {} : {}}
  return (
    <div className={styles.carousel} >

      <div className={styles.body}>
        <h3>{requirements[activeIndex].title}</h3>
        <p className={styles.bodyElement}>
        {requirements[activeIndex].text}
        </p>
      </div>

    </div>
  );
};
export default Carousel;