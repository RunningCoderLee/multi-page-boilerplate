import '../../styles/test4.scss';
import Comp1 from '../components/comp1';

$(function () {
  Comp1.output();
  $('body').append($('<h2>这是JS添加的文字 - Page4</h2>'));
  console.log(444);
});

