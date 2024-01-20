import React from 'react';
import './index.css';
import Carousel from './Carousel';

const CarouselItem = ({ requirements, activeIndex, setActiveIndex }) => { 
  return (
    <div>
      <Carousel requirements = {requirements} activeIndex = {activeIndex} setActiveIndex = {setActiveIndex}/>
    </div>
  );
}
export default CarouselItem;