import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { text, select } from '@storybook/addon-knobs';

const stories = storiesOf('Demo', module);

stories.add('Carousel', () => {
  const active = select('Item', { a: 1, b: 2, c: 3, d: 4 }, 1);
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
  ];

  return `
  <ul>
    ${items.map(item => `<li>${item}</li>`).join('')}
  </ul>`;
});
