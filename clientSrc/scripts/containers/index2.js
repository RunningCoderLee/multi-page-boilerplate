import _ from 'lodash';
import Comp1 from '../components/comp1';
import '../../styles/test2.scss';

$(function () {
  Comp1.output();

  const array = [1];
  const other = _.concat(array, 2, [3], [[4]]);
  console.log(other);

  $('body').append($('<h2>这是JS添加的文字 - Page2</h2>'));
  console.log(222);
});

