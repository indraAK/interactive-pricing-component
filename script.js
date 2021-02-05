const totalPageViewsEl = document.querySelector('#total-pageviews');
const totalPriceEl = document.querySelector('#total-price');
const slider = document.querySelector('#slider');
const toggleBilling = document.querySelector('#toggle-billing');

let isGrabbing = false;
let isYearly = false;
let discount = 25;

// Update price
function updatePrice(currentRangeValue, currentPrice = 0) {
   switch (parseInt(currentRangeValue)) {
      case 0:
         totalPageViewsEl.textContent = '10K pageviews';
         currentPrice = 8;
         totalPriceEl.textContent = `${isYearly ? getDiscount(currentPrice, discount) : numberFormat(currentPrice)}`;
         break;
      case 25:
         totalPageViewsEl.textContent = '50K pageviews';
         currentPrice = 12;
         totalPriceEl.textContent = `${isYearly ? getDiscount(currentPrice, discount) : numberFormat(currentPrice)}`;
         break;
      case 50:
         totalPageViewsEl.textContent = '100K pageviews';
         currentPrice = 16;
         totalPriceEl.textContent = `${isYearly ? getDiscount(currentPrice, discount) : numberFormat(currentPrice)}`;
         break;
      case 75:
         totalPageViewsEl.textContent = '500K pageviews';
         currentPrice = 24;
         totalPriceEl.textContent = `${isYearly ? getDiscount(currentPrice, discount) : numberFormat(currentPrice)}`;
         break;
      case 100:
         totalPageViewsEl.textContent = '1M pageviews';
         currentPrice = 36;
         totalPriceEl.textContent = `${isYearly ? getDiscount(currentPrice, discount) : numberFormat(currentPrice)}`;
         break;
   }
}

// Format number to currency
function numberFormat(number) {
   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
   });

   return formatter.format(number);
}

// Update width of progressbar
function updateProgressBar(width) {
   document.documentElement.style.setProperty('--progressbar-width', `${width}%`);
}

// Get total price, result from current price - total discount
function getDiscount(currentPrice, discount) {
   return numberFormat(currentPrice - (currentPrice * (discount / 100)));
}

// when mouse button is pressing
slider.addEventListener('mousedown', (e) => {
   isGrabbing = true;
   e.target.classList.add('grabbing');
});

// when mouse button is released
slider.addEventListener('mouseup', (e) => {
   isGrabbing = false;
   e.target.classList.remove('grabbing');
});

// when mouse pointer is moved
slider.addEventListener('mousemove', (e) => {
   if (isGrabbing && isYearly) return;

   if (isGrabbing && !isYearly) {
      const currentRangeValue = e.target.value;
      updatePrice(currentRangeValue);
      updateProgressBar(currentRangeValue);
   }
});

slider.addEventListener('change', (e) => {
   const currentRangeValue = e.target.value;
   const currentPrice = parseInt(totalPriceEl.textContent.split('$').slice(1).join(''));
   if (isYearly) {
      updatePrice(currentRangeValue, currentPrice);
      updateProgressBar(currentRangeValue);
   } else {
      updatePrice(currentRangeValue, currentPrice);
      updateProgressBar(currentRangeValue);
   }
});

// toggle billings
toggleBilling.addEventListener('click', function () {
   this.classList.toggle('yearly');
   const currentRangeValue = slider.value;
   const currentPrice = parseInt(totalPriceEl.textContent.split('$').slice(1).join(''));

   if (this.classList.contains('yearly')) {
      isYearly = true
      // a 25% discount should be applied to all prices
      updatePrice(currentRangeValue, currentPrice);
   } else {
      isYearly = false;
      updatePrice(currentRangeValue, currentPrice);
   }
});
