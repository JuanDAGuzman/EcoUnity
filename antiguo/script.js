// window.onload = function() {
//     const isAuthenticated = localStorage.getItem("isAuthenticated");
  
//     if (!isAuthenticated) {
//       window.location.href = 'login.html';
//     }
// }

document.addEventListener('DOMContentLoaded', function () {
    const shoppingCartIcon = document.querySelector('nav .menu');

    shoppingCartIcon.addEventListener('click', function () {
      window.location.href = 'menu_mobile.html';
    });
  });


document.addEventListener('DOMContentLoaded', function () {
    const shoppingCartIcon = document.querySelector('.navbar-shopping-cart img');

    shoppingCartIcon.addEventListener('click', function () {
      window.location.href = 'my_order.html';
    });
  });