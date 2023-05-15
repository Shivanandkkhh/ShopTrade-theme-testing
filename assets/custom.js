
  const btn = document.querySelector('.btn');
  const panel = document.querySelector('#panel');

  btn.addEventListener('click', function() {
    panel.classList.toggle('show');
  });
 
//   var link_handle = false;
//   const dataObject = {};
//   dataObject [{{ link_handle }}] = false; 
  
//   const element = document.querySelector('[x-data]');
//   element.setAttribute('x-data', JSON.stringify(dataObject));
  

// cart
const cart  = document.querySelector(".cart");
const cartItems = document.querySelector(".cartItems");

cart.addEventListener('click',function(){
  cartItems.classList.toggle('show');
})

// 
$(document).ready(function() {
  $('.slider-marquee-content-parent').slick({
    // slidesToShow: 2,
    dots: false,
    autoplaySpeed: 0,
    autoplay: true,
    speed:10000,
    slidesToScroll: 2,
    cssEase: 'linear',
    infinite: true,
  });
  $('.slider-marquee-content').hover(
    function() {
      $(this).slick('slickPause');
    },
    function() {
      $(this).slick('slickPlay');
    }
  );
});
let btnm = document.getElementsByClassName("btn-pg-bar")[0];
btnm.addEventListener("click", function () {
    var ele = document.querySelectorAll(".discount_bar")[0];
    var svg = document.querySelectorAll(".discount_bar_circle")[0];
    var width = 1;
    var margin = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id)
        }
        else {
            width++;
            ele.style.width = width + '%';
        }
    }
    var iid = setInterval(frames, 10);
    function frames() {
        if (margin >= 100) {
            clearInterval(iid)
        }
        else {
            margin++;
            svg.style.marginLeft = margin + '%';
        }
    }
});


