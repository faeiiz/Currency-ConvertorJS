const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.onload = () => {
  updateCurrency();
};
for (let select of dropdowns) {
  for (currCode in countryList) {
    // console.log(code);
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  //element == select from dropdown
  let currCode = element.value;
  console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img"); //Go to parent Element of Select and select the img element
  img.src = newSrc;
};

button.addEventListener("click", (event) => {
  event.preventDefault(); //default is stopped
  updateCurrency();
});
updateCurrency = async () => {
  let amt = document.querySelector(".amount input");
  amtval = amt.value;
  if (amtval < 1 || amtval == "") {
    amtval = 1;
    amt.value = amtval;
  }
  //   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; APNA COLLEGE
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmt = amtval * rate;
  msg.innerText = `${amtval} ${fromCurr.value} == ${finalAmt} ${toCurr.value}`;
};
