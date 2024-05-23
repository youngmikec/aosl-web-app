// src/Marquee.js
import { FC, ReactNode } from 'react';
import './style.css';

type Props = {
  children: ReactNode
}

const MarqueeComp: FC<Props> = ({ children }) => {
  return (
    <div className="marquee-container">
      <div className="marquee">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MarqueeComp;
