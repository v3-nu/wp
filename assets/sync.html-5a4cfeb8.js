import"./modulepreload-polyfill-3cfb730f.js";const e=Array.from(document.querySelectorAll("iframe"));window.onmessage=o=>{o.data.type==="playground-change"&&e.forEach(r=>{r.contentWindow!==o.source&&r.contentWindow.postMessage(o.data,"*")})};
//# sourceMappingURL=sync.html-5a4cfeb8.js.map
