/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import ConstraintCard from './ConstraintCard';

import styles from './Announcements.scss';
import { Constraint } from 'types/constraint';

interface CarouselType {
  constraintCards: Constraint[];
  activeIndex: number;
}

// const Carousel = ({ constraintCards: Constraint[], activeIndex: number, setActiveIndex: React.Dispatch<React.SetStateAction<number>>}) => {
const Carousel = ({ constraintCards, activeIndex }: CarouselType) => {
  //   const [activeIndex, setActiveIndex] = useState(0);
  // {satisfied ? {} : {}}
  return (
    <div className={styles.carousel}>
      <div className={styles.body}>
        {console.log(activeIndex)}
        {constraintCards
          .filter((constraint: Constraint) => constraint.index == activeIndex)
          .map((constraint: Constraint) => (
            <ConstraintCard {...constraint} />
          ))}
      </div>
    </div>
  );
};
export default Carousel;
