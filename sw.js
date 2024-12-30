function h(e){return e.pathname.startsWith("/scope:")}function y(e){return h(e)?e.pathname.split("/")[1].split(":")[1]:null}function F(e,t){let r=new URL(e);if(h(r))if(t){const s=r.pathname.split("/");s[1]=`scope:${t}`,r.pathname=s.join("/")}else r=b(r);else if(t){const s=r.pathname==="/"?"":r.pathname;r.pathname=`/scope:${t}${s}`}return r}function b(e){if(!h(e))return e;const t=new URL(e),r=t.pathname.split("/");return t.pathname="/"+r.slice(2).join("/"),t}const E=function(){return typeof process<"u"&&process.release?.name==="node"?"NODE":typeof window<"u"?"WEB":typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?"WORKER":"NODE"}();if(E==="NODE"){let e=function(r){return new Promise(function(s,n){r.onload=r.onerror=function(o){r.onload=r.onerror=null,o.type==="load"?s(r.result):n(new Error("Failed to read the blob/file"))}})},t=function(){const r=new Uint8Array([1,2,3,4]),n=new File([r],"test").stream();try{return n.getReader({mode:"byob"}),!0}catch{return!1}};if(typeof File>"u"){class r extends Blob{constructor(n,o,i){super(n);let a;i?.lastModified&&(a=new Date),(!a||isNaN(a.getFullYear()))&&(a=new Date),this.lastModifiedDate=a,this.lastModified=a.getMilliseconds(),this.name=o||""}}global.File=r}typeof Blob.prototype.arrayBuffer>"u"&&(Blob.prototype.arrayBuffer=function(){const s=new FileReader;return s.readAsArrayBuffer(this),e(s)}),typeof Blob.prototype.text>"u"&&(Blob.prototype.text=function(){const s=new FileReader;return s.readAsText(this),e(s)}),(typeof Blob.prototype.stream>"u"||!t())&&(Blob.prototype.stream=function(){let r=0;const s=this;return new ReadableStream({type:"bytes",autoAllocateChunkSize:512*1024,async pull(n){const o=n.byobRequest.view,a=await s.slice(r,r+o.byteLength).arrayBuffer(),f=new Uint8Array(a);new Uint8Array(o.buffer).set(f);const p=f.byteLength;n.byobRequest.respond(p),r+=p,r>=s.size&&n.close()}})})}if(E==="NODE"&&typeof CustomEvent>"u"){class e extends Event{constructor(r,s={}){super(r,s),this.detail=s.detail}initCustomEvent(){}}globalThis.CustomEvent=e}E==="NODE"&&typeof URL.canParse!="function"&&(globalThis.URL.canParse=function(e){try{return!!new URL(e)}catch{return!1}});const w={0:"No error occurred. System call completed successfully.",1:"Argument list too long.",2:"Permission denied.",3:"Address in use.",4:"Address not available.",5:"Address family not supported.",6:"Resource unavailable, or operation would block.",7:"Connection already in progress.",8:"Bad file descriptor.",9:"Bad message.",10:"Device or resource busy.",11:"Operation canceled.",12:"No child processes.",13:"Connection aborted.",14:"Connection refused.",15:"Connection reset.",16:"Resource deadlock would occur.",17:"Destination address required.",18:"Mathematics argument out of domain of function.",19:"Reserved.",20:"File exists.",21:"Bad address.",22:"File too large.",23:"Host is unreachable.",24:"Identifier removed.",25:"Illegal byte sequence.",26:"Operation in progress.",27:"Interrupted function.",28:"Invalid argument.",29:"I/O error.",30:"Socket is connected.",31:"There is a directory under that path.",32:"Too many levels of symbolic links.",33:"File descriptor value too large.",34:"Too many links.",35:"Message too large.",36:"Reserved.",37:"Filename too long.",38:"Network is down.",39:"Connection aborted by network.",40:"Network unreachable.",41:"Too many files open in system.",42:"No buffer space available.",43:"No such device.",44:"There is no such file or directory OR the parent directory does not exist.",45:"Executable file format error.",46:"No locks available.",47:"Reserved.",48:"Not enough space.",49:"No message of the desired type.",50:"Protocol not available.",51:"No space left on device.",52:"Function not supported.",53:"The socket is not connected.",54:"Not a directory or a symbolic link to a directory.",55:"Directory not empty.",56:"State not recoverable.",57:"Not a socket.",58:"Not supported, or operation not supported on socket.",59:"Inappropriate I/O control operation.",60:"No such device or address.",61:"Value too large to be stored in data type.",62:"Previous owner died.",63:"Operation not permitted.",64:"Broken pipe.",65:"Protocol error.",66:"Protocol not supported.",67:"Protocol wrong type for socket.",68:"Result too large.",69:"Read-only file system.",70:"Invalid seek.",71:"No such process.",72:"Reserved.",73:"Connection timed out.",74:"Text file busy.",75:"Cross-device link.",76:"Extension: Capabilities insufficient."};function j(e){const t=typeof e=="object"?e?.errno:null;if(t in w)return w[t]}function l(e=""){return function(r,s,n){const o=n.value;n.value=function(...i){try{return o.apply(this,i)}catch(a){const f=typeof a=="object"?a?.errno:null;if(f in w){const p=w[f],m=typeof i[1]=="string"?i[1]:null,q=m!==null?e.replaceAll("{path}",m):e;throw new Error(`${q}: ${p}`,{cause:a})}throw a}}}}const H="playground-log",x=(e,...t)=>{A.dispatchEvent(new CustomEvent(H,{detail:{log:e,args:t}}))},_=(e,...t)=>{switch(typeof e.message=="string"?Reflect.set(e,"message",v(e.message)):e.message.message&&typeof e.message.message=="string"&&Reflect.set(e.message,"message",v(e.message.message)),e.severity){case"Debug":console.debug(e.message,...t);break;case"Info":console.info(e.message,...t);break;case"Warn":console.warn(e.message,...t);break;case"Error":console.error(e.message,...t);break;case"Fatal":console.error(e.message,...t);break;default:console.log(e.message,...t)}},G=e=>e instanceof Error?[e.message,e.stack].join(`
`):JSON.stringify(e,null,2),L=[],T=e=>{L.push(e)},R=e=>{if(e.raw===!0)T(e.message);else{const t=K(typeof e.message=="object"?G(e.message):e.message,e.severity??"Info",e.prefix??"JavaScript");T(t)}};class J extends EventTarget{constructor(t=[]){super(),this.handlers=t,this.fatalErrorEvent="playground-fatal-error"}getLogs(){return this.handlers.includes(R)?[...L]:(this.error(`Logs aren't stored because the logToMemory handler isn't registered.
				If you're using a custom logger instance, make sure to register logToMemory handler.
			`),[])}logMessage(t,...r){for(const s of this.handlers)s(t,...r)}log(t,...r){this.logMessage({message:t,severity:void 0,prefix:"JavaScript",raw:!1},...r)}debug(t,...r){this.logMessage({message:t,severity:"Debug",prefix:"JavaScript",raw:!1},...r)}info(t,...r){this.logMessage({message:t,severity:"Info",prefix:"JavaScript",raw:!1},...r)}warn(t,...r){this.logMessage({message:t,severity:"Warn",prefix:"JavaScript",raw:!1},...r)}error(t,...r){this.logMessage({message:t,severity:"Error",prefix:"JavaScript",raw:!1},...r)}}const z=()=>{try{if(process.env.NODE_ENV==="test")return[R,x]}catch{}return[R,_,x]},A=new J(z()),v=e=>e.replace(/\t/g,""),K=(e,t,r)=>{const s=new Date,n=new Intl.DateTimeFormat("en-GB",{year:"numeric",month:"short",day:"2-digit",timeZone:"UTC"}).format(s).replace(/ /g,"-"),o=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1,timeZone:"UTC",timeZoneName:"short"}).format(s),i=n+" "+o;return e=v(e),`[${i}] ${r} ${t}: ${e}`},V=e=>{e.addEventListener("activate",()=>{e.clients.matchAll().then(t=>{const r={numberOfOpenPlaygroundTabs:t.filter(s=>s.frameType==="top-level").length};for(const s of t)s.postMessage(r)})})};function C(...e){function t(o){return o.substring(o.length-1)==="/"}let r=e.join("/");const s=r[0]==="/",n=t(r);return r=D(r),!r&&!s&&(r="."),r&&n&&!t(r)&&(r+="/"),r}function Z(e){if(e==="/")return"/";e=D(e);const t=e.lastIndexOf("/");return t===-1?"":t===0?"/":e.substr(0,t)}function D(e){const t=e[0]==="/";return e=X(e.split("/").filter(r=>!!r),!t).join("/"),(t?"/":"")+e.replace(/\/$/,"")}function X(e,t){let r=0;for(let s=e.length-1;s>=0;s--){const n=e[s];n==="."?e.splice(s,1):n===".."?(e.splice(s,1),r++):r&&(e.splice(s,1),r--)}if(t)for(;r;r--)e.unshift("..");return e}var Y=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,u=(e,t,r,s)=>{for(var n=s>1?void 0:s?Q(t,r):t,o=e.length-1,i;o>=0;o--)(i=e[o])&&(n=(s?i(t,r,n):i(n))||n);return s&&n&&Y(t,r,n),n};const d=class c{static readFileAsText(t,r){return new TextDecoder().decode(c.readFileAsBuffer(t,r))}static readFileAsBuffer(t,r){return t.readFile(r)}static writeFile(t,r,s){t.writeFile(r,s)}static unlink(t,r){t.unlink(r)}static mv(t,r,s){try{const n=t.lookupPath(r).node.mount,o=c.fileExists(t,s)?t.lookupPath(s).node.mount:t.lookupPath(Z(s)).node.mount;n.mountpoint!==o.mountpoint?(c.copyRecursive(t,r,s),c.isDir(t,r)?c.rmdir(t,r,{recursive:!0}):t.unlink(r)):t.rename(r,s)}catch(n){const o=j(n);throw o?new Error(`Could not move ${r} to ${s}: ${o}`,{cause:n}):n}}static rmdir(t,r,s={recursive:!0}){s?.recursive&&c.listFiles(t,r).forEach(n=>{const o=`${r}/${n}`;c.isDir(t,o)?c.rmdir(t,o,s):c.unlink(t,o)}),t.rmdir(r)}static listFiles(t,r,s={prependPath:!1}){if(!c.fileExists(t,r))return[];try{const n=t.readdir(r).filter(o=>o!=="."&&o!=="..");if(s.prependPath){const o=r.replace(/\/$/,"");return n.map(i=>`${o}/${i}`)}return n}catch(n){return A.error(n,{path:r}),[]}}static isDir(t,r){return c.fileExists(t,r)?t.isDir(t.lookupPath(r,{follow:!0}).node.mode):!1}static isFile(t,r){return c.fileExists(t,r)?t.isFile(t.lookupPath(r,{follow:!0}).node.mode):!1}static symlink(t,r,s){return t.symlink(r,s)}static isSymlink(t,r){return c.fileExists(t,r)?t.isLink(t.lookupPath(r).node.mode):!1}static readlink(t,r){return t.readlink(r)}static realpath(t,r){return t.lookupPath(r,{follow:!0}).path}static fileExists(t,r){try{return t.lookupPath(r),!0}catch{return!1}}static mkdir(t,r){t.mkdirTree(r)}static copyRecursive(t,r,s){const n=t.lookupPath(r).node;if(t.isDir(n.mode)){t.mkdirTree(s);const o=t.readdir(r).filter(i=>i!=="."&&i!=="..");for(const i of o)c.copyRecursive(t,C(r,i),C(s,i))}else t.writeFile(s,t.readFile(r))}};u([l('Could not read "{path}"')],d,"readFileAsText",1);u([l('Could not read "{path}"')],d,"readFileAsBuffer",1);u([l('Could not write to "{path}"')],d,"writeFile",1);u([l('Could not unlink "{path}"')],d,"unlink",1);u([l('Could not remove directory "{path}"')],d,"rmdir",1);u([l('Could not list files in "{path}"')],d,"listFiles",1);u([l('Could not stat "{path}"')],d,"isDir",1);u([l('Could not stat "{path}"')],d,"isFile",1);u([l('Could not stat "{path}"')],d,"realpath",1);u([l('Could not stat "{path}"')],d,"fileExists",1);u([l('Could not create directory "{path}"')],d,"mkdir",1);u([l('Could not copy files from "{path}"')],d,"copyRecursive",1);(function(){return typeof process<"u"&&process.release?.name==="node"?"NODE":typeof window<"u"?"WEB":typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?"WORKER":"NODE"})();ReadableStream.prototype[Symbol.asyncIterator]||(ReadableStream.prototype[Symbol.asyncIterator]=async function*(){const e=this.getReader();try{for(;;){const{done:t,value:r}=await e.read();if(t)return;yield r}}finally{e.releaseLock()}},ReadableStream.prototype.iterate=ReadableStream.prototype[Symbol.asyncIterator]);function ee(e,t){for(const r of t)if(new RegExp(r.match).test(e))return e.replace(r.match,r.replacement);return e}const te=25e3;let re=0;function se(){return++re}function M(e,t,r=te){return new Promise((s,n)=>{const o=a=>{a.data.type==="response"&&a.data.requestId===t&&(e.removeEventListener("message",o),clearTimeout(i),s(a.data.response))},i=setTimeout(()=>{n(new Error("Request timed out")),e.removeEventListener("message",o)},r);e.addEventListener("message",o)})}async function ne(e){let t=new URL(e.request.url);if(!h(t))try{const i=new URL(e.request.referrer);t=F(t,y(i))}catch{}const r=e.request.headers.get("content-type"),s=e.request.method==="POST"?new Uint8Array(await e.request.clone().arrayBuffer()):void 0,n={};for(const i of e.request.headers.entries())n[i[0]]=i[1];let o;try{const i={method:"request",args:[{body:s,url:t.toString(),method:e.request.method,headers:{...n,Host:t.host,"User-agent":self.navigator.userAgent,"Content-type":r}}]},a=y(t);if(a===null)throw new Error(`The URL ${t.toString()} is not scoped. This should not happen.`);const f=await N(i,a);o=await M(self,f),delete o.headers["x-frame-options"]}catch(i){throw console.error(i,{url:t.toString()}),i}return o.httpStatusCode>=300&&o.httpStatusCode<=399&&o.headers.location?Response.redirect(o.headers.location[0],o.httpStatusCode):new Response(o.bytes,{headers:o.headers,status:o.httpStatusCode})}async function N(e,t){const r=se();for(const s of await self.clients.matchAll({includeUncontrolled:!0}))s.postMessage({...e,scope:t,requestId:r});return r}async function O(e,t){const r=["GET","HEAD"].includes(e.method)||"body"in t?void 0:await e.blob();return new Request(t.url||e.url,{body:r,method:e.method,headers:e.headers,referrer:e.referrer,referrerPolicy:e.referrerPolicy,mode:e.mode==="navigate"?"same-origin":e.mode,credentials:e.credentials,cache:e.cache,redirect:e.redirect,integrity:e.integrity,...t})}const oe=[{match:/^\/(.*?)(\/wp-(content|admin|includes)\/.*)/g,replacement:"$2"}],ie="aeaeb11c41095cbabbd09e333ec001b9f0acf85e",I="playground-cache",P=`${I}-${ie}`,k=caches.open(P);async function ae(e){const t=await k,r=await t.match(e,{ignoreSearch:!0});if(r)return r;const s=await S(e);return s.ok&&$()&&t.put(e,s.clone()),s}async function U(e){const t=await k,r=await t.match(e,{ignoreSearch:!0});let s;try{s=await fetch(e,{cache:"no-cache"})}catch(n){if(r)return r;throw n}return s.ok?(t.put(e,s.clone()),s):r||s}async function ce(){const s=["/",...await(await S("/assets-required-for-offline-mode.json")).json()].map(o=>new Request(o,{cache:"no-cache"}));await(await k).addAll(s)}async function le(){const t=(await caches.keys()).filter(r=>r.startsWith(I)&&r!==P);return Promise.all(t.map(r=>caches.delete(r)))}function B(e){return e.href.includes("wordpress-static.zip")?!0:e.href.startsWith("http://127.0.0.1:5400/")||e.href.startsWith("http://localhost:5400/")||e.href.startsWith("https://playground.test/")||e.pathname.startsWith("/website-server/")||h(e)||e.pathname.endsWith(".php")?!1:self.location.hostname===e.hostname}function S(e,t){return fetch(e,{...t,cache:"no-cache"})}function $(){return!("serviceWorker"in self)||!("state"in self.serviceWorker)?!0:self.serviceWorker.state==="activated"}self.document||(self.document={});self.addEventListener("install",e=>{e.waitUntil(self.skipWaiting())});self.addEventListener("activate",function(e){async function t(){await self.clients.claim(),B(new URL(location.href))&&(await le(),ce())}e.waitUntil(t())});self.addEventListener("fetch",e=>{if(!$())return;const t=new URL(e.request.url);if(t.pathname.startsWith(self.location.pathname)||t.pathname.startsWith("/plugin-proxy")||t.pathname.startsWith("/client/index.js"))return;if(h(t))return e.respondWith(W(e,y(t)));let s;try{s=new URL(e.request.referrer)}catch{}if(s&&h(s))return e.respondWith(W(e,y(s)));if(t.pathname.startsWith("/proxy/")){const o=t.pathname.split("/")[2];switch(o){case"network-first-fetch":{const i=t.pathname.substring(7+o.length+1)+(t?.search?"?"+t.search:"")+(t?.hash?"#"+t.hash:""),a=O(e.request,{url:i});return e.respondWith(a.then(U))}}}if(B(new URL(e.request.url))){if(t.pathname==="/remote.html"||t.pathname==="/"){e.respondWith(U(e.request));return}return e.respondWith(ae(e.request))}});async function W(e,t){const r=new URL(e.request.url),s=b(r);if(r.pathname.endsWith("/wp-includes/empty.html"))return de();const n=await ne(e);if(n.status===404&&n.headers.get("x-backfill-from")==="remote-host"){const{staticAssetsDirectory:o}=await fe(t);if(!o){const p=n.clone();return p.headers.delete("x-backfill-from"),p}const i=new URL(e.request.url),a=b(i);a.pathname=ee(a.pathname,oe),!a.pathname.startsWith("/@fs")&&!a.pathname.startsWith("/assets")&&(a.pathname=`/${o}${a.pathname}`);const f=await O(e.request,{url:a,credentials:"omit"});return fetch(f).catch(p=>{if(p?.name==="TypeError")return new Promise(m=>{setTimeout(()=>m(fetch(f)),Math.random()*1500)});throw p})}if(s.pathname.endsWith("/wp-includes/js/dist/block-editor.js")||s.pathname.endsWith("/wp-includes/js/dist/block-editor.min.js")||s.pathname.endsWith("/build/block-editor/index.js")||s.pathname.endsWith("/build/block-editor/index.min.js")){const o=await n.text(),i=`${ue} ${o.replace(/\(\s*"iframe",/,"(__playground_ControlledIframe,")}`;return new Response(i,{status:n.status,statusText:n.statusText,headers:n.headers})}return n}V(self);const ue=`
window.__playground_ControlledIframe = window.wp.element.forwardRef(function (props, ref) {
	const source = window.wp.element.useMemo(function () {
		/**
		 * A synchronous function to read a blob URL as text.
		 *
		 * @param {string} url
		 * @returns {string}
		 */
		const __playground_readBlobAsText = function (url) {
			try {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', url, false);
			xhr.overrideMimeType('text/plain;charset=utf-8');
			xhr.send();
			return xhr.responseText;
			} catch(e) {
			return '';
			} finally {
			URL.revokeObjectURL(url);
			}
		};
		if (props.srcDoc) {
			// WordPress <= 6.2 uses a srcDoc that only contains a doctype.
			return '/wp-includes/empty.html';
		} else if (props.src && props.src.startsWith('blob:')) {
			// WordPress 6.3 uses a blob URL with doctype and a list of static assets.
			// Let's pass the document content to empty.html and render it there.
			return '/wp-includes/empty.html#' + encodeURIComponent(__playground_readBlobAsText(props.src));
		} else {
			// WordPress >= 6.4 uses a plain HTTPS URL that needs no correction.
			return props.src;
		}
	}, [props.src]);
	return (
		window.wp.element.createElement('iframe', {
			...props,
			ref: ref,
			src: source,
			// Make sure there's no srcDoc, as it would interfere with the src.
			srcDoc: undefined
		})
	)
});`;function de(){return new Response("<!doctype html><script>const hash = window.location.hash.substring(1); if ( hash ) document.write(decodeURIComponent(hash))<\/script>",{status:200,headers:{"content-type":"text/html"}})}const g={};async function fe(e){if(!g[e]){const t=await N({method:"getWordPressModuleDetails"},e);g[e]=await M(self,t)}return g[e]}
//# sourceMappingURL=sw.js.map
