import React, {
  useMemo, useState, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

const Carousel = ({ children, showButtons }) => {
  const [isPrimarySlide, setIsPrimarySlide] = useState(true);
  const [isLeftward, setIsLeftward] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [primaryContent, setPrimaryContent] = useState(children[0]);
  const [secondaryContent, setSecondaryContent] = useState(<></>);

  const prevSlideRef = useRef();
  useEffect(() => {
    prevSlideRef.current = currentSlide;
  });
  const prevSlide = prevSlideRef.current;

  useEffect(() => {
    if (isPrimarySlide) {
      setSecondaryContent(children[currentSlide]);
    } else {
      setPrimaryContent(children[currentSlide]);
    }
    setIsLeftward(prevSlide < currentSlide);
    setIsPrimarySlide(!isPrimarySlide);
  }, [currentSlide]);

  const slides = useMemo(() => (
    <div>
      <Slide
        className="carousel-slide"
        direction={isLeftward === isPrimarySlide ? 'left' : 'right'}
        in={isPrimarySlide}
        unmountOnExit
        mountOnEnter
      >
        <div>{primaryContent}</div>
      </Slide>
      <Slide
        className="carousel-slide"
        direction={isLeftward === isPrimarySlide ? 'right' : 'left'}
        in={!isPrimarySlide}
        unmountOnExit
        mountOnEnter
      >
        <div>{secondaryContent}</div>
      </Slide>
    </div>
  ), [children, isPrimarySlide]);

  return (
    <div className="carousel-container">
      {children.length > 1
        ? (
          <div>
            {slides}
            {showButtons
              ? (
                <div className="carousel-dot-group">
                  {children.map((_, index) => (
                    <Button
                      className="carousel-dot-button"
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <div className={`carousel-dot-label ${currentSlide === index ? 'selected' : ''}`} />
                    </Button>
                  ))}
                </div>
              )
              : <></>}
          </div>
        ) : (
          children[0]
        )}
    </div>
  );
};

Carousel.propTypes = {
  children: (props, propName, componentName) => {
    const prop = props[propName];
    if (!Array.isArray(prop) || prop.length() < 1) {
      return new Error(`\`${componentName}\` must have at least one child.`);
    }
    return null;
  },
  showButtons: PropTypes.bool,
};

Carousel.defaultProps = {
  showButtons: true,
};

export default Carousel;
