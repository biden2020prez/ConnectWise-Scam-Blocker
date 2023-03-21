// ==UserScript==
// @name         ConnectWise Scam Warning
// @namespace    https://example.com/
// @version      1
// @description  Warns users about ConnectWise scam websites
// @match        *://*/*
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const scamUrlsUrl = "https://raw.githubusercontent.com/biden2020prez/ConnectWise-Scam-Blocker/main/connectwisescammerlinks.txt" // replace with your URL
let scamWebsites = [];

GM_xmlhttpRequest({
  method: "GET",
  url: scamUrlsUrl,
  onload: function(response) {
    if (response.status === 200) {
      scamWebsites = response.responseText.split("\n").filter(Boolean);
      checkScamWebsite();
    } else {
      console.error(`Failed to retrieve scam website list. Error code: ${response.status}`);
    }
  },
  onerror: function(error) {
    console.error(`Failed to retrieve scam website list. Error message: ${error.message}`);
  }
});

function checkScamWebsite() {
  const currentUrl = window.location.href;
  if (scamWebsites.includes(currentUrl)) {
    const warningText = "Watch out! This is a dangerous ConnectWise Scam";
    const warningElement = document.createElement("div");
    warningElement.style.position = "fixed";
    warningElement.style.backgroundColor = "#ff6961";
    warningElement.style.color = "#fff";
    warningElement.style.fontSize = "14px";
    warningElement.style.fontWeight = "bold";
    warningElement.style.padding = "5px";
    warningElement.style.borderRadius = "3px";
    warningElement.style.top = "0";
    warningElement.style.left = "0";
    warningElement.style.right = "0";
    warningElement.style.zIndex = "9999";
    warningElement.innerHTML = `<div style="text-align:center;"><span style="font-size: 36px;">⚠️</span> <br>${warningText}</div>`;

    document.body.appendChild(warningElement);



  alert("This is a ConnectWise Scam website! Be careful!");
  }
}
