
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

// cx ortho membership bar 
var bars = document.querySelectorAll(".discount_bar");
var circles = document.querySelectorAll(".discount_bar_circle");
for (var i = 0; i < bars.length; i++) {
  var ele = bars[i];
  var svg = circles[i];
  var totalPrice = JSON.parse(ele.getAttribute("data-total-price"));
  var percentage = (totalPrice / 500000) * 100;
  
  if (percentage > 97) {
    percentage = 97;
  }

  svg.style.marginLeft = percentage + '%';
  ele.style.width = percentage + '%';
  
}



// 
var tooltip  = document.querySelectorAll(".discount_bar_heading__tootip")[0]
var bars = document.querySelectorAll(".discount_bar");
for (var i = 0; i < bars.length; i++) {
  var totalPric = JSON.parse(ele.getAttribute("data-total-price"));
  var percentag = (totalPric / 500000) * 100;
  if(percentag > 95 ){
   percentag = 55
 }
  else if (percentag > 50){
    percentag = 70
  }
    tooltip.style.marginLeft = -percentag + '%';
  }

  
 

// --------------------------------

  // if (percentag > 70) {
  //   tooltip.style.justifyContent = 'flex-end';
  // }
  // else if (percentag > 30){
  //   tooltip.style.justifyContent = 'center';
  // }
  // else{
  //   tooltip.style.justifyContent = 'flex-start';
  // }




// cx ortho membership
let member = document.getElementsByClassName("membership_btn")[0];
let section = document.getElementsByClassName("membership_section")[0];
let promember = document.getElementsByClassName("after_membership")[0];

member.addEventListener('click', function(){
  section.style.display = "none";
  promember.style.display= "block";
});

