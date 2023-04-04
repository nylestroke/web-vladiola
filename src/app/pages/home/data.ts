import { sliderOpt } from 'src/app/shared/data';

export const introSlider = {
  ...sliderOpt,
  nav: false,
  loop: false,
  responsive: {
    992: {
      nav: true,
    },
  },
};

export const brandSlider = {
  ...sliderOpt,
  nav: false,
  dots: false,
  margin: 0,
  loop: false,
  responsive: {
    0: {
      items: 2,
    },
    420: {
      items: 3,
    },
    600: {
      items: 4,
    },
    900: {
      items: 5,
    },
    1024: {
      items: 6,
      margin: 30,
    },
  },
};

export const productSlider = {
  ...sliderOpt,
  nav: false,
  dots: true,
  margin: 20,
  loop: false,
  autoHeight: false,
  items: true,
  responsive: {
    320: {
      items: 2,
    },
    576: {
      items: 3,
    },
    768: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      nav: true,
      items: 4,
    },
  },
};

export const instagramSlider = {
  ...sliderOpt,
  nav: false,
  dots: false,
  items: 2,
  margin: 20,
  loop: false,
  responsive: {
    576: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      items: 5,
    },
  },
};

export const featureSlider = {
  ...sliderOpt,
  nav: false,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
      margin: 20,
    },
    992: {
      items: 1,
    },
  },
};
