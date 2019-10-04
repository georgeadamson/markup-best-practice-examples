import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { text, select } from '@storybook/addon-knobs';

const stories = storiesOf('Markup', module);

stories.add('Carousel', () => {
  const active = select('Item', { item0: 0, item1: 1, item2: 2, item3: 3 });
  const items = [
    'The',
    'quick',
    'brown',
    'fox',
    'jumped',
    'over',
    'the',
    'lazy',
    'dog'
  ].map(
    (item, i) => `
      <div>Item ${i}: ${item}</div>
      <a href=".">A link inside carousel item${i}</a>
     `
  );

  const style = `
  <style>
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .carousel__items {
      overflow-x: auto;
      white-space: nowrap;

      /* Ensure smooth scrolling when nav links to carousel items: */
      scroll-behavior: smooth; 

      /* Use momentum scrolling: */
      -webkit-overflow-scrolling: touch;

      /* Snap scroll to each item: */
      -ms-scroll-snap-type: x mandatory;
      -webkit-scroll-snap-type: x mandatory;
      scroll-snap-type: x mandatory;

      /* This seems to fix a strange painting lag after scrolling in Chrome: */
      -webkit-transform: translate3d(0, 0, 0);
    }
    .carousel__item {
      display: inline-block;
      padding: 1rem;
      width: 100%;
      height: 100px;
      /* This prevents padding from causing misalignment after snap scroll: */
      box-sizing: border-box;
      /* Position to snap scrolling to: */
      scroll-snap-align: start;
    }
    .carousel__item:nth-child(odd) {
      background: #aaa;
    }
    .carousel__item:nth-child(even) {
      background: #bbb;
    }
    .carousel__dots {
      text-align: center;
    }
    .carousel__dot {
      border: none;
      display: inline-block;
    }
    .carousel__dot-button {
      border: none;
      text-decoration: none;
      padding: .25rem;
    }
    .carousel__dot-button:active {
      box-shadow: 0px 0px 3px blue;
    }
    .sr-only {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      pointer-events: none;
      position: absolute;
      width: 1px;
      /* This is necessary to prevent Lighthouse Report from thinking hidden text is too small: */
      font-size: 1rem;
    }

    /* Show 2 items at a time, with less dots */
    @media screen and (min-width: 48rem) {
      .carousel:nth-of-type(2) .carousel__item {
        width: 50%;
      }
      .carousel:nth-of-type(2) .carousel__dot:nth-child(2n):not(:last-child) {
        display: none;
      }

      .carousel:nth-of-type(3) .carousel__item {
        width: 33%;
      }
      .carousel:nth-of-type(3) .carousel__dot:not(:nth-child(3n - 2)):not(:last-child) {
        display: none;
      }
    }
  </style>
  `;

  const markup = `<section class="carousel" aria-labelledby="carouselheading">
    <h3 id="carouselheading">Demo carousel</h3>
    <ul class="carousel__items" tabindex="0" aria-labelledby="carouselheading">
      ${items
        .map(
          (item, i) => `
            <li class="carousel__item" id="item${i}">
              ${item}
            </li>
          `
        )
        .join('')}
    </ul>
    <!-- Dots: -->
    <nav>
      <ul class="carousel__dots" tabindex="0" aria-label="Carousel navigation">
        ${items
          .map(
            (item, i) => `
            <li class="carousel__dot">
              <a class="carousel__dot-button" href="#item${i}" target="_self">
                <i aria-hidden="true">•</i>
                <i class="sr-only">Go to item ${i}</i>
              </a>
            </li>
          `
          )
          .join('')}
      </ul>
    </nav>
  </section>`;

  return (
    style +
    markup.replace(/item(\d)/g, 'A item $1') +
    markup.replace(/item(\d)/g, 'B item $1') +
    markup.replace(/item(\d)/g, 'C item $1')
  );
});

/*
Readme
- Carousel container <section> with label
  https://www.w3.org/WAI/tutorials/carousels/structure/
- By making list focusable (tabindex="0") we get keyboard control of scroll.
  https://dequeuniversity.com/rules/axe/3.3/scrollable-region-focusable?application=axeAPI

*/
