import React, { useState, useRef, useEffect } from 'react';

import { CarouselButton, CarouselButtonDot, CarouselButtons, CarouselContainer, CarouselItem, CarouselItemImg, CarouselItemText, CarouselItemTitle, CarouselMobileScrollNode } from './TimeLineStyles';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { TimeLineData } from '../../constants/constants';

const TOTAL_CAROUSEL_COUNT = TimeLineData.length;

const Timeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const carouselRef = useRef();

  const scroll = (node, left) => {
    return node.scrollTo({ left, behavior: 'smooth' });
  }

  const handleClick = (e, i) => {
    e.preventDefault();

    if (carouselRef.current) {
      const scrollLeft = Math.floor(carouselRef.current.scrollWidth * 0.7 * (i / TimeLineData.length));

      scroll(carouselRef.current, scrollLeft);
    }
  }

  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round((carouselRef.current.scrollLeft / (carouselRef.current.scrollWidth * 0.7)) * TimeLineData.length);

      setActiveItem(index);
    }
  }

  // snap back to beginning of scroll when window is resized
  // avoids a bug where content is covered up if coming from smaller screen
  useEffect(() => {
    const handleResize = () => {
      scroll(carouselRef.current, 0);
    }

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Section id='about'>
      <SectionDivider />
      <br />
      <SectionTitle>About Me</SectionTitle>
      <SectionText >
        Hello, I'm Kedir, a computer science enthusiast 
        with a passion for competitive programming. 
        I've had a solid foundation in computer science 
        through my academic background, and I've honed 
        my problem-solving skills through various 
        competitive programming competitions. I'm 
        constantly learning and exploring new technologies
         and algorithms to improve my skills and stay
          up-to-date with the latest trends.Thanks 
          for stopping by!
      </SectionText>
      <CarouselContainer ref={carouselRef} onScroll={handleScroll}>
        <>
          {TimeLineData.map((item, index) => (
            <CarouselMobileScrollNode key={index} final={index === TOTAL_CAROUSEL_COUNT - 1}>
              <CarouselItem
                index={index}
                id={`carousel__item-${index}`}
                active={activeItem}
                onClick={(e) => handleClick(e, index)}
              >
                <CarouselItemTitle>
                  {item.year}
                  <CarouselItemImg
                    width='208'
                    height='6'
                    viewBox='0 0 208 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M104 0C166.136 0 208 2.6913 208 6H0C0 2.6913 41.8639 0 104 0Z'
                      fill='url(#paint0_linear)'
                      fillOpacity='0.33'
                    />
                    <defs>

                      <linearGradient
                        id='paint0_linear'
                        x1='-4.30412e-10'
                        y1='0'
                        x2='208'
                        y2='0'
                        gradientUnits='userSpaceOnUse'>
                        <stop stopColor='white' />
                        <stop
                          offset='0.79478'
                          stopColor='white'
                          stopOpacity='0'
                        />
                      </linearGradient>
                    </defs>
                  </CarouselItemImg>
                </CarouselItemTitle>
                <CarouselItemText>
                  {item.text}
                </CarouselItemText>
              </CarouselItem>
            </CarouselMobileScrollNode>
          ))}
        </>
      </CarouselContainer>
      <CarouselButtons>
        {TimeLineData.map((item, index) => (
          <CarouselButton
            key={index}
            index={index}
            active={activeItem}
            onClick={(e) => handleClick(e, index)}
            type='button'
          >
            <CarouselButtonDot active={activeItem} />
          </CarouselButton>
        ))}
      </CarouselButtons>
    </Section>

  );
};

export default Timeline;
