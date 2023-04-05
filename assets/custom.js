
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