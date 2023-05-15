
const btn = document.querySelector('.btn');
const panel = document.querySelector('#panel');

btn.addEventListener('click', function () {
  panel.classList.toggle('show');
});

//   var link_handle = false;
//   const dataObject = {};
//   dataObject [{{ link_handle }}] = false; 

//   const element = document.querySelector('[x-data]');
//   element.setAttribute('x-data', JSON.stringify(dataObject));


// cart
const cart = document.querySelector(".cart");
const cartItems = document.querySelector(".cartItems");

cart.addEventListener('click', function () {
  cartItems.classList.toggle('show');
})

// 
$(document).ready(function () {
  $('.slider-marquee-content-parent').slick({
    // slidesToShow: 2,
    dots: false,
    autoplaySpeed: 0,
    autoplay: true,
    speed: 10000,
    slidesToScroll: 2,
    cssEase: 'linear',
    infinite: true,
  });
  $('.slider-marquee-content').hover(
    function () {
      $(this).slick('slickPause');
    },
    function () {
      $(this).slick('slickPlay');
    }
  );
});


// the progressive bar at cs ortho product page
var ele = document.querySelectorAll(".discount_bar")[0];
var svg = document.querySelectorAll(".discount_bar_circle")[0];
var totalPrice = JSON.parse(ele.getAttribute("data-total-price"));
var percentage = (totalPrice / 500000) * 100;
if (percentage > 100){
  percentage = 100;
}
svg.style.marginLeft = percentage + '%';
ele.style.width = percentage + '%';







