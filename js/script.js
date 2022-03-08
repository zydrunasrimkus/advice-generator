"use strict";

//fetch api

const fetchAdviceSlip = async () => {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    if (!res.ok) throw new Error("Problem fetching api");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

//show data on dom
const showQuote = () => {
  fetchAdviceSlip()
    .then((data) => {
      const { id, advice } = data.slip;

      //insert id
      document.querySelector(".quotes--id").innerText = `advice #${id}`;

      //insert advice
      document.querySelector(".quotes--advice").innerText = `"${advice}"`;
    })
    .catch((err) => console.error(err));
};

//get browser window size and set correct pattern divider svg
const setPatternDivider = () => {
  let browserWidth = window.innerWidth;
  let currSize;
  if (browserWidth > 600) currSize = "desktop";
  if (browserWidth <= 600) currSize = "mobile";

  document.querySelector(
    ".pattern-divider"
  ).innerHTML = `<img src="./images/pattern-divider-${currSize}.svg" alt="pattern-divider"></span>`;

  window.addEventListener("resize", setPatternDivider);
};

//fetch api when page loaded
window.addEventListener("onload", showQuote());

//set pattern divider based on screen size
window.addEventListener("DOMContentLoaded", setPatternDivider);

//listen for button to set new quote
document.querySelector(".quotes--button").addEventListener("click", (e) => {
  e.preventDefault();
  showQuote();
});
