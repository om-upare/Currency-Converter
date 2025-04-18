const baseUrl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExcRate();
});

const updateExcRate = async () => {
  let input = document.querySelector(".amount input");
  let amount = input.value;
  if (amount === 0 || amount < 1) {
    amount = 1;
    input.value = "1";
  }

  const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  let allCtyCurr = data[fromCurr.value.toLowerCase()];

  let CtyCurrRate = allCtyCurr[toCurr.value.toLowerCase()];

  let finalAmount = amount * CtyCurrRate;

  msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

window.addEventListener("load", () => {
  updateExcRate();
});
