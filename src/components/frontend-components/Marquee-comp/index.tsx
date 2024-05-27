// src/Marquee.js
import { FC, ReactNode } from 'react';
import './style.css';

type Props = {
  images: any[]
}

const MarqueeComp: FC<Props> = ({ images }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee">
        {images.map((image, index) => (
          <div key={index} className="mx-2">
            <img src={image} alt={`Marquee Image ${index}`} className="h-16" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeComp;

