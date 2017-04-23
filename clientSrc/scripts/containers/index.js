import '../../styles/test.scss';

$(function () {
  $('#carousel-example-generic').carousel({
    interval: 2000,
  });

  const a = 1;

  setTimeout(() => {
    console.log(a);
  }, 2000);


  console.log('asdwfsdfadsafsda');
  console.log(111);
});

