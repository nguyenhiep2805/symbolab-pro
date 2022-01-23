// ==UserScript==
// @name         Symbolab Pro
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Symbolab Pro for free - Unlocked step by step
// @author       Hiep Code
// @match        https://www.symbolab.com/
// @include      *://*symbolab.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    "use strict";
    const VERSION = "1.1.0";

    window.addEventListener("load", function () {
        if (typeof SYMBOLAB !== "undefined" && SYMBOLAB?.params?.query) {

            const url = location.href;
            const langMatch = url.match("//([a-z]{2}).symbolab");
            const lang = langMatch ? langMatch[1] : "en";
            const query = htmlDecode(SYMBOLAB.params.query);

            window.SYSTEPS = new SymbolabSteps(lang, "true", null, url);

            window.SOLUTIONS = new Solutions("", "step-by-step", query, "", 0, "", lang, "true");
            SOLUTIONS.init();

        }

        document.getElementById("hide_solution").remove();
        var oldLightsOut = lightsOut;
        window.lightsOut = function () {
            oldLightsOut();
        };
    });
})();
