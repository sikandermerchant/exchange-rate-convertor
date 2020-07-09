//Get DOM Elements
const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swapBtn = document.getElementById("swap-btn");

//Fetch exchange rates and update DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/ba02b537b5fc84a26b2d2151/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const rate = data.conversion_rates[currency_two];
      console.log(rate);
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

//Swap Currencies Function
function swapCurrencies() {
  const tempValue = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = tempValue;
  calculate();
}
///Events Listeners
//Currency one elements - select and input
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate); ///input provides input the input element by keys or by using up and down arrows

//Currency two elements - select and input
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

//Swap button
swapBtn.addEventListener("click", swapCurrencies);
