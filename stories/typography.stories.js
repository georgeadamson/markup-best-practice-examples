import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { text, select } from '@storybook/addon-knobs';

const stories = storiesOf('Markup', module);

stories.add('Typography', () => {
  return `<h1 class="h1">Hello world</h1>`;
});

/*
Readme
- Carousel container <section> with label
  https://www.w3.org/WAI/tutorials/carousels/structure/
- By making list focusable (tabindex="0") we get keyboard control of scroll.
  https://dequeuniversity.com/rules/axe/3.3/scrollable-region-focusable?application=axeAPI

*/
