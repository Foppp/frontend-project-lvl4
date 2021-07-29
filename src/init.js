import init from './index';
import { render } from 'react-dom';

const vdom = init();
// console.log(document.getElementById('chat'))
render(
  vdom,
  document.getElementById('chat'),
);