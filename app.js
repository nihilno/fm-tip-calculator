const buttonsTip = document.querySelectorAll(".button__tip");
const resetButton = document.querySelector(".button__reset");

const billAmount = document.querySelector("#bill");
const customTip = document.querySelector("#custom");
const numberOfPeople = document.querySelector("#n_people");

const billTipAmount = document.querySelector("#tip_amount");
const billTotalAmount = document.querySelector("#total");

buttonsTip.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let tipValue = e.target.innerText;
    tipValue = tipValue.substr(0, tipValue.length - 1);

    if (billAmount.value === "") return;
    if (numberOfPeople.value === "") numberOfPeople.value = 1;

    calculateTip(
      parseFloat(billAmount.value),
      parseInt(tipValue),
      parseInt(numberOfPeople.value)
    );
    if (button.classList.contains("clicked")) {
      button.classList.toggle("clicked");
    } else {
      buttonsTip.forEach((button) => button.classList.remove("clicked"));
      button.classList.add("clicked");
    }
  });
});

customTip.addEventListener("input", (e) => {
  if (billAmount.value === "") {
    resetEveryThing();
    return;
  }
  if (numberOfPeople.value === "") numberOfPeople.value = 1;
  calculateTip(
    parseFloat(billAmount.value),
    parseInt(e.target.value),
    parseInt(numberOfPeople.value)
  );
});

function calculateTip(billAmount, tipPercentage, numberOfPeople) {
  let tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
  let tip = Math.floor(tipAmount * 100) / 100;
  tip = tip.toFixed(2);

  let totalAmount = (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
  totalAmount = totalAmount.toFixed(2);

  billTipAmount.innerHTML = `$${tip}`;
  billTotalAmount.innerHTML = `$${totalAmount}`;
  resetButton.classList.add("error");
}

resetButton.addEventListener("click", resetEveryThing);

function resetEveryThing() {
  billTipAmount.innerHTML = "$0.00";
  billTotalAmount.innerHTML = "$0.00";
  billAmount.innerHTML = "";
  customTip.value = "";
  numberOfPeople.value = "";
  if (resetButton.classList.contains("error"))
    resetButton.classList.remove("error");
}
