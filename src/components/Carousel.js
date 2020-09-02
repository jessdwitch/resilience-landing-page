import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';

const Carousel = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(() => {
    return (<div>

    </div>);
  }, [children, currentSlide]);

  return (<div className="carousel-container">
    {children.length > 1
      ? (
        <Button className="carousel-leftArrow">&lt;</Button> // TODO: Wireup. Styling
        <Button className="carousel-rightArrow">&gt;</Button> // TODO: Wireup. Styling
        {slides}
        // TODO: dot navigation
      ) : (
        children[0]
      )}
  </div>);
};

export default Carousel;