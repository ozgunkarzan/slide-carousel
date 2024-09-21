import { useEffect, useState } from 'react';
import { shortList, list, longList } from './data';
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [current, setCurrent] = useState(0);
  const [autoSlideDir, setAutoSlideDir] = useState(true);

  const prevSlide = () => {
    setAutoSlideDir(false);
    if (current != 0)
      setCurrent(() => {
        return current - 1;
      });
    else
      setCurrent(() => {
        return people.length - 1;
      });
  };
  const nextSlide = () => {
    setCurrent(() => {
      setAutoSlideDir(true);
      const result = (current + 1) % people.length;
      return result;
    });
  };

  useEffect(() => {
    let sliderId = setInterval(() => {
      autoSlideDir ? nextSlide() : prevSlide();
    }, 2000);
    return () => {
      clearInterval(sliderId);
    };
  }, [current]);

  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { id, name, image, title, quote } = person;
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (personIndex - current)}%)`,
              opacity: personIndex === current ? 1 : 0,
              visibility: personIndex === current ? 'visible' : 'hidden',
            }}
            key={id}
          >
            <img src={image} alt={id} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button type="button" className="prev" onClick={prevSlide}>
        <FiChevronLeft />
      </button>

      <button type="button" className="next" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};
export default Carousel;
