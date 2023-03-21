// ==UserScript==
// @name         ConnectWise Scam Warning
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Warns if the link matches any from a specific online file, then shows a popup saying "This is a dangerous ConnectWise scam, use caution!" and adds a caution symbol and warning on top of the page.
// @match        *://*/*
// @grant GM_xmlhttpRequest
// ==/UserScript==

(async function() {
    const response = await fetch('https://raw.githubusercontent.com/biden2020prez/ConnectWise-Scam-Blocker/main/connectwisescammerlinks.txt');
    const scamLinks = await response.text().then(text => text.split('\n'));

    const currentUrl = window.location.href;
    if (scamLinks.some(link => currentUrl.includes(link))) {
        alert("This is a dangerous ConnectWise scam, use caution!");
        addWarning();
    }

    function addWarning() {
        const warningDiv = document.createElement('div');
        warningDiv.style.backgroundColor = 'red';
        warningDiv.style.color = 'white';
        warningDiv.style.fontSize = '20px';
        warningDiv.style.padding = '10px';
        warningDiv.innerHTML = '<strong>WARNING:</strong> This website is part of a ConnectWise scam. Use caution!';
        const bodyElem = document.querySelector('body');
        bodyElem.insertBefore(warningDiv, bodyElem.firstChild);

        const cautionImg = document.createElement('img');
        cautionImg.src = 'https://em-content.zobj.net/thumbs/120/apple/325/warning_26a0-fe0f.png';
        cautionImg.style.position = 'fixed';
        cautionImg.style.bottom = '10px';
        cautionImg.style.right = '10px';
        cautionImg.style.width = '100px';
        cautionImg.style.height = '100px';
        document.body.appendChild(cautionImg);
    }
})();
