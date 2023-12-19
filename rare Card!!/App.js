import React, { useState, useRef } from 'react';
import './App.scss';

const App = () => {
  const [hoverStyle, setHoverStyle] = useState({});
  const cardsRef = useRef([]);

  const handleMouseMove = (e, cardIndex) => {
    e.preventDefault();

    const pos = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    if (e.type === 'touchmove') {
      pos[0] = e.touches[0].clientX;
      pos[1] = e.touches[0].clientY;
    }

    const $card = cardsRef.current[cardIndex];
    const l = pos[0];
    const t = pos[1];
    const h = $card.clientHeight;
    const w = $card.clientWidth;
    const px = Math.abs(Math.floor((100 / w) * l) - 100);
    const py = Math.abs(Math.floor((100 / h) * t) - 100);
    const pa = (50 - px) + (50 - py);
    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;
    const pxSpark = 50 + (px - 50) / 7;
    const pySpark = 50 + (py - 50) / 7;
    const pOpc = 20 + Math.abs(pa) * 1.5;
    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 1.5) * 0.5;

    const gradPos = `background-position: ${lp}% ${tp}%;`;
    const sprkPos = `background-position: ${pxSpark}% ${pySpark}%;`;
    const opc = `opacity: ${pOpc / 100};`;
    const tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;

    setHoverStyle({
      gradPos,
      sprkPos,
      opc,
      tf,
    });

  };



  return (
    <div>
      <section className="cards">
        {[1].map((_, index) => (
          <div
            key={index}
            className={`card ${index === 0 ? 'charizard' : ''}`}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onTouchMove={(e) => handleMouseMove(e, index)}

            ref={(ref) => (cardsRef.current[index] = ref)}
          ></div>
        ))}
      </section>

      <style>
        {`
          .card:hover:before { ${hoverStyle.gradPos || ''} }  /* gradient */
          .card:hover:after { ${hoverStyle.sprkPos || ''} ${hoverStyle.opc || ''} }   /* sparkles */
          .card:hover { ${hoverStyle.tf || ''} } /* transform */
        `}
      </style>
    </div>
  );
};

export default App;
