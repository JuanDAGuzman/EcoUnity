document.addEventListener('DOMContentLoaded', function () {
  const totalAmountElement = document.getElementById('total_amount');
  const payButton = document.getElementById('payButton');

  // Recuperar el valor del precio del localStorage
  const price = localStorage.getItem('price');

  // Verificar si el precio existe en el localStorage
  if (price !== null) {
    // Mostrar el precio en el elemento HTML
    totalAmountElement.textContent = price + ' USD';
  } else {
    // Si no hay precio en el localStorage, mostrar un mensaje indicando que no hay precio definido
    totalAmountElement.textContent = 'Precio no definido';
  }
});





payButton.addEventListener('click', function () {
  const price = localStorage.getItem('price');
  if (price !== null) {
    // Mostrar el popup de procesamiento
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    // Actualizar el mensaje de procesamiento cada segundo
    let dots = '';
    const processingMessageElement = document.getElementById('processingMessage');
    const dotsInterval = setInterval(() => {
      processingMessageElement.textContent = `Procesando pago${dots}`;
      dots += '.';
      if (dots.length > 3) {
        dots = '';
      }
    }, 1000);

    // Después de 6 segundos, detener la aparición de puntos, mostrar el mensaje final y redirigir
    setTimeout(() => {
      clearInterval(dotsInterval); // Detener la aparición de puntos
      processingMessageElement.textContent = 'Procesando pago...'; // Mensaje final
      window.open('https://www.pse.com.co/pse1', '_blank'); // Redirigir
      popup.style.display = 'none'; // Ocultar el popup
      localStorage.removeItem("price");
      window.location.href = "./../../templates/pages/mis_pedidos.html";

    }, 6000);
  } else {
    alert('Precio no definido');
  }
});


(() => {
  // Variables
  const card_container = document.getElementById('card_container');
  const card_number_form = document.getElementById('card_number');
  const card_number_text = document.getElementById('card_number_text');
  const card_name_form = document.getElementById('card_name');
  const card_name_text = document.getElementById('card_name_text');
  const month_expiration = document.getElementById('month');
  const month_expiration_text = document.getElementById('month_text');
  const year_expiration = document.getElementById('year');
  const year_expiration_text = document.getElementById('year_text');
  const signature_text = document.getElementById('signature_text');
  const cvv = document.getElementById('cvv');
  const cvv_text = document.getElementById('cvv_text');
  const card_brand_logo = document.getElementById('card_brand_logo');

  let isCardRotated = false;
  card_container.addEventListener('click', function (e) {
    isCardRotated = !isCardRotated;

    if (isCardRotated) {
      rotateContentCard(180);
    } else {
      rotateContentCard(0);
    }
  });

  // Eventos
  card_container.addEventListener('click', function () {
    isCardRotated = !isCardRotated;
    rotateContentCard(isCardRotated ? 180 : 0);
  });

  card_number_form.addEventListener('input', onChangeCard);
  card_number_form.addEventListener('focus', () => rotateContentCard(0));

  month_expiration.addEventListener('change', onChangeMonth);
  month_expiration.addEventListener('focus', () => rotateContentCard(0));

  year_expiration.addEventListener('change', onChangeYear);
  year_expiration.addEventListener('focus', () => rotateContentCard(0));

  cvv.addEventListener('input', onChangeCVV);
  cvv.addEventListener('focus', () => rotateContentCard(180));

  card_name_form.addEventListener('input', onChangeName);
  card_name_form.addEventListener('focus', () => rotateContentCard(0));

  function rotateContentCard(deg) {
    card_container.style.transition = '.3s';
    card_container.style.transform = `rotateY(${deg}deg)`;
  }

  function onChangeCard(e) {
    const maxLength = 16;
    let value = e.target.value.replace(/\s/g, ''); // Eliminar todos los espacios

    // Limitar la longitud del número de tarjeta a 16 dígitos
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
      e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Actualizar el valor del campo de entrada con formato
      return; // Detener la ejecución de la función aquí si se supera la longitud máxima
    }
    e.target.value = e.target.value.replace(/\D/g, '');

    const maskedValue = value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ');
    card_number_text.textContent = maskedValue;

    if (value.startsWith('4')) {
      card_container.className = card_container.className.replace(
        /card-\w+/,
        'card-visa'
      );
      card_brand_logo.src = './logos/visa.png';
    } else if (value.startsWith('5')) {
      card_container.className = card_container.className.replace(
        /card-\w+/,
        'card-mastercard'
      );
      card_brand_logo.src = './logos/mastercard.png';
    } else if (value.startsWith('3')) {
      card_container.className = card_container.className.replace(
        /card-\w+/,
        'card-amex'
      );
      card_brand_logo.src = './logos/amex.png';
    } else if (value.startsWith('6')) {
      card_container.className = card_container.className.replace(
        /card-\w+/,
        'card-discover'
      );
      card_brand_logo.src = './logos/discover.png';
    } else {
      card_container.className = card_container.className.replace(
        /card-\w+/,
        'card-default'
      );
      card_brand_logo.src = '';
    }
  }

  function onChangeName(e) {
    let value = e.target.value;

    // Convertir a mayúsculas
    value = value.toUpperCase();
    e.target.value = value;

    // Limitar la longitud del nombre a 25 caracteres
    const maxLength = 25;
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
      e.target.value = value;
    }

    // Permitir solo letras y espacios
    const onlyLettersAndSpaces = /^[A-Za-z ]+$/;
    if (!value.match(onlyLettersAndSpaces)) {
      value = value.replace(/[^A-Za-z ]/g, '');
      e.target.value = value;
    }

    // Actualizar el texto
    card_name_text.textContent = value || 'Nombre Titular';
    signature_text.textContent = value || '';
  }

  function onChangeMonth(e) {
    month_expiration_text.textContent = e.target.value || '00';
  }

  function onChangeYear(e) {
    year_expiration_text.textContent = e.target.value || '00';
  }
  function onChangeCVV(e) {
    const maxLength = 4;
    let value = e.target.value;

    // Limitar la longitud del CVV a 4 dígitos
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
      e.target.value = value; // Actualizar el valor del campo de entrada
    }
    e.target.value = e.target.value.replace(/\D/g, '');

    cvv_text.textContent = value;
  }
})();
