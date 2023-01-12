function slider({
  container,
  wrapper,
  field,
  slide,
  prev,
  next,
  current,
  totalCounter,
}) {
  const slider = document.querySelector(container);
  const sliderWrapper = document.querySelector(wrapper);
  const sliderField = document.querySelector(field);
  const slides = document.querySelectorAll(slide);
  const prevSlider = document.querySelector(prev);
  const nextSlider = document.querySelector(next);
  const currentSlide = document.querySelector(current);
  const totalSlider = document.querySelector(totalCounter);
  const indicators = document.createElement('ol');
  const width = window.getComputedStyle(sliderWrapper).width;

  const dots = [];

  slider.style.position = 'relative';

  indicators.classList.add('carousel-indicators');

  slider.append(indicators);

  let slideNum = 1;
  let offset = 0;

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    indicators.append(dot);
    dots.push(dot);
  }

  const listenCurrentSlide = () => {
    currentSlide.textContent = slideNum < 10 ? `0${slideNum}` : slideNum;
  };

  listenCurrentSlide();

  const dotsOpacity = () => {
    dots.forEach((dot) => (dot.style.opacity = 0.5));
    dots[slideNum - 1].style.opacity = 1;
  };

  dotsOpacity();

  sliderWrapper.style.overflow = 'hidden';

  sliderField.style.cssText = `
  display: flex;
  width: ${100 * slides.length}%;
  transition: 0.5s all;
  `;

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  totalSlider.textContent =
    slides.length < 10 ? `0${slides.length}` : slides.length;

  function converToANumber(data) {
    return +data.replace(/\D/g, '');
  }

  const switchNextSlider = () => {
    if (offset == converToANumber(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += converToANumber(width);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;

    if (slideNum == slides.length) {
      slideNum = 1;
    } else {
      slideNum++;
    }

    dotsOpacity();
    listenCurrentSlide();
  };

  const switchPrevSlider = () => {
    if (offset == 0) {
      offset += converToANumber(width) * (slides.length - 1);
    } else {
      offset -= converToANumber(width);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;

    if (slideNum == 1) {
      slideNum = slides.length;
    } else {
      slideNum--;
    }

    dotsOpacity();
    listenCurrentSlide();
  };

  nextSlider.addEventListener('click', switchNextSlider);

  prevSlider.addEventListener('click', switchPrevSlider);

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideNum = slideTo;
      offset = converToANumber(width) * (slideTo - 1);

      sliderField.style.transform = `translateX(-${offset}px)`;

      dotsOpacity();
      listenCurrentSlide();
    });
  });
}

export default slider;
