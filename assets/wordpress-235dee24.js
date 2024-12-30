(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))a(c);new MutationObserver(c=>{for(const u of c)if(u.type==="childList")for(const p of u.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function i(c){const u={};return c.integrity&&(u.integrity=c.integrity),c.referrerPolicy&&(u.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?u.credentials="include":c.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function a(c){if(c.ep)return;c.ep=!0;const u=i(c);fetch(c.href,u)}})();const ke=function(){return typeof process<"u"&&process.release?.name==="node"?"NODE":typeof window<"u"?"WEB":typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?"WORKER":"NODE"}();if(ke==="NODE"){let n=function(i){return new Promise(function(a,c){i.onload=i.onerror=function(u){i.onload=i.onerror=null,u.type==="load"?a(i.result):c(new Error("Failed to read the blob/file"))}})},r=function(){const i=new Uint8Array([1,2,3,4]),c=new File([i],"test").stream();try{return c.getReader({mode:"byob"}),!0}catch{return!1}};if(typeof File>"u"){class i extends Blob{constructor(c,u,p){super(c);let _;p?.lastModified&&(_=new Date),(!_||isNaN(_.getFullYear()))&&(_=new Date),this.lastModifiedDate=_,this.lastModified=_.getMilliseconds(),this.name=u||""}}global.File=i}typeof Blob.prototype.arrayBuffer>"u"&&(Blob.prototype.arrayBuffer=function(){const a=new FileReader;return a.readAsArrayBuffer(this),n(a)}),typeof Blob.prototype.text>"u"&&(Blob.prototype.text=function(){const a=new FileReader;return a.readAsText(this),n(a)}),(typeof Blob.prototype.stream>"u"||!r())&&(Blob.prototype.stream=function(){let i=0;const a=this;return new ReadableStream({type:"bytes",autoAllocateChunkSize:512*1024,async pull(c){const u=c.byobRequest.view,_=await a.slice(i,i+u.byteLength).arrayBuffer(),h=new Uint8Array(_);new Uint8Array(u.buffer).set(h);const w=h.byteLength;c.byobRequest.respond(w),i+=w,i>=a.size&&c.close()}})})}if(ke==="NODE"&&typeof CustomEvent>"u"){class n extends Event{constructor(i,a={}){super(i,a),this.detail=a.detail}initCustomEvent(){}}globalThis.CustomEvent=n}ke==="NODE"&&typeof URL.canParse!="function"&&(globalThis.URL.canParse=function(n){try{return!!new URL(n)}catch{return!1}});const le={0:"No error occurred. System call completed successfully.",1:"Argument list too long.",2:"Permission denied.",3:"Address in use.",4:"Address not available.",5:"Address family not supported.",6:"Resource unavailable, or operation would block.",7:"Connection already in progress.",8:"Bad file descriptor.",9:"Bad message.",10:"Device or resource busy.",11:"Operation canceled.",12:"No child processes.",13:"Connection aborted.",14:"Connection refused.",15:"Connection reset.",16:"Resource deadlock would occur.",17:"Destination address required.",18:"Mathematics argument out of domain of function.",19:"Reserved.",20:"File exists.",21:"Bad address.",22:"File too large.",23:"Host is unreachable.",24:"Identifier removed.",25:"Illegal byte sequence.",26:"Operation in progress.",27:"Interrupted function.",28:"Invalid argument.",29:"I/O error.",30:"Socket is connected.",31:"There is a directory under that path.",32:"Too many levels of symbolic links.",33:"File descriptor value too large.",34:"Too many links.",35:"Message too large.",36:"Reserved.",37:"Filename too long.",38:"Network is down.",39:"Connection aborted by network.",40:"Network unreachable.",41:"Too many files open in system.",42:"No buffer space available.",43:"No such device.",44:"There is no such file or directory OR the parent directory does not exist.",45:"Executable file format error.",46:"No locks available.",47:"Reserved.",48:"Not enough space.",49:"No message of the desired type.",50:"Protocol not available.",51:"No space left on device.",52:"Function not supported.",53:"The socket is not connected.",54:"Not a directory or a symbolic link to a directory.",55:"Directory not empty.",56:"State not recoverable.",57:"Not a socket.",58:"Not supported, or operation not supported on socket.",59:"Inappropriate I/O control operation.",60:"No such device or address.",61:"Value too large to be stored in data type.",62:"Previous owner died.",63:"Operation not permitted.",64:"Broken pipe.",65:"Protocol error.",66:"Protocol not supported.",67:"Protocol wrong type for socket.",68:"Result too large.",69:"Read-only file system.",70:"Invalid seek.",71:"No such process.",72:"Reserved.",73:"Connection timed out.",74:"Text file busy.",75:"Cross-device link.",76:"Extension: Capabilities insufficient."};function zt(n){const r=typeof n=="object"?n?.errno:null;if(r in le)return le[r]}function N(n=""){return function(i,a,c){const u=c.value;c.value=function(...p){try{return u.apply(this,p)}catch(_){const h=typeof _=="object"?_?.errno:null;if(h in le){const w=le[h],m=typeof p[1]=="string"?p[1]:null,S=m!==null?n.replaceAll("{path}",m):n;throw new Error(`${S}: ${w}`,{cause:_})}throw _}}}}const qt="playground-log",Xe=(n,...r)=>{U.dispatchEvent(new CustomEvent(qt,{detail:{log:n,args:r}}))},jt=(n,...r)=>{switch(typeof n.message=="string"?Reflect.set(n,"message",Pe(n.message)):n.message.message&&typeof n.message.message=="string"&&Reflect.set(n.message,"message",Pe(n.message.message)),n.severity){case"Debug":console.debug(n.message,...r);break;case"Info":console.info(n.message,...r);break;case"Warn":console.warn(n.message,...r);break;case"Error":console.error(n.message,...r);break;case"Fatal":console.error(n.message,...r);break;default:console.log(n.message,...r)}},Vt=n=>n instanceof Error?[n.message,n.stack].join(`
`):JSON.stringify(n,null,2),ot=[],Ze=n=>{ot.push(n)},Re=n=>{if(n.raw===!0)Ze(n.message);else{const r=Qt(typeof n.message=="object"?Vt(n.message):n.message,n.severity??"Info",n.prefix??"JavaScript");Ze(r)}};class Yt extends EventTarget{constructor(r=[]){super(),this.handlers=r,this.fatalErrorEvent="playground-fatal-error"}getLogs(){return this.handlers.includes(Re)?[...ot]:(this.error(`Logs aren't stored because the logToMemory handler isn't registered.
				If you're using a custom logger instance, make sure to register logToMemory handler.
			`),[])}logMessage(r,...i){for(const a of this.handlers)a(r,...i)}log(r,...i){this.logMessage({message:r,severity:void 0,prefix:"JavaScript",raw:!1},...i)}debug(r,...i){this.logMessage({message:r,severity:"Debug",prefix:"JavaScript",raw:!1},...i)}info(r,...i){this.logMessage({message:r,severity:"Info",prefix:"JavaScript",raw:!1},...i)}warn(r,...i){this.logMessage({message:r,severity:"Warn",prefix:"JavaScript",raw:!1},...i)}error(r,...i){this.logMessage({message:r,severity:"Error",prefix:"JavaScript",raw:!1},...i)}}const Jt=()=>{try{if(process.env.NODE_ENV==="test")return[Re,Xe]}catch{}return[Re,jt,Xe]},U=new Yt(Jt()),Pe=n=>n.replace(/\t/g,""),Qt=(n,r,i)=>{const a=new Date,c=new Intl.DateTimeFormat("en-GB",{year:"numeric",month:"short",day:"2-digit",timeZone:"UTC"}).format(a).replace(/ /g,"-"),u=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1,timeZone:"UTC",timeZoneName:"short"}).format(a),p=c+" "+u;return n=Pe(n),`[${p}] ${i} ${r}: ${n}`},st=Symbol("SleepFinished");function Xt(n){return new Promise(r=>{setTimeout(()=>r(st),n)})}class Zt extends Error{constructor(){super("Acquiring lock timed out")}}class en{constructor({concurrency:r,timeout:i}){this._running=0,this.concurrency=r,this.timeout=i,this.queue=[]}get remaining(){return this.concurrency-this.running}get running(){return this._running}async acquire(){for(;;)if(this._running>=this.concurrency){const r=new Promise(i=>{this.queue.push(i)});this.timeout!==void 0?await Promise.race([r,Xt(this.timeout)]).then(i=>{if(i===st)throw new Zt}):await r}else{this._running++;let r=!1;return()=>{r||(r=!0,this._running--,this.queue.length>0&&this.queue.shift()())}}}async run(r){const i=await this.acquire();try{return await r()}finally{i()}}}class et extends Error{constructor(r,i){super(r),this.userFriendlyMessage=i,this.userFriendlyMessage||(this.userFriendlyMessage=r)}}function $(...n){function r(u){return u.substring(u.length-1)==="/"}let i=n.join("/");const a=i[0]==="/",c=r(i);return i=at(i),!i&&!a&&(i="."),i&&c&&!r(i)&&(i+="/"),i}function pe(n){if(n==="/")return"/";n=at(n);const r=n.lastIndexOf("/");return r===-1?"":r===0?"/":n.substr(0,r)}function at(n){const r=n[0]==="/";return n=tn(n.split("/").filter(i=>!!i),!r).join("/"),(r?"/":"")+n.replace(/\/$/,"")}function tn(n,r){let i=0;for(let a=n.length-1;a>=0;a--){const c=n[a];c==="."?n.splice(a,1):c===".."?(n.splice(a,1),i++):i&&(n.splice(a,1),i--)}if(r)for(;i;i--)n.unshift("..");return n}function ct(n=36,r="!@#$%^&*()_+=-[]/.,<>?"){const i="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"+r;let a="";for(let c=n;c>0;--c)a+=i[Math.floor(Math.random()*i.length)];return a}function nn(){return ct(36,"-_")}function F(n){return`json_decode(base64_decode('${rn(JSON.stringify(n))}'), true)`}function we(n){const r={};for(const i in n)r[i]=F(n[i]);return r}function rn(n){return on(new TextEncoder().encode(n))}function on(n){const r=String.fromCodePoint(...n);return btoa(r)}var sn=Object.defineProperty,an=Object.getOwnPropertyDescriptor,O=(n,r,i,a)=>{for(var c=a>1?void 0:a?an(r,i):r,u=n.length-1,p;u>=0;u--)(p=n[u])&&(c=(a?p(r,i,c):p(c))||c);return a&&c&&sn(r,i,c),c};const G=class k{static readFileAsText(r,i){return new TextDecoder().decode(k.readFileAsBuffer(r,i))}static readFileAsBuffer(r,i){return r.readFile(i)}static writeFile(r,i,a){r.writeFile(i,a)}static unlink(r,i){r.unlink(i)}static mv(r,i,a){try{const c=r.lookupPath(i).node.mount,u=k.fileExists(r,a)?r.lookupPath(a).node.mount:r.lookupPath(pe(a)).node.mount;c.mountpoint!==u.mountpoint?(k.copyRecursive(r,i,a),k.isDir(r,i)?k.rmdir(r,i,{recursive:!0}):r.unlink(i)):r.rename(i,a)}catch(c){const u=zt(c);throw u?new Error(`Could not move ${i} to ${a}: ${u}`,{cause:c}):c}}static rmdir(r,i,a={recursive:!0}){a?.recursive&&k.listFiles(r,i).forEach(c=>{const u=`${i}/${c}`;k.isDir(r,u)?k.rmdir(r,u,a):k.unlink(r,u)}),r.rmdir(i)}static listFiles(r,i,a={prependPath:!1}){if(!k.fileExists(r,i))return[];try{const c=r.readdir(i).filter(u=>u!=="."&&u!=="..");if(a.prependPath){const u=i.replace(/\/$/,"");return c.map(p=>`${u}/${p}`)}return c}catch(c){return U.error(c,{path:i}),[]}}static isDir(r,i){return k.fileExists(r,i)?r.isDir(r.lookupPath(i,{follow:!0}).node.mode):!1}static isFile(r,i){return k.fileExists(r,i)?r.isFile(r.lookupPath(i,{follow:!0}).node.mode):!1}static symlink(r,i,a){return r.symlink(i,a)}static isSymlink(r,i){return k.fileExists(r,i)?r.isLink(r.lookupPath(i).node.mode):!1}static readlink(r,i){return r.readlink(i)}static realpath(r,i){return r.lookupPath(i,{follow:!0}).path}static fileExists(r,i){try{return r.lookupPath(i),!0}catch{return!1}}static mkdir(r,i){r.mkdirTree(i)}static copyRecursive(r,i,a){const c=r.lookupPath(i).node;if(r.isDir(c.mode)){r.mkdirTree(a);const u=r.readdir(i).filter(p=>p!=="."&&p!=="..");for(const p of u)k.copyRecursive(r,$(i,p),$(a,p))}else r.writeFile(a,r.readFile(i))}};O([N('Could not read "{path}"')],G,"readFileAsText",1);O([N('Could not read "{path}"')],G,"readFileAsBuffer",1);O([N('Could not write to "{path}"')],G,"writeFile",1);O([N('Could not unlink "{path}"')],G,"unlink",1);O([N('Could not remove directory "{path}"')],G,"rmdir",1);O([N('Could not list files in "{path}"')],G,"listFiles",1);O([N('Could not stat "{path}"')],G,"isDir",1);O([N('Could not stat "{path}"')],G,"isFile",1);O([N('Could not stat "{path}"')],G,"realpath",1);O([N('Could not stat "{path}"')],G,"fileExists",1);O([N('Could not create directory "{path}"')],G,"mkdir",1);O([N('Could not copy files from "{path}"')],G,"copyRecursive",1);const cn={500:"Internal Server Error",502:"Bad Gateway",404:"Not Found",403:"Forbidden",401:"Unauthorized",400:"Bad Request",301:"Moved Permanently",302:"Found",307:"Temporary Redirect",308:"Permanent Redirect",204:"No Content",201:"Created",200:"OK"};class de{constructor(r,i,a,c="",u=0){this.httpStatusCode=r,this.headers=i,this.bytes=a,this.exitCode=u,this.errors=c}static forHttpCode(r,i=""){return new de(r,{},new TextEncoder().encode(i||cn[r]||""))}static fromRawData(r){return new de(r.httpStatusCode,r.headers,r.bytes,r.errors,r.exitCode)}toRawData(){return{headers:this.headers,bytes:this.bytes,errors:this.errors,exitCode:this.exitCode,httpStatusCode:this.httpStatusCode}}get json(){return JSON.parse(this.text)}get text(){return new TextDecoder().decode(this.bytes)}}(function(){return typeof process<"u"&&process.release?.name==="node"?"NODE":typeof window<"u"?"WEB":typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?"WORKER":"NODE"})();ReadableStream.prototype[Symbol.asyncIterator]||(ReadableStream.prototype[Symbol.asyncIterator]=async function*(){const n=this.getReader();try{for(;;){const{done:r,value:i}=await n.read();if(r)return;yield i}}finally{n.releaseLock()}},ReadableStream.prototype.iterate=ReadableStream.prototype[Symbol.asyncIterator]);async function Se(n,r,i,{rmRoot:a=!1}={}){a&&await n.isDir(r)&&await n.rmdir(r,{recursive:!0});for(const[c,u]of Object.entries(i)){const p=$(r,c);await n.fileExists(pe(p))||await n.mkdir(pe(p)),u instanceof Uint8Array||typeof u=="string"?await n.writeFile(p,u):await Se(n,p,u)}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const _t=Symbol("Comlink.proxy"),_n=Symbol("Comlink.endpoint"),un=Symbol("Comlink.releaseProxy"),xe=Symbol("Comlink.finalizer"),ue=Symbol("Comlink.thrown"),ut=n=>typeof n=="object"&&n!==null||typeof n=="function",ln={canHandle:n=>ut(n)&&n[_t],serialize(n){const{port1:r,port2:i}=new MessageChannel;return Ee(n,r),[i,[i]]},deserialize(n){return n.start(),Fe(n)}},pn={canHandle:n=>ut(n)&&ue in n,serialize({value:n}){let r;return n instanceof Error?r={isError:!0,value:{message:n.message,name:n.name,stack:n.stack}}:r={isError:!1,value:n},[r,[]]},deserialize(n){throw n.isError?Object.assign(new Error(n.value.message),n.value):n.value}},ne=new Map([["proxy",ln],["throw",pn]]);function dn(n,r){for(const i of n)if(r===i||i==="*"||i instanceof RegExp&&i.test(r))return!0;return!1}function Ee(n,r=globalThis,i=["*"]){r.addEventListener("message",function a(c){if(!c||!c.data)return;if(!dn(i,c.origin)){console.warn(`Invalid origin '${c.origin}' for comlink proxy`);return}const{id:u,type:p,path:_}=Object.assign({path:[]},c.data),h=(c.data.argumentList||[]).map(J);let w;try{const m=_.slice(0,-1).reduce((y,A)=>y[A],n),S=_.reduce((y,A)=>y[A],n);switch(p){case"GET":w=S;break;case"SET":m[_.slice(-1)[0]]=J(c.data.value),w=!0;break;case"APPLY":w=S.apply(m,h);break;case"CONSTRUCT":{const y=new S(...h);w=ft(y)}break;case"ENDPOINT":{const{port1:y,port2:A}=new MessageChannel;Ee(n,A),w=Sn(y,[y])}break;case"RELEASE":w=void 0;break;default:return}}catch(m){w={value:m,[ue]:0}}Promise.resolve(w).catch(m=>({value:m,[ue]:0})).then(m=>{const[S,y]=me(m);r.postMessage(Object.assign(Object.assign({},S),{id:u}),y),p==="RELEASE"&&(r.removeEventListener("message",a),lt(r),xe in n&&typeof n[xe]=="function"&&n[xe]())}).catch(m=>{const[S,y]=me({value:new TypeError("Unserializable return value"),[ue]:0});r.postMessage(Object.assign(Object.assign({},S),{id:u}),y)})}),r.start&&r.start()}function fn(n){return n.constructor.name==="MessagePort"}function lt(n){fn(n)&&n.close()}function Fe(n,r){return We(n,[],r)}function _e(n){if(n)throw new Error("Proxy has been released and is not useable")}function pt(n){return te(n,{type:"RELEASE"}).then(()=>{lt(n)})}const fe=new WeakMap,he="FinalizationRegistry"in globalThis&&new FinalizationRegistry(n=>{const r=(fe.get(n)||0)-1;fe.set(n,r),r===0&&pt(n)});function hn(n,r){const i=(fe.get(r)||0)+1;fe.set(r,i),he&&he.register(n,r,n)}function mn(n){he&&he.unregister(n)}function We(n,r=[],i=function(){}){let a=!1;const c=new Proxy(i,{get(u,p){if(_e(a),p===un)return()=>{mn(c),pt(n),a=!0};if(p==="then"){if(r.length===0)return{then:()=>c};const _=te(n,{type:"GET",path:r.map(h=>h.toString())}).then(J);return _.then.bind(_)}return We(n,[...r,p])},set(u,p,_){_e(a);const[h,w]=me(_);return te(n,{type:"SET",path:[...r,p].map(m=>m.toString()),value:h},w).then(J)},apply(u,p,_){_e(a);const h=r[r.length-1];if(h===_n)return te(n,{type:"ENDPOINT"}).then(J);if(h==="bind")return We(n,r.slice(0,-1));const[w,m]=tt(_);return te(n,{type:"APPLY",path:r.map(S=>S.toString()),argumentList:w},m).then(J)},construct(u,p){_e(a);const[_,h]=tt(p);return te(n,{type:"CONSTRUCT",path:r.map(w=>w.toString()),argumentList:_},h).then(J)}});return hn(c,n),c}function wn(n){return Array.prototype.concat.apply([],n)}function tt(n){const r=n.map(me);return[r.map(i=>i[0]),wn(r.map(i=>i[1]))]}const dt=new WeakMap;function Sn(n,r){return dt.set(n,r),n}function ft(n){return Object.assign(n,{[_t]:!0})}function ht(n,r=globalThis,i="*"){return{postMessage:(a,c)=>n.postMessage(a,i,c),addEventListener:r.addEventListener.bind(r),removeEventListener:r.removeEventListener.bind(r)}}function me(n){for(const[r,i]of ne)if(i.canHandle(n)){const[a,c]=i.serialize(n);return[{type:"HANDLER",name:r,value:a},c]}return[{type:"RAW",value:n},dt.get(n)||[]]}function J(n){switch(n.type){case"HANDLER":return ne.get(n.name).deserialize(n.value);case"RAW":return n.value}}function te(n,r,i){return new Promise(a=>{const c=En();n.addEventListener("message",function u(p){!p.data||!p.data.id||p.data.id!==c||(n.removeEventListener("message",u),a(p.data))}),n.start&&n.start(),n.postMessage(Object.assign({id:c},r),i)})}function En(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}function Cn(n,r=void 0){mt();const i=n instanceof Worker?n:ht(n,r),a=Fe(i),c=Ke(a);return new Proxy(c,{get:(u,p)=>p==="isConnected"?async()=>{for(;;)try{await yn(a.isConnected(),200);break}catch{}}:a[p]})}async function yn(n,r){return new Promise((i,a)=>{setTimeout(a,r),n.then(i)})}function An(n,r){mt();const i=Promise.resolve();let a,c;const u=new Promise((h,w)=>{a=h,c=w}),p=Ke(n),_=new Proxy(p,{get:(h,w)=>w==="isConnected"?()=>i:w==="isReady"?()=>u:w in h?h[w]:r?.[w]});return Ee(_,typeof window<"u"?ht(self.parent):void 0),[a,c,_]}let nt=!1;function mt(){if(nt)return;nt=!0,ne.set("EVENT",{canHandle:i=>i instanceof CustomEvent,serialize:i=>[{detail:i.detail},[]],deserialize:i=>i}),ne.set("FUNCTION",{canHandle:i=>typeof i=="function",serialize(i){const{port1:a,port2:c}=new MessageChannel;return Ee(i,a),[c,[c]]},deserialize(i){return i.start(),Fe(i)}}),ne.set("PHPResponse",{canHandle:i=>typeof i=="object"&&i!==null&&"headers"in i&&"bytes"in i&&"errors"in i&&"exitCode"in i&&"httpStatusCode"in i,serialize(i){return[i.toRawData(),[]]},deserialize(i){return de.fromRawData(i)}});const n=ne.get("throw"),r=n?.serialize;n.serialize=({value:i})=>{const a=r({value:i});return i.response&&(a[0].value.response=i.response),i.source&&(a[0].value.source=i.source),a}}function Ke(n){return new Proxy(n,{get(r,i){switch(typeof r[i]){case"function":return(...a)=>r[i](...a);case"object":return r[i]===null?r[i]:Ke(r[i]);case"undefined":case"number":case"string":return r[i];default:return ft(r[i])}}})}function V(n){return Object.fromEntries(Object.entries(n).map(([r,i])=>[i,r]))}const gn={server_name:0,max_fragment_length:1,client_certificate_url:2,trusted_ca_keys:3,truncated_hmac:4,status_request:5,user_mapping:6,client_authz:7,server_authz:8,cert_type:9,supported_groups:10,ec_point_formats:11,srp:12,signature_algorithms:13,use_srtp:14,heartbeat:15,application_layer_protocol_negotiation:16,status_request_v2:17,signed_certificate_timestamp:18,client_certificate_type:19,server_certificate_type:20,padding:21,encrypt_then_mac:22,extended_master_secret:23,token_binding:24,cached_info:25,tls_its:26,compress_certificate:27,record_size_limit:28,pwd_protect:29,pwo_clear:30,password_salt:31,ticket_pinning:32,tls_cert_with_extern_psk:33,delegated_credential:34,session_ticket:35,TLMSP:36,TLMSP_proxying:37,TLMSP_delegate:38,supported_ekt_ciphers:39,pre_shared_key:41,early_data:42,supported_versions:43,cookie:44,psk_key_exchange_modes:45,reserved:46,certificate_authorities:47,oid_filters:48,post_handshake_auth:49,signature_algorithms_cert:50,key_share:51,transparency_info:52,connection_id:54};V(gn);const Tn={host_name:0};V(Tn);const Hn={TLS1_CK_PSK_WITH_RC4_128_SHA:138,TLS1_CK_PSK_WITH_3DES_EDE_CBC_SHA:139,TLS1_CK_PSK_WITH_AES_128_CBC_SHA:140,TLS1_CK_PSK_WITH_AES_256_CBC_SHA:141,TLS1_CK_DHE_PSK_WITH_RC4_128_SHA:142,TLS1_CK_DHE_PSK_WITH_3DES_EDE_CBC_SHA:143,TLS1_CK_DHE_PSK_WITH_AES_128_CBC_SHA:144,TLS1_CK_DHE_PSK_WITH_AES_256_CBC_SHA:145,TLS1_CK_RSA_PSK_WITH_RC4_128_SHA:146,TLS1_CK_RSA_PSK_WITH_3DES_EDE_CBC_SHA:147,TLS1_CK_RSA_PSK_WITH_AES_128_CBC_SHA:148,TLS1_CK_RSA_PSK_WITH_AES_256_CBC_SHA:149,TLS1_CK_PSK_WITH_AES_128_GCM_SHA256:168,TLS1_CK_PSK_WITH_AES_256_GCM_SHA384:169,TLS1_CK_DHE_PSK_WITH_AES_128_GCM_SHA256:170,TLS1_CK_DHE_PSK_WITH_AES_256_GCM_SHA384:171,TLS1_CK_RSA_PSK_WITH_AES_128_GCM_SHA256:172,TLS1_CK_RSA_PSK_WITH_AES_256_GCM_SHA384:173,TLS1_CK_PSK_WITH_AES_128_CBC_SHA256:174,TLS1_CK_PSK_WITH_AES_256_CBC_SHA384:175,TLS1_CK_PSK_WITH_NULL_SHA256:176,TLS1_CK_PSK_WITH_NULL_SHA384:177,TLS1_CK_DHE_PSK_WITH_AES_128_CBC_SHA256:178,TLS1_CK_DHE_PSK_WITH_AES_256_CBC_SHA384:179,TLS1_CK_DHE_PSK_WITH_NULL_SHA256:180,TLS1_CK_DHE_PSK_WITH_NULL_SHA384:181,TLS1_CK_RSA_PSK_WITH_AES_128_CBC_SHA256:182,TLS1_CK_RSA_PSK_WITH_AES_256_CBC_SHA384:183,TLS1_CK_RSA_PSK_WITH_NULL_SHA256:184,TLS1_CK_RSA_PSK_WITH_NULL_SHA384:185,TLS1_CK_PSK_WITH_NULL_SHA:44,TLS1_CK_DHE_PSK_WITH_NULL_SHA:45,TLS1_CK_RSA_PSK_WITH_NULL_SHA:46,TLS1_CK_RSA_WITH_AES_128_SHA:47,TLS1_CK_DH_DSS_WITH_AES_128_SHA:48,TLS1_CK_DH_RSA_WITH_AES_128_SHA:49,TLS1_CK_DHE_DSS_WITH_AES_128_SHA:50,TLS1_CK_DHE_RSA_WITH_AES_128_SHA:51,TLS1_CK_ADH_WITH_AES_128_SHA:52,TLS1_CK_RSA_WITH_AES_256_SHA:53,TLS1_CK_DH_DSS_WITH_AES_256_SHA:54,TLS1_CK_DH_RSA_WITH_AES_256_SHA:55,TLS1_CK_DHE_DSS_WITH_AES_256_SHA:56,TLS1_CK_DHE_RSA_WITH_AES_256_SHA:57,TLS1_CK_ADH_WITH_AES_256_SHA:58,TLS1_CK_RSA_WITH_NULL_SHA256:59,TLS1_CK_RSA_WITH_AES_128_SHA256:60,TLS1_CK_RSA_WITH_AES_256_SHA256:61,TLS1_CK_DH_DSS_WITH_AES_128_SHA256:62,TLS1_CK_DH_RSA_WITH_AES_128_SHA256:63,TLS1_CK_DHE_DSS_WITH_AES_128_SHA256:64,TLS1_CK_RSA_WITH_CAMELLIA_128_CBC_SHA:65,TLS1_CK_DH_DSS_WITH_CAMELLIA_128_CBC_SHA:66,TLS1_CK_DH_RSA_WITH_CAMELLIA_128_CBC_SHA:67,TLS1_CK_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA:68,TLS1_CK_DHE_RSA_WITH_CAMELLIA_128_CBC_SHA:69,TLS1_CK_ADH_WITH_CAMELLIA_128_CBC_SHA:70,TLS1_CK_DHE_RSA_WITH_AES_128_SHA256:103,TLS1_CK_DH_DSS_WITH_AES_256_SHA256:104,TLS1_CK_DH_RSA_WITH_AES_256_SHA256:105,TLS1_CK_DHE_DSS_WITH_AES_256_SHA256:106,TLS1_CK_DHE_RSA_WITH_AES_256_SHA256:107,TLS1_CK_ADH_WITH_AES_128_SHA256:108,TLS1_CK_ADH_WITH_AES_256_SHA256:109,TLS1_CK_RSA_WITH_CAMELLIA_256_CBC_SHA:132,TLS1_CK_DH_DSS_WITH_CAMELLIA_256_CBC_SHA:133,TLS1_CK_DH_RSA_WITH_CAMELLIA_256_CBC_SHA:134,TLS1_CK_DHE_DSS_WITH_CAMELLIA_256_CBC_SHA:135,TLS1_CK_DHE_RSA_WITH_CAMELLIA_256_CBC_SHA:136,TLS1_CK_ADH_WITH_CAMELLIA_256_CBC_SHA:137,TLS1_CK_RSA_WITH_SEED_SHA:150,TLS1_CK_DH_DSS_WITH_SEED_SHA:151,TLS1_CK_DH_RSA_WITH_SEED_SHA:152,TLS1_CK_DHE_DSS_WITH_SEED_SHA:153,TLS1_CK_DHE_RSA_WITH_SEED_SHA:154,TLS1_CK_ADH_WITH_SEED_SHA:155,TLS1_CK_RSA_WITH_AES_128_GCM_SHA256:156,TLS1_CK_RSA_WITH_AES_256_GCM_SHA384:157,TLS1_CK_DHE_RSA_WITH_AES_128_GCM_SHA256:158,TLS1_CK_DHE_RSA_WITH_AES_256_GCM_SHA384:159,TLS1_CK_DH_RSA_WITH_AES_128_GCM_SHA256:160,TLS1_CK_DH_RSA_WITH_AES_256_GCM_SHA384:161,TLS1_CK_DHE_DSS_WITH_AES_128_GCM_SHA256:162,TLS1_CK_DHE_DSS_WITH_AES_256_GCM_SHA384:163,TLS1_CK_DH_DSS_WITH_AES_128_GCM_SHA256:164,TLS1_CK_DH_DSS_WITH_AES_256_GCM_SHA384:165,TLS1_CK_ADH_WITH_AES_128_GCM_SHA256:166,TLS1_CK_ADH_WITH_AES_256_GCM_SHA384:167,TLS1_CK_RSA_WITH_AES_128_CCM:49308,TLS1_CK_RSA_WITH_AES_256_CCM:49309,TLS1_CK_DHE_RSA_WITH_AES_128_CCM:49310,TLS1_CK_DHE_RSA_WITH_AES_256_CCM:49311,TLS1_CK_RSA_WITH_AES_128_CCM_8:49312,TLS1_CK_RSA_WITH_AES_256_CCM_8:49313,TLS1_CK_DHE_RSA_WITH_AES_128_CCM_8:49314,TLS1_CK_DHE_RSA_WITH_AES_256_CCM_8:49315,TLS1_CK_PSK_WITH_AES_128_CCM:49316,TLS1_CK_PSK_WITH_AES_256_CCM:49317,TLS1_CK_DHE_PSK_WITH_AES_128_CCM:49318,TLS1_CK_DHE_PSK_WITH_AES_256_CCM:49319,TLS1_CK_PSK_WITH_AES_128_CCM_8:49320,TLS1_CK_PSK_WITH_AES_256_CCM_8:49321,TLS1_CK_DHE_PSK_WITH_AES_128_CCM_8:49322,TLS1_CK_DHE_PSK_WITH_AES_256_CCM_8:49323,TLS1_CK_ECDHE_ECDSA_WITH_AES_128_CCM:49324,TLS1_CK_ECDHE_ECDSA_WITH_AES_256_CCM:49325,TLS1_CK_ECDHE_ECDSA_WITH_AES_128_CCM_8:49326,TLS1_CK_ECDHE_ECDSA_WITH_AES_256_CCM_8:49327,TLS1_CK_RSA_WITH_CAMELLIA_128_CBC_SHA256:186,TLS1_CK_DH_DSS_WITH_CAMELLIA_128_CBC_SHA256:187,TLS1_CK_DH_RSA_WITH_CAMELLIA_128_CBC_SHA256:188,TLS1_CK_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA256:189,TLS1_CK_DHE_RSA_WITH_CAMELLIA_128_CBC_SHA256:190,TLS1_CK_ADH_WITH_CAMELLIA_128_CBC_SHA256:191,TLS1_CK_RSA_WITH_CAMELLIA_256_CBC_SHA256:192,TLS1_CK_DH_DSS_WITH_CAMELLIA_256_CBC_SHA256:193,TLS1_CK_DH_RSA_WITH_CAMELLIA_256_CBC_SHA256:194,TLS1_CK_DHE_DSS_WITH_CAMELLIA_256_CBC_SHA256:195,TLS1_CK_DHE_RSA_WITH_CAMELLIA_256_CBC_SHA256:196,TLS1_CK_ADH_WITH_CAMELLIA_256_CBC_SHA256:197,TLS1_CK_ECDH_ECDSA_WITH_NULL_SHA:49153,TLS1_CK_ECDH_ECDSA_WITH_RC4_128_SHA:49154,TLS1_CK_ECDH_ECDSA_WITH_DES_192_CBC3_SHA:49155,TLS1_CK_ECDH_ECDSA_WITH_AES_128_CBC_SHA:49156,TLS1_CK_ECDH_ECDSA_WITH_AES_256_CBC_SHA:49157,TLS1_CK_ECDHE_ECDSA_WITH_NULL_SHA:49158,TLS1_CK_ECDHE_ECDSA_WITH_RC4_128_SHA:49159,TLS1_CK_ECDHE_ECDSA_WITH_DES_192_CBC3_SHA:49160,TLS1_CK_ECDHE_ECDSA_WITH_AES_128_CBC_SHA:49161,TLS1_CK_ECDHE_ECDSA_WITH_AES_256_CBC_SHA:49162,TLS1_CK_ECDH_RSA_WITH_NULL_SHA:49163,TLS1_CK_ECDH_RSA_WITH_RC4_128_SHA:49164,TLS1_CK_ECDH_RSA_WITH_DES_192_CBC3_SHA:49165,TLS1_CK_ECDH_RSA_WITH_AES_128_CBC_SHA:49166,TLS1_CK_ECDH_RSA_WITH_AES_256_CBC_SHA:49167,TLS1_CK_ECDHE_RSA_WITH_NULL_SHA:49168,TLS1_CK_ECDHE_RSA_WITH_RC4_128_SHA:49169,TLS1_CK_ECDHE_RSA_WITH_DES_192_CBC3_SHA:49170,TLS1_CK_ECDHE_RSA_WITH_AES_128_CBC_SHA:49171,TLS1_CK_ECDHE_RSA_WITH_AES_256_CBC_SHA:49172,TLS1_CK_ECDH_anon_WITH_NULL_SHA:49173,TLS1_CK_ECDH_anon_WITH_RC4_128_SHA:49174,TLS1_CK_ECDH_anon_WITH_DES_192_CBC3_SHA:49175,TLS1_CK_ECDH_anon_WITH_AES_128_CBC_SHA:49176,TLS1_CK_ECDH_anon_WITH_AES_256_CBC_SHA:49177,TLS1_CK_SRP_SHA_WITH_3DES_EDE_CBC_SHA:49178,TLS1_CK_SRP_SHA_RSA_WITH_3DES_EDE_CBC_SHA:49179,TLS1_CK_SRP_SHA_DSS_WITH_3DES_EDE_CBC_SHA:49180,TLS1_CK_SRP_SHA_WITH_AES_128_CBC_SHA:49181,TLS1_CK_SRP_SHA_RSA_WITH_AES_128_CBC_SHA:49182,TLS1_CK_SRP_SHA_DSS_WITH_AES_128_CBC_SHA:49183,TLS1_CK_SRP_SHA_WITH_AES_256_CBC_SHA:49184,TLS1_CK_SRP_SHA_RSA_WITH_AES_256_CBC_SHA:49185,TLS1_CK_SRP_SHA_DSS_WITH_AES_256_CBC_SHA:49186,TLS1_CK_ECDHE_ECDSA_WITH_AES_128_SHA256:49187,TLS1_CK_ECDHE_ECDSA_WITH_AES_256_SHA384:49188,TLS1_CK_ECDH_ECDSA_WITH_AES_128_SHA256:49189,TLS1_CK_ECDH_ECDSA_WITH_AES_256_SHA384:49190,TLS1_CK_ECDHE_RSA_WITH_AES_128_SHA256:49191,TLS1_CK_ECDHE_RSA_WITH_AES_256_SHA384:49192,TLS1_CK_ECDH_RSA_WITH_AES_128_SHA256:49193,TLS1_CK_ECDH_RSA_WITH_AES_256_SHA384:49194,TLS1_CK_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:49195,TLS1_CK_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:49196,TLS1_CK_ECDH_ECDSA_WITH_AES_128_GCM_SHA256:49197,TLS1_CK_ECDH_ECDSA_WITH_AES_256_GCM_SHA384:49198,TLS1_CK_ECDHE_RSA_WITH_AES_128_GCM_SHA256:49199,TLS1_CK_ECDHE_RSA_WITH_AES_256_GCM_SHA384:49200,TLS1_CK_ECDH_RSA_WITH_AES_128_GCM_SHA256:49201,TLS1_CK_ECDH_RSA_WITH_AES_256_GCM_SHA384:49202,TLS1_CK_ECDHE_PSK_WITH_RC4_128_SHA:49203,TLS1_CK_ECDHE_PSK_WITH_3DES_EDE_CBC_SHA:49204,TLS1_CK_ECDHE_PSK_WITH_AES_128_CBC_SHA:49205,TLS1_CK_ECDHE_PSK_WITH_AES_256_CBC_SHA:49206,TLS1_CK_ECDHE_PSK_WITH_AES_128_CBC_SHA256:49207,TLS1_CK_ECDHE_PSK_WITH_AES_256_CBC_SHA384:49208,TLS1_CK_ECDHE_PSK_WITH_NULL_SHA:49209,TLS1_CK_ECDHE_PSK_WITH_NULL_SHA256:49210,TLS1_CK_ECDHE_PSK_WITH_NULL_SHA384:49211,TLS1_CK_ECDHE_ECDSA_WITH_CAMELLIA_128_CBC_SHA256:49266,TLS1_CK_ECDHE_ECDSA_WITH_CAMELLIA_256_CBC_SHA384:49267,TLS1_CK_ECDH_ECDSA_WITH_CAMELLIA_128_CBC_SHA256:49268,TLS1_CK_ECDH_ECDSA_WITH_CAMELLIA_256_CBC_SHA384:49269,TLS1_CK_ECDHE_RSA_WITH_CAMELLIA_128_CBC_SHA256:49270,TLS1_CK_ECDHE_RSA_WITH_CAMELLIA_256_CBC_SHA384:49271,TLS1_CK_ECDH_RSA_WITH_CAMELLIA_128_CBC_SHA256:49272,TLS1_CK_ECDH_RSA_WITH_CAMELLIA_256_CBC_SHA384:49273,TLS1_CK_PSK_WITH_CAMELLIA_128_CBC_SHA256:49300,TLS1_CK_PSK_WITH_CAMELLIA_256_CBC_SHA384:49301,TLS1_CK_DHE_PSK_WITH_CAMELLIA_128_CBC_SHA256:49302,TLS1_CK_DHE_PSK_WITH_CAMELLIA_256_CBC_SHA384:49303,TLS1_CK_RSA_PSK_WITH_CAMELLIA_128_CBC_SHA256:49304,TLS1_CK_RSA_PSK_WITH_CAMELLIA_256_CBC_SHA384:49305,TLS1_CK_ECDHE_PSK_WITH_CAMELLIA_128_CBC_SHA256:49306,TLS1_CK_ECDHE_PSK_WITH_CAMELLIA_256_CBC_SHA384:49307,TLS1_CK_ECDHE_RSA_WITH_CHACHA20_POLY1305:52392,TLS1_CK_ECDHE_ECDSA_WITH_CHACHA20_POLY1305:52393,TLS1_CK_DHE_RSA_WITH_CHACHA20_POLY1305:52394,TLS1_CK_PSK_WITH_CHACHA20_POLY1305:52395,TLS1_CK_ECDHE_PSK_WITH_CHACHA20_POLY1305:52396,TLS1_CK_DHE_PSK_WITH_CHACHA20_POLY1305:52397,TLS1_CK_RSA_PSK_WITH_CHACHA20_POLY1305:52398};V(Hn);const $n={secp256r1:23,secp384r1:24,secp521r1:25,x25519:29,x448:30};V($n);const In={uncompressed:0,ansiX962_compressed_prime:1,ansiX962_compressed_char2:2};V(In);const Ln={anonymous:0,rsa:1,dsa:2,ecdsa:3};V(Ln);const xn={none:0,md5:1,sha1:2,sha224:3,sha256:4,sha384:5,sha512:6};V(xn);const bn={Warning:1,Fatal:2};V(bn);const Dn={CloseNotify:0,UnexpectedMessage:10,BadRecordMac:20,DecryptionFailed:21,RecordOverflow:22,DecompressionFailure:30,HandshakeFailure:40,NoCertificate:41,BadCertificate:42,UnsupportedCertificate:43,CertificateRevoked:44,CertificateExpired:45,CertificateUnknown:46,IllegalParameter:47,UnknownCa:48,AccessDenied:49,DecodeError:50,DecryptError:51,ExportRestriction:60,ProtocolVersion:70,InsufficientSecurity:71,InternalError:80,UserCanceled:90,NoRenegotiation:100,UnsupportedExtension:110};V(Dn);crypto.subtle.generateKey({name:"ECDH",namedCurve:"P-256"},!0,["deriveKey","deriveBits"]);function Bn(n,r){return{type:"response",requestId:n,response:r}}async function Rn(n,r){const i=["GET","HEAD"].includes(n.method)||"body"in r?void 0:await n.blob();return new Request(r.url||n.url,{body:i,method:n.method,headers:n.headers,referrer:n.referrer,referrerPolicy:n.referrerPolicy,mode:n.mode==="navigate"?"same-origin":n.mode,credentials:n.credentials,cache:n.cache,redirect:n.redirect,integrity:n.integrity,...r})}async function Pn(n,r,i){const a=fetch(n,r);if(!i)return a;try{return await a}catch{let c;if(typeof n=="string"||n instanceof URL)c=`${i}${n}`;else if(n instanceof Request)c=await Rn(n,{url:`${i}${n.url}`});else throw new Error("Invalid input type for fetch");return fetch(c,r)}}function Wn(n,r){window.addEventListener("message",i=>{i.source===n.contentWindow&&(r&&i.origin!==r||typeof i.data!="object"||i.data.type!=="relay"||window.parent.postMessage(i.data,"*"))}),window.addEventListener("message",i=>{i.source===window.parent&&(typeof i.data!="object"||i.data.type!=="relay"||n?.contentWindow?.postMessage(i.data))})}async function kn(n){const r=new Worker(n,{type:"module"});return new Promise((i,a)=>{r.onerror=u=>{const p=new Error(`WebWorker failed to load at ${n}. ${u.message?`Original error: ${u.message}`:""}`);p.filename=u.filename,a(p)};function c(u){u.data==="worker-script-started"&&(i(r),r.removeEventListener("message",c))}r.addEventListener("message",c)})}const Fn="_overlay_1571u_1",Kn="_is-hidden_1571u_17",vn="_wrapper_1571u_22",Mn="_wrapper-definite_1571u_32",Un="_progress-bar_1571u_32",Nn="_is-indefinite_1571u_32",On="_wrapper-indefinite_1571u_33",Gn="_is-definite_1571u_33",zn="_indefinite-loading_1571u_1",qn="_caption_1571u_81",v={overlay:Fn,isHidden:Kn,wrapper:vn,wrapperDefinite:Mn,progressBar:Un,isIndefinite:Nn,wrapperIndefinite:On,isDefinite:Gn,indefiniteLoading:zn,caption:qn};class jn{constructor(r={}){this.caption="Preparing WordPress",this.progress=0,this.isIndefinite=!1,this.visible=!0,this.element=document.createElement("div"),this.captionElement=document.createElement("h3"),this.element.appendChild(this.captionElement),this.setOptions(r)}setOptions(r){"caption"in r&&r.caption&&(this.caption=r.caption),"progress"in r&&(this.progress=r.progress),"isIndefinite"in r&&(this.isIndefinite=r.isIndefinite),"visible"in r&&(this.visible=r.visible),this.updateElement()}destroy(){this.setOptions({visible:!1}),setTimeout(()=>{this.element.remove()},500)}updateElement(){this.element.className="",this.element.classList.add(v.overlay),this.visible||this.element.classList.add(v.isHidden),this.captionElement.className="",this.captionElement.classList.add(v.caption),this.captionElement.textContent=this.caption+"...";const r=this.element.querySelector(`.${v.wrapper}`);r&&this.element.removeChild(r),this.isIndefinite?this.element.appendChild(this.createProgressIndefinite()):this.element.appendChild(this.createProgress())}createProgress(){const r=document.createElement("div");r.classList.add(v.wrapper,v.wrapperDefinite);const i=document.createElement("div");return i.classList.add(v.progressBar,v.isDefinite),i.style.width=this.progress+"%",r.appendChild(i),r}createProgressIndefinite(){const r=document.createElement("div");r.classList.add(v.wrapper,v.wrapperIndefinite);const i=document.createElement("div");return i.classList.add(v.progressBar,v.isIndefinite),r.appendChild(i),r}}const Vn="/worker-thread-72faaf00.js",Yn="/sw.js",wt=["db.php","plugins/akismet","plugins/hello.php","plugins/wordpress-importer","mu-plugins/sqlite-database-integration","mu-plugins/playground-includes","mu-plugins/0-playground.php","mu-plugins/0-sqlite.php","themes/twentytwenty","themes/twentytwentyone","themes/twentytwentytwo","themes/twentytwentythree","themes/twentytwentyfour","themes/twentytwentyfive","themes/twentytwentysix"],St=async(n,{pluginPath:r,pluginName:i},a)=>{a?.tracker.setCaption(`Activating ${i||r}`);const c=await n.documentRoot,u=await n.run({code:`<?php
			define( 'WP_ADMIN', true );
			require_once( getenv('DOCROOT') . "/wp-load.php" );
			require_once( getenv('DOCROOT') . "/wp-admin/includes/plugin.php" );

			// Set current user to admin
			wp_set_current_user( get_users(array('role' => 'Administrator') )[0]->ID );

			$plugin_path = getenv('PLUGIN_PATH');
			$response = false;
			if ( ! is_dir( $plugin_path)) {
				$response = activate_plugin($plugin_path);
			}

			// Activate plugin by name if activation by path wasn't successful
			if ( null !== $response ) {
				foreach ( ( glob( $plugin_path . '/*.php' ) ?: array() ) as $file ) {
					$info = get_plugin_data( $file, false, false );
					if ( ! empty( $info['Name'] ) ) {
						$response = activate_plugin( $file );
						break;
					}
				}
			}

			if ( is_wp_error($response) ) {
				die( $response->get_error_message() );
			} else if ( false === $response ) {
				die( "The activatePlugin step wasn't able to find the plugin $plugin_path." );
			}
		`,env:{PLUGIN_PATH:r,DOCROOT:c}});u.text&&U.warn(`Plugin ${r} activation printed the following bytes: ${u.text}`);const p=await n.run({code:`<?php
			ob_start();
			require_once( getenv( 'DOCROOT' ) . "/wp-load.php" );

			/**
			 * Extracts the relative plugin path from either an absolute or relative plugin path.
			 *
			 * Absolute paths starting with plugin directory (e.g., '/wordpress/wp-content/plugins/test-plugin/index.php')
			 * should be converted to relative paths (e.g., 'test-plugin/index.php')
			 *
			 * Directories should finish with a trailing slash to ensure we match the full plugin directory name.
			 *
			 * Examples:
			 * - '/wordpress/wp-content/plugins/test-plugin/index.php' → 'test-plugin/index.php'
			 * - '/wordpress/wp-content/plugins/test-plugin/' → 'test-plugin/'
			 * - '/wordpress/wp-content/plugins/test-plugin' → 'test-plugin/'
			 * - 'test-plugin/index.php' → 'test-plugin/index.php'
			 * - 'test-plugin/' → 'test-plugin/'
			 * - 'test-plugin' → 'test-plugin/'
			 */
			$plugin_directory = WP_PLUGIN_DIR . '/';
			$relative_plugin_path = getenv( 'PLUGIN_PATH' );
			if (strpos($relative_plugin_path, $plugin_directory) === 0) {
				$relative_plugin_path = substr($relative_plugin_path, strlen($plugin_directory));
			}

			if ( is_dir( $plugin_directory . $relative_plugin_path ) ) {
				$relative_plugin_path = rtrim( $relative_plugin_path, '/' ) . '/';
			}

			$active_plugins = get_option( 'active_plugins' );
			foreach ( $active_plugins as $plugin ) {
				if ( substr( $plugin, 0, strlen( $relative_plugin_path ) ) === $relative_plugin_path ) {
					ob_end_clean();
					die( 'true' );
				}
			}
			die( ob_get_flush() ?: 'false' );
		`,env:{DOCROOT:c,PLUGIN_PATH:r}});if(p.text!=="true")throw p.text!=="false"&&U.debug(p.text),new Error(`Plugin ${r} could not be activated – WordPress exited with no error. Sometimes, when $_SERVER or site options are not configured correctly, WordPress exits early with a 301 redirect. Inspect the "debug" logs in the console for more details.`)},Et=async(n,{themeFolderName:r},i)=>{i?.tracker.setCaption(`Activating ${r}`);const a=await n.documentRoot,c=`${a}/wp-content/themes/${r}`;if(!await n.fileExists(c))throw new Error(`
			Couldn't activate theme ${r}.
			Theme not found at the provided theme path: ${c}.
			Check the theme path to ensure it's correct.
			If the theme is not installed, you can install it using the installTheme step.
			More info can be found in the Blueprint documentation: https://wordpress.github.io/wordpress-playground/blueprints/steps/#ActivateThemeStep
		`);const u=await n.run({code:`<?php
			define( 'WP_ADMIN', true );
			require_once( getenv('docroot') . "/wp-load.php" );

			// Set current user to admin
			wp_set_current_user( get_users(array('role' => 'Administrator') )[0]->ID );

			switch_theme( getenv('themeFolderName') );

			if( wp_get_theme()->get_stylesheet() !== getenv('themeFolderName') ) {
				throw new Exception( 'Theme ' . getenv('themeFolderName') . ' could not be activated.' );				
			}
			die('Theme activated successfully');
		`,env:{docroot:a,themeFolderName:r}});if(u.text!=="Theme activated successfully")throw U.debug(u),new Error(`Theme ${r} could not be activated – WordPress exited with no error. Sometimes, when $_SERVER or site options are not configured correctly, WordPress exits early with a 301 redirect. Inspect the "debug" logs in the console for more details`)},Jn=async(n,{code:r})=>await n.run({code:r}),Qn=async(n,{options:r})=>await n.run(r),Ct=async(n,{path:r})=>{await n.unlink(r)},Xn=async(n,{sql:r},i)=>{i?.tracker.setCaption("Executing SQL Queries");const a=`/tmp/${nn()}.sql`;await n.writeFile(a,new Uint8Array(await r.arrayBuffer()));const c=await n.documentRoot,u=we({docroot:c,sqlFilename:a}),p=await n.run({code:`<?php
		require_once ${u.docroot} . '/wp-load.php';

		$handle = fopen(${u.sqlFilename}, 'r');

		global $wpdb;

		while ($line = fgets($handle)) {
			if(trim($line, " 
;") === '') {
				continue;
			}

			$wpdb->query($line);
		}
	`});return await Ct(n,{path:a}),p},Zn=async(n,{request:r})=>{U.warn('Deprecated: The Blueprint step "request" is deprecated and will be removed in a future release.');const i=await n.request(r);if(i.httpStatusCode>399||i.httpStatusCode<200)throw U.warn("WordPress response was",{response:i}),new Error(`Request failed with status ${i.httpStatusCode}`);return i},er=`<?php

/**
 * Rewrites the wp-config.php file to ensure specific constants are defined
 * with specific values.
 * 
 * Example:
 * 
 * \`\`\`php
 * <?php
 * define('WP_DEBUG', true);
 * // The third define() argument is also supported:
 * define('SAVEQUERIES', false, true);
 * 
 * // Expression
 * define(true ? 'WP_DEBUG_LOG' : 'WP_DEBUG_LOG', 123);
 * 
 * // Guarded expressions shouldn't be wrapped twice
 * if(!defined(1 ? 'A' : 'B')) {
 *     define(1 ? 'A' : 'B', 0);
 * }
 * 
 * // More advanced expression
 * define((function() use($x) {
 *     return [$x, 'a'];
 * })(), 123);
 * \`\`\`
 * 
 * Rewritten with
 * 
 *     $constants = [
 *        'WP_DEBUG' => false,
 *        'WP_DEBUG_LOG' => true,
 *        'SAVEQUERIES' => true,
 *        'NEW_CONSTANT' => "new constant",
 *     ];
 * 
 * \`\`\`php
 * <?php
 * define('WP_DEBUG_LOG',true);
 * define('NEW_CONSTANT','new constant');
 * ?><?php
 * define('WP_DEBUG',false);
 * // The third define() argument is also supported:
 * define('SAVEQUERIES',true, true);
 * 
 * // Expression
 * if(!defined($const ? 'WP_DEBUG_LOG' : 'WP_DEBUG_LOG')) {
 *      define($const ? 'WP_DEBUG_LOG' : 'WP_DEBUG_LOG', 123);
 * }
 * 
 * // Guarded expressions shouldn't be wrapped twice
 * if(!defined(1 ? 'A' : 'B')) {
 *     define(1 ? 'A' : 'B', 0);
 * }
 * 
 * // More advanced expression
 * if(!defined((function() use($x) {
 *    return [$x, 'a'];
 * })())) {
 *     define((function() use($x) {
 *         return [$x, 'a'];
 *     })(), 123);
 * }
 * \`\`\`
 * 
 * @param mixed $content
 * @return string
 */
function rewrite_wp_config_to_define_constants($content, $constants = [])
{
    $tokens = array_reverse(token_get_all($content));
    $output = [];
    $defined_expressions = [];

    // Look through all the tokens and find the define calls
    do {
        $buffer = [];
        $name_buffer = [];
        $value_buffer = [];
        $third_arg_buffer = [];

        // Capture everything until the define call into output.
        // Capturing the define call into a buffer.
        // Example:
        //     <?php echo 'a'; define  (
        //     ^^^^^^^^^^^^^^^^^^^^^^
        //           output   |buffer
        while ($token = array_pop($tokens)) {
            if (is_array($token) && $token[0] === T_STRING && (strtolower($token[1]) === 'define' || strtolower($token[1]) === 'defined')) {
                $buffer[] = $token;
                break;
            }
            $output[] = $token;
        }

        // Maybe we didn't find a define call and reached the end of the file?
        if (!count($tokens)) {
            break;
        }

        // Keep track of the "defined" expressions that are already accounted for
        if($token[1] === 'defined') {
            $output[] = $token;
            $defined_expression = [];
            $open_parenthesis = 0;
            // Capture everything up to the opening parenthesis, including the parenthesis
            // e.g. defined  (
            //           ^^^^
            while ($token = array_pop($tokens)) {
                $output[] = $token;
                if ($token === "(") {
                    ++$open_parenthesis;
                    break;
                }
            }

            // Capture everything up to the closing parenthesis, including the parenthesis
            // e.g. defined  (
            //           ^^^^
            while ($token = array_pop($tokens)) {
                $output[] = $token;
                if ($token === ")") {
                    --$open_parenthesis;
                }
                if ($open_parenthesis === 0) {
                    break;
                }
                $defined_expression[] = $token;
            }

            $defined_expressions[] = stringify_tokens(skip_whitespace($defined_expression));
            continue;
        }

        // Capture everything up to the opening parenthesis, including the parenthesis
        // e.g. define  (
        //           ^^^^
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === "(") {
                break;
            }
        }

        // Capture the first argument – it's the first expression after the opening
        // parenthesis and before the comma:
        // Examples:
        //     define("WP_DEBUG", true);
        //            ^^^^^^^^^^^
        //
        //     define(count([1,2]) > 2 ? 'WP_DEBUG' : 'FOO', true);
        //            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        $open_parenthesis = 0;
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === "(" || $token === "[" || $token === "{") {
                ++$open_parenthesis;
            } elseif ($token === ")" || $token === "]" || $token === "}") {
                --$open_parenthesis;
            } elseif ($token === "," && $open_parenthesis === 0) {
                break;
            }

            // Don't capture the comma as a part of the constant name
            $name_buffer[] = $token;
        }

        // Capture everything until the closing parenthesis
        //     define("WP_DEBUG", true);
        //                       ^^^^^^
        $open_parenthesis = 0;
        $is_second_argument = true;
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === ")" && $open_parenthesis === 0) {
                // Final parenthesis of the define call.
                break;
            } else if ($token === "(" || $token === "[" || $token === "{") {
                ++$open_parenthesis;
            } elseif ($token === ")" || $token === "]" || $token === "}") {
                --$open_parenthesis;
            } elseif ($token === "," && $open_parenthesis === 0) {
                // This define call has more than 2 arguments! The third one is the
                // boolean value indicating $is_case_insensitive. Let's continue capturing
                // to $third_arg_buffer.
                $is_second_argument = false;
            }
            if ($is_second_argument) {
                $value_buffer[] = $token;
            } else {
                $third_arg_buffer[] = $token;
            }
        }

        // Capture until the semicolon
        //     define("WP_DEBUG", true)  ;
        //                             ^^^
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === ";") {
                break;
            }
        }

        // Decide whether $name_buffer is a constant name or an expression
        $name_token = null;
        $name_token_index = $token;
        $name_is_literal = true;
        foreach ($name_buffer as $k => $token) {
            if (is_array($token)) {
                if ($token[0] === T_WHITESPACE || $token[0] === T_COMMENT || $token[0] === T_DOC_COMMENT) {
                    continue;
                } else if ($token[0] === T_STRING || $token[0] === T_CONSTANT_ENCAPSED_STRING) {
                    $name_token = $token;
                    $name_token_index = $k;
                } else {
                    $name_is_literal = false;
                    break;
                }
            } else if ($token !== "(" && $token !== ")") {
                $name_is_literal = false;
                break;
            }
        }

        // We can't handle expressions as constant names. Let's wrap that define
        // call in an if(!defined()) statement, just in case it collides with
        // a constant name.
        if (!$name_is_literal) {
            // Ensure the defined expression is not already accounted for
            foreach ($defined_expressions as $defined_expression) {
                if ($defined_expression === stringify_tokens(skip_whitespace($name_buffer))) {
                    $output = array_merge($output, $buffer);
                    continue 2;
                }
            }
            $output = array_merge(
                $output,
                ["if(!defined("],
                $name_buffer,
                [")) {\\n     "],
                ['define('],
                $name_buffer,
                [','],
                $value_buffer,
                $third_arg_buffer,
                [");"],
                ["\\n}\\n"]
            );
            continue;
        }

        // Yay, we have a literal constant name in the buffer now. Let's
        // get its value:
        $name = eval('return ' . $name_token[1] . ';');

        // If the constant name is not in the list of constants we're looking,
        // we can ignore it.
        if (!array_key_exists($name, $constants)) {
            $output = array_merge($output, $buffer);
            continue;
        }

        // We now have a define() call that defines a constant we're looking for.
        // Let's rewrite its value to the one 
        $output = array_merge(
            $output,
            ['define('],
            $name_buffer,
            [','],
            [var_export($constants[$name], true)],
            $third_arg_buffer,
            [");"]
        );

        // Remove the constant from the list so we can process any remaining
        // constants later.
        unset($constants[$name]);
    } while (count($tokens));

    // Add any constants that weren't found in the file
    if (count($constants)) {
        $prepend = [
            "<?php \\n"
        ];
        foreach ($constants as $name => $value) {
            $prepend = array_merge(
                $prepend,
                [
                    "define(",
                    var_export($name, true),
                    ',',
                    var_export($value, true),
                    ");\\n"
                ]
            );
        }
        $prepend[] = "?>";
        $output = array_merge(
            $prepend,
            $output
        );
    }

    // Translate the output tokens back into a string
    return stringify_tokens($output);
}

function stringify_tokens($tokens) {
    $output = '';
    foreach ($tokens as $token) {
        if (is_array($token)) {
            $output .= $token[1];
        } else {
            $output .= $token;
        }
    }
    return $output;
}

function skip_whitespace($tokens) {
    $output = [];
    foreach ($tokens as $token) {
        if (is_array($token) && ($token[0] === T_WHITESPACE || $token[0] === T_COMMENT || $token[0] === T_DOC_COMMENT)) {
            continue;
        }
        $output[] = $token;
    }
    return $output;
}
`,Ce=async(n,{consts:r,method:i="define-before-run"})=>{switch(i){case"define-before-run":await tr(n,r);break;case"rewrite-wp-config":{const a=await n.documentRoot,c=$(a,"/wp-config.php"),u=await n.readFileAsText(c),p=await nr(n,u,r);await n.writeFile(c,p);break}default:throw new Error(`Invalid method: ${i}`)}};async function tr(n,r){for(const i in r)await n.defineConstant(i,r[i])}async function nr(n,r,i){await n.writeFile("/tmp/code.php",r);const a=we({consts:i});return await n.run({code:`${er}
	$wp_config_path = '/tmp/code.php';
	$wp_config = file_get_contents($wp_config_path);
	$new_wp_config = rewrite_wp_config_to_define_constants($wp_config, ${a.consts});
	file_put_contents($wp_config_path, $new_wp_config);
	`}),await n.readFileAsText("/tmp/code.php")}const yt=async(n,{options:r})=>{const i=await n.documentRoot;await n.run({code:`<?php
		include ${F(i)} . '/wp-load.php';
		$site_options = ${F(r)};
		foreach($site_options as $name => $value) {
			update_option($name, $value);
		}
		echo "Success";
		`})},rr=async(n,{meta:r,userId:i})=>{const a=await n.documentRoot;await n.run({code:`<?php
		include ${F(a)} . '/wp-load.php';
		$meta = ${F(r)};
		foreach($meta as $name => $value) {
			update_user_meta(${F(i)}, $name, $value);
		}
		`})},At="/tmp/wp-cli.phar",gt=async(n,r=At)=>{if(!await n.fileExists(r))throw new Error(`wp-cli.phar not found at ${r}.
			You can enable wp-cli support by adding "wp-cli" to the list of extra libraries in your blueprint as follows:
			{
				"extraLibraries": [ "wp-cli" ]
			}
			Read more about it in the documentation.
			https://wordpress.github.io/wordpress-playground/blueprints/data-format#extra-libraries`)},Tt=async(n,{command:r,wpCliPath:i=At})=>{await gt(n,i);let a;if(typeof r=="string"?(r=r.trim(),a=ir(r)):a=r,a.shift()!=="wp")throw new Error('The first argument must be "wp".');const u=await n.documentRoot;await n.writeFile("/tmp/stdout",""),await n.writeFile("/tmp/stderr",""),await n.writeFile($(u,"run-cli.php"),`<?php
		// Set up the environment to emulate a shell script
		// call.

		// Set SHELL_PIPE to 0 to ensure WP-CLI formats
		// the output as ASCII tables.
		// @see https://github.com/wp-cli/wp-cli/issues/1102
		putenv( 'SHELL_PIPE=0' );

		// Set the argv global.
		$GLOBALS['argv'] = array_merge([
		  "/tmp/wp-cli.phar",
		  "--path=${u}"
		], ${F(a)});

		// Provide stdin, stdout, stderr streams outside of
		// the CLI SAPI.
		define('STDIN', fopen('php://stdin', 'rb'));
		define('STDOUT', fopen('php://stdout', 'wb'));
		define('STDERR', fopen('php://stderr', 'wb'));

		require( ${F(i)} );
		`);const p=await n.run({scriptPath:$(u,"run-cli.php")});if(p.errors)throw new Error(p.errors);return p};function ir(n){let a=0,c="";const u=[];let p="";for(let _=0;_<n.length;_++){const h=n[_];a===0?h==='"'||h==="'"?(a=1,c=h):h.match(/\s/)?(p&&u.push(p),p=""):p+=h:a===1&&(h==="\\"?(_++,p+=n[_]):h===c?(a=0,c=""):p+=h)}return p&&u.push(p),u}const or=async(n,{wpCliPath:r})=>{await gt(n,r),await Ce(n,{consts:{WP_ALLOW_MULTISITE:1}});const i=new URL(await n.absoluteUrl);if(i.port!==""){let u=`The current host is ${i.host}, but WordPress multisites do not support custom ports.`;throw i.hostname==="localhost"&&(u+=" For development, you can set up a playground.test domain using the instructions at https://wordpress.github.io/wordpress-playground/contributing/code."),new Error(u)}const a=i.pathname.replace(/\/$/,"")+"/",c=`${i.protocol}//${i.hostname}${a}`;await yt(n,{options:{siteurl:c,home:c}}),await Tt(n,{command:"wp core multisite-convert"})},sr=async(n,{fromPath:r,toPath:i})=>{await n.writeFile(i,await n.readFileAsBuffer(r))},ar=async(n,{fromPath:r,toPath:i})=>{await n.mv(r,i)},cr=async(n,{path:r})=>{await n.mkdir(r)},_r=async(n,{path:r})=>{await n.rmdir(r)},ye=async(n,{path:r,data:i})=>{i instanceof File&&(i=new Uint8Array(await i.arrayBuffer())),r.startsWith("/wordpress/wp-content/mu-plugins")&&!await n.fileExists("/wordpress/wp-content/mu-plugins")&&await n.mkdir("/wordpress/wp-content/mu-plugins"),await n.writeFile(r,i)},ur=async(n,{writeToPath:r,filesTree:i})=>{await Se(n,r,i.files)},Ht=async(n,{siteUrl:r})=>{await Ce(n,{consts:{WP_HOME:r,WP_SITEURL:r}})},lr=async(n,{file:r,importer:i="default"},a)=>{i==="data-liberation"?await dr(n,r,a):await pr(n,r,a)};async function pr(n,r,i){i?.tracker?.setCaption("Importing content"),await ye(n,{path:"/tmp/import.wxr",data:r});const a=await n.documentRoot;await n.run({code:`<?php
	require ${F(a)} . '/wp-load.php';
	require ${F(a)} . '/wp-admin/includes/admin.php';

	kses_remove_filters();
	$admin_id = get_users(array('role' => 'Administrator') )[0]->ID;
	wp_set_current_user( $admin_id );
	$importer = new WXR_Importer( array(
		'fetch_attachments' => true,
		'default_author' => $admin_id
	) );
	$logger = new WP_Importer_Logger_CLI();
	$importer->set_logger( $logger );
	// Slashes from the imported content are lost if we don't call wp_slash here.
	add_action( 'wp_insert_post_data', function( $data ) {
		return wp_slash($data);
	});
  
  // Ensure that Site Editor templates are associated with the correct taxonomy.
  add_filter( 'wp_import_post_terms', function ( $terms, $post_id ) {
    foreach ( $terms as $post_term ) {
      if ( 'wp_theme' !== $term['taxonomy'] ) continue;
      $post_term = get_term_by('slug', $term['slug'], $term['taxonomy'] );
      if ( ! $post_term ) {
        $post_term = wp_insert_term(
          $term['slug'],
          $term['taxonomy']
        );
        $term_id = $post_term['term_id'];
      } else {
        $term_id = $post_term->term_id;
      }
      wp_set_object_terms( $post_id, $term_id, $term['taxonomy']) ;
    }
    return $terms;
  }, 10, 2 );
	$result = $importer->import( '/tmp/import.wxr' );
	`})}async function dr(n,r,i){i?.tracker?.setCaption("Preparing content import"),await ye(n,{path:"/tmp/import.wxr",data:r});const a=await n.documentRoot,c=await n.onMessage(u=>{const p=JSON.parse(u);p?.type==="import-wxr-progress"&&i?.tracker?.setCaption(p.progress)});try{await n.run({code:`<?php
	require ${F(a)} . '/wp-load.php';
	require ${F(a)} . '/wp-admin/includes/admin.php';

	// Defines the constants expected by the Box .phar stub when "cli" is used
	// as the SAPI name.
	// @TODO: Don't use the "cli" SAPI string and don't allow composer to run platform checks.
	if(!defined('STDERR')) define('STDERR', fopen('php://stderr', 'w'));
	if(!defined('STDIN'))  define('STDIN', fopen('php://stdin', 'r'));
	if(!defined('STDOUT')) define('STDOUT', fopen('php://stdout', 'w'));
	
	// Preloaded by the Blueprint compile() function
	require '/internal/shared/data-liberation-core.phar';

	$admin_id = get_users(array('role' => 'Administrator') )[0]->ID;
	wp_set_current_user( $admin_id );

	$new_site_url = get_site_url();
	$importer = WP_Stream_Importer::create_for_wxr_file(
		'/tmp/import.wxr',
		array(
			'new_site_url' => $new_site_url,
		)
	);
	$session = WP_Import_Session::create(
		array(
			'data_source' => 'wxr_file',
			'file_name' => '/tmp/import.wxr',
		)
	);
	while ( true ) {
		if ( true === $importer->next_step() ) {
			/**
			 * We're ignoring any importing errors.
			 * This script is a part of Blueprints and is expected to finish
			 * without stopping. We won't be gathering additional user input
			 * along the way. Instead, we'll just decide not to ignore the
			 * errors.
			 *
			 * @TODO: Consider extracting this code into a CLI script and
			 *        using it here instead of this custom script. Note it's
			 *        about a simple CLI script, not a WP-CLI command, as the
			 *        latter would require downloading 5MB of WP-CLI code.
			 */
			switch ( $importer->get_stage() ) {
				case WP_Stream_Importer::STAGE_INITIAL:
					$message = 'Preparing content import';
					break;
		
				case WP_Stream_Importer::STAGE_INDEX_ENTITIES:
					// Bump the total number of entities to import.
					$indexed = $session->count_all_total_entities();
					$message = 'Content import 1/4: Indexing records (' . $indexed . ' so far)';
					$session->create_frontloading_placeholders( $importer->get_indexed_assets_urls() );
					$session->bump_total_number_of_entities(
						$importer->get_indexed_entities_counts()
					);
					break;

				case WP_Stream_Importer::STAGE_TOPOLOGICAL_SORT:
					$message = 'Content import 2/4: Indexing data';
					break;

				case WP_Stream_Importer::STAGE_FRONTLOAD_ASSETS:
					$session->bump_frontloading_progress(
						$importer->get_frontloading_progress(),
						$importer->get_frontloading_events()
					);
					$nb_media = $session->count_awaiting_frontloading_placeholders();
					$message = 'Content import 3/4: Downloading media (' . $nb_media . ' remaining)';
					break;

				case WP_Stream_Importer::STAGE_IMPORT_ENTITIES:
					$session->bump_imported_entities_counts(
						$importer->get_imported_entities_counts()
					);
					$nb_remaining_entities = $session->count_remaining_entities();
					$message = 'Content import 4/4: Inserting data (' . $nb_remaining_entities . ' remaining)';
					break;

				default:
					$message = 'Importing content';
					break;
			}

			// Report progress to the UI
			post_message_to_js(json_encode([
				'type' => 'import-wxr-progress',
				'progress' => $message,
			]));
			continue;
		}
		if ( $importer->advance_to_next_stage() ) {
			continue;
		}
		// Import finished
		break;
	}
	`})}finally{await c()}}const $t=async(n,{themeSlug:r=""},i)=>{i?.tracker?.setCaption("Importing theme starter content");const a=await n.documentRoot;await n.run({code:`<?php

		/**
		 * Ensure that the customizer loads as an admin user.
		 *
		 * For compatibility with themes, this MUST be run prior to theme inclusion, which is why this is a plugins_loaded filter instead
		 * of running _wp_customize_include() manually after load.
		 */
		function importThemeStarterContent_plugins_loaded() {
			// Set as the admin user, this ensures we can customize the site.
			wp_set_current_user(
				get_users( [ 'role' => 'Administrator' ] )[0]
			);

			// Force the site to be fresh, although it should already be.
			add_filter( 'pre_option_fresh_site', '__return_true' );

			/*
			 * Simulate this request as the customizer loading with the current theme in preview mode.
			 *
			 * See _wp_customize_include()
			 */
			$_REQUEST['wp_customize']    = 'on';
			$_REQUEST['customize_theme'] = ${F(r)} ?: get_stylesheet();

			/*
			 * Claim this is a ajax request saving settings, to avoid the preview filters being applied.
			 */
			$_REQUEST['action'] = 'customize_save';
			add_filter( 'wp_doing_ajax', '__return_true' );

			$_GET = $_REQUEST;
		}
		playground_add_filter( 'plugins_loaded', 'importThemeStarterContent_plugins_loaded', 0 );

		require ${F(a)} . '/wp-load.php';

		// Return early if there's no starter content.
		if ( ! get_theme_starter_content() ) {
			return;
		}

		// Import the Starter Content.
		$wp_customize->import_theme_starter_content();

		// Publish the changeset, which publishes the starter content.
		wp_publish_post( $wp_customize->changeset_post_id() );
		`})};function fr(n=fetch){const r={};return async function(a,c){r[a]||(r[a]=n(a,c).then(w=>({body:w.body,responseInit:{status:w.status,statusText:w.statusText,headers:w.headers}})));const{body:u,responseInit:p}=await r[a],[_,h]=u.tee();return r[a]={body:_,responseInit:p},new Response(h,p)}}const be="/tmp/file.zip",It=async(n,r,i,a=!0)=>{if(r instanceof File){const u=r;r=be,await n.writeFile(r,new Uint8Array(await u.arrayBuffer()))}const c=we({zipPath:r,extractToPath:i,overwriteFiles:a});await n.run({code:`<?php
        function unzip($zipPath, $extractTo, $overwriteFiles = true)
        {
            if (!is_dir($extractTo)) {
                mkdir($extractTo, 0777, true);
            }
            $zip = new ZipArchive;
            $res = $zip->open($zipPath);
            if ($res === TRUE) {
				for ($i = 0; $i < $zip->numFiles; $i++) {
					$filename = $zip->getNameIndex($i);
					$fileinfo = pathinfo($filename);
					$extractFilePath = rtrim($extractTo, '/') . '/' . $filename;
					// Check if file exists and $overwriteFiles is false
					if (!file_exists($extractFilePath) || $overwriteFiles) {
						// Extract file
						$zip->extractTo($extractTo, $filename);
					}
				}
				$zip->close();
				chmod($extractTo, 0777);
            } else {
                throw new Exception("Could not unzip file: " . $zip->getStatusString());
            }
        }
        unzip(${c.zipPath}, ${c.extractToPath}, ${c.overwriteFiles});
        `}),await n.fileExists(be)&&await n.unlink(be)},ve=async(n,{zipFile:r,zipPath:i,extractToPath:a})=>{if(i)U.warn('The "zipPath" option of the unzip() Blueprint step is deprecated and will be removed. Use "zipFile" instead.');else if(!r)throw new Error("Either zipPath or zipFile must be provided");await It(n,r||i,a)},hr=async(n,{wordPressFilesZip:r,pathInZip:i=""})=>{const a=await n.documentRoot;let c=$("/tmp","import");await n.mkdir(c),await ve(n,{zipFile:r,extractToPath:c}),c=$(c,i);const u=$(c,"wp-content"),p=$(a,"wp-content");for(const m of wt){const S=$(u,m);await rt(n,S);const y=$(p,m);await n.fileExists(y)&&(await n.mkdir(pe(S)),await n.mv(y,S))}const _=$(c,"wp-content","database");await n.fileExists(_)||await n.mv($(a,"wp-content","database"),_);const h=await n.listFiles(c);for(const m of h)await rt(n,$(a,m)),await n.mv($(c,m),$(a,m));await n.rmdir(c),await Ht(n,{siteUrl:await n.absoluteUrl});const w=F($(a,"wp-admin","upgrade.php"));await n.run({code:`<?php
            $_GET['step'] = 'upgrade_db';
            require ${w};
            `})};async function rt(n,r){await n.fileExists(r)&&(await n.isDir(r)?await n.rmdir(r):await n.unlink(r))}async function mr(n){const r=await n.request({url:"/wp-admin/export.php?download=true&content=all"});return new File([r.bytes],"export.xml")}async function Lt(n,{targetPath:r,zipFile:i,ifAlreadyInstalled:a="overwrite",targetFolderName:c=""}){const p=i.name.replace(/\.zip$/,""),_=$(await n.documentRoot,"wp-content"),h=$(_,ct()),w=$(h,"assets",p);await n.fileExists(w)&&await n.rmdir(h,{recursive:!0}),await n.mkdir(h);try{await ve(n,{zipFile:i,extractToPath:w});let m=await n.listFiles(w,{prependPath:!0});m=m.filter(W=>!W.endsWith("/__MACOSX"));const S=m.length===1&&await n.isDir(m[0]);let y,A="";S?(A=m[0],y=m[0].split("/").pop()):(A=w,y=p),c&&c.length&&(y=c);const L=`${r}/${y}`;if(await n.fileExists(L)){if(!await n.isDir(L))throw new Error(`Cannot install asset ${y} to ${L} because a file with the same name already exists. Note it's a file, not a directory! Is this by mistake?`);if(a==="overwrite")await n.rmdir(L,{recursive:!0});else{if(a==="skip")return{assetFolderPath:L,assetFolderName:y};throw new Error(`Cannot install asset ${y} to ${r} because it already exists and the ifAlreadyInstalled option was set to ${a}`)}}return await n.mv(A,L),{assetFolderPath:L,assetFolderName:y}}finally{await n.rmdir(h,{recursive:!0})}}function xt(n){const r=n.split(".").shift().replace(/-/g," ");return r.charAt(0).toUpperCase()+r.slice(1).toLowerCase()}const wr=async(n,{pluginData:r,pluginZipFile:i,ifAlreadyInstalled:a,options:c={}},u)=>{i&&(r=i,U.warn('The "pluginZipFile" option is deprecated. Use "pluginData" instead.'));const p=$(await n.documentRoot,"wp-content","plugins"),_="targetFolderName"in c?c.targetFolderName:"";let h="",w="";if(r instanceof File)if(r.name.endsWith(".php")){const S=$(p,r.name);await ye(n,{path:S,data:r}),h=p,w=r.name}else{const S=r.name.split("/").pop()||"plugin.zip";w=xt(S),u?.tracker.setCaption(`Installing the ${w} plugin`);const y=await Lt(n,{ifAlreadyInstalled:a,zipFile:r,targetPath:`${await n.documentRoot}/wp-content/plugins`,targetFolderName:_});h=y.assetFolderPath,w=y.assetFolderName}else if(r){w=r.name,u?.tracker.setCaption(`Installing the ${w} plugin`);const S=$(p,_||r.name);await Se(n,S,r.files,{rmRoot:!0}),h=S}("activate"in c?c.activate:!0)&&await St(n,{pluginPath:h,pluginName:w},u)},Sr=async(n,{themeData:r,themeZipFile:i,ifAlreadyInstalled:a,options:c={}},u)=>{i&&(r=i,U.warn('The "themeZipFile" option is deprecated. Use "themeData" instead.'));const p="targetFolderName"in c?c.targetFolderName:"";let _="",h="";if(r instanceof File){const S=r.name.split("/").pop()||"theme.zip";h=xt(S),u?.tracker.setCaption(`Installing the ${h} theme`),_=(await Lt(n,{ifAlreadyInstalled:a,zipFile:r,targetPath:`${await n.documentRoot}/wp-content/themes`,targetFolderName:p})).assetFolderName}else{h=r.name,_=p||h,u?.tracker.setCaption(`Installing the ${h} theme`);const S=$(await n.documentRoot,"wp-content","themes",_);await Se(n,S,r.files,{rmRoot:!0})}("activate"in c?c.activate:!0)&&await Et(n,{themeFolderName:_},u),("importStarterContent"in c?c.importStarterContent:!1)&&await $t(n,{themeSlug:_},u)},Er=async(n,{username:r="admin"}={},i)=>{i?.tracker.setCaption(i?.initialCaption||"Logging in"),n.defineConstant("PLAYGROUND_AUTO_LOGIN_AS_USER",r)},Cr=async(n,r,i)=>{i?.tracker?.setCaption("Resetting WordPress data");const a=await n.documentRoot;await n.run({env:{DOCROOT:a},code:`<?php
		require getenv('DOCROOT') . '/wp-load.php';

		$GLOBALS['@pdo']->query('DELETE FROM wp_posts WHERE id > 0');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='wp_posts'");
		
		$GLOBALS['@pdo']->query('DELETE FROM wp_postmeta WHERE post_id > 1');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=20 WHERE NAME='wp_postmeta'");

		$GLOBALS['@pdo']->query('DELETE FROM wp_comments');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='wp_comments'");

		$GLOBALS['@pdo']->query('DELETE FROM wp_commentmeta');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='wp_commentmeta'");
		`})},yr=async(n,{options:r})=>{await n.request({url:"/wp-admin/install.php?step=2",method:"POST",body:{language:"en",prefix:"wp_",weblog_title:"My WordPress Website",user_name:r.adminPassword||"admin",admin_password:r.adminPassword||"password",admin_password2:r.adminPassword||"password",Submit:"Install WordPress",pw_weak:"1",admin_email:"admin@localhost.com"}})},Ar=async(n,{selfContained:r=!1}={})=>{const i="/tmp/wordpress-playground.zip",a=await n.documentRoot,c=$(a,"wp-content");let u=wt;r&&(u=u.filter(h=>!h.startsWith("themes/twenty")).filter(h=>h!=="mu-plugins/sqlite-database-integration"));const p=we({zipPath:i,wpContentPath:c,documentRoot:a,exceptPaths:u.map(h=>$(a,"wp-content",h)),additionalPaths:r?{[$(a,"wp-config.php")]:"wp-config.php"}:{}});await Tr(n,`zipDir(${p.wpContentPath}, ${p.zipPath}, array(
			'exclude_paths' => ${p.exceptPaths},
			'zip_root'      => ${p.documentRoot},
			'additional_paths' => ${p.additionalPaths}
		));`);const _=await n.readFileAsBuffer(i);return n.unlink(i),_},gr=`<?php

function zipDir($root, $output, $options = array())
{
    $root = rtrim($root, '/');
    $additionalPaths = array_key_exists('additional_paths', $options) ? $options['additional_paths'] : array();
    $excludePaths = array_key_exists('exclude_paths', $options) ? $options['exclude_paths'] : array();
    $zip_root = array_key_exists('zip_root', $options) ? $options['zip_root'] : $root;

    $zip = new ZipArchive;
    $res = $zip->open($output, ZipArchive::CREATE);
    if ($res === TRUE) {
        $directories = array(
            $root . '/'
        );
        while (sizeof($directories)) {
            $current_dir = array_pop($directories);

            if ($handle = opendir($current_dir)) {
                while (false !== ($entry = readdir($handle))) {
                    if ($entry == '.' || $entry == '..') {
                        continue;
                    }

                    $entry = join_paths($current_dir, $entry);
                    if (in_array($entry, $excludePaths)) {
                        continue;
                    }

                    if (is_dir($entry)) {
                        $directory_path = $entry . '/';
                        array_push($directories, $directory_path);
                    } else if (is_file($entry)) {
                        $zip->addFile($entry, substr($entry, strlen($zip_root)));
                    }
                }
                closedir($handle);
            }
        }
        foreach ($additionalPaths as $disk_path => $zip_path) {
            $zip->addFile($disk_path, $zip_path);
        }
        $zip->close();
        chmod($output, 0777);
    }
}

function join_paths()
{
    $paths = array();

    foreach (func_get_args() as $arg) {
        if ($arg !== '') {
            $paths[] = $arg;
        }
    }

    return preg_replace('#/+#', '/', join('/', $paths));
}
`;async function Tr(n,r){return await n.run({code:gr+r})}const Hr=fr(fetch);async function De(n="latest"){if(n.startsWith("https://")||n.startsWith("http://")){const a=await crypto.subtle.digest("SHA-1",new TextEncoder().encode(n)),c=Array.from(new Uint8Array(a)).map(u=>u.toString(16).padStart(2,"0")).join("");return{releaseUrl:n,version:"custom-"+c.substring(0,8),source:"inferred"}}else if(n==="trunk"||n==="nightly")return{releaseUrl:"https://wordpress.org/nightly-builds/wordpress-latest.zip",version:"nightly-"+new Date().toISOString().split("T")[0],source:"inferred"};let i=await(await Hr("https://api.wordpress.org/core/version-check/1.7/?channel=beta")).json();i=i.offers.filter(a=>a.response==="autoupdate");for(const a of i){if(n==="beta"&&a.version.includes("beta"))return{releaseUrl:a.download,version:a.version,source:"api"};if(n==="latest"&&!a.version.includes("beta"))return{releaseUrl:a.download,version:a.version,source:"api"};if(a.version.substring(0,n.length)===n)return{releaseUrl:a.download,version:a.version,source:"api"}}return{releaseUrl:`https://wordpress.org/wordpress-${n}.zip`,version:n,source:"inferred"}}const $r=async(n,r,i,a)=>{let c=null;if(n.match(/^(\d+\.\d+)(?:\.\d+)?$/))c=n;else if(n.match(/^(\d.\d(.\d)?)-(beta|rc|alpha|nightly).*$/i)){if(i)c=i;else{let u=await De("beta");u.source!=="api"&&(u=await De("latest")),c=u.version}c=c.replace(/^(\d.\d)(.\d+)/i,"$1").replace(/(rc|beta).*$/i,"RC")}else a?c=a:c=(await De("latest")).version;if(!c)throw new Error(`WordPress version ${n} is not supported by the setSiteLanguage step`);return`https://downloads.wordpress.org/translation/core/${c}/${r}.zip`},Ir=async(n,{language:r},i)=>{i?.tracker.setCaption(i?.initialCaption||"Translating"),await n.defineConstant("WPLANG",r);const a=await n.documentRoot,c=(await n.run({code:`<?php
			require '${a}/wp-includes/version.php';
			echo $wp_version;
		`})).text,u=[{url:await $r(c,r),type:"core"}],_=(await n.run({code:`<?php
		require_once('${a}/wp-load.php');
		require_once('${a}/wp-admin/includes/plugin.php');
		echo json_encode(
			array_values(
				array_map(
					function($plugin) {
						return [
							'slug'    => $plugin['TextDomain'],
							'version' => $plugin['Version']
						];
					},
					array_filter(
						get_plugins(),
						function($plugin) {
							return !empty($plugin['TextDomain']);
						}
					)
				)
			)
		);`})).json;for(const{slug:y,version:A}of _)u.push({url:`https://downloads.wordpress.org/translation/plugin/${y}/${A}/${r}.zip`,type:"plugin"});const w=(await n.run({code:`<?php
		require_once('${a}/wp-load.php');
		require_once('${a}/wp-admin/includes/theme.php');
		echo json_encode(
			array_values(
				array_map(
					function($theme) {
						return [
							'slug'    => $theme->get('TextDomain'),
							'version' => $theme->get('Version')
						];
					},
					wp_get_themes()
				)
			)
		);`})).json;for(const{slug:y,version:A}of w)u.push({url:`https://downloads.wordpress.org/translation/theme/${y}/${A}/${r}.zip`,type:"theme"});await n.isDir(`${a}/wp-content/languages/plugins`)||await n.mkdir(`${a}/wp-content/languages/plugins`),await n.isDir(`${a}/wp-content/languages/themes`)||await n.mkdir(`${a}/wp-content/languages/themes`);const m=new en({concurrency:5}),S=u.map(({url:y,type:A})=>m.run(async()=>{try{const L=await fetch(y);if(!L.ok)throw new Error(`Failed to download translations for ${A}: ${L.statusText}`);let W=`${a}/wp-content/languages`;A==="plugin"?W+="/plugins":A==="theme"&&(W+="/themes"),await It(n,new File([await L.blob()],`${r}-${A}.zip`),W)}catch(L){if(A==="core")throw new Error(`Failed to download translations for WordPress. Please check if the language code ${r} is correct. You can find all available languages and translations on https://translate.wordpress.org/.`);U.warn(`Error downloading translations for ${A}: ${L}`)}}));await Promise.all(S)},Lr=Object.freeze(Object.defineProperty({__proto__:null,activatePlugin:St,activateTheme:Et,cp:sr,defineSiteUrl:Ht,defineWpConfigConsts:Ce,enableMultisite:or,exportWXR:mr,importThemeStarterContent:$t,importWordPressFiles:hr,importWxr:lr,installPlugin:wr,installTheme:Sr,login:Er,mkdir:cr,mv:ar,request:Zn,resetData:Cr,rm:Ct,rmdir:_r,runPHP:Jn,runPHPWithOptions:Qn,runSql:Xn,runWpInstallationWizard:yr,setSiteLanguage:Ir,setSiteOptions:yt,unzip:ve,updateUserMeta:rr,wpCLI:Tt,writeFile:ye,writeFiles:ur,zipWpContent:Ar},Symbol.toStringTag,{value:"Module"}));class Me extends Error{constructor(r){super(r),this.caller=""}toJSON(){return{code:this.code,data:this.data,caller:this.caller,message:this.message,stack:this.stack}}fromJSON(r){const i=new Me(r.message);return i.code=r.code,i.data=r.data,i.caller=r.caller,i.stack=r.stack,i}get isIsomorphicGitError(){return!0}}var xr={};/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */(function(n){(function(r){r(typeof DO_NOT_EXPORT_CRC>"u"?n:{})})(function(r){r.version="1.2.2";function i(){for(var E=0,P=new Array(256),C=0;C!=256;++C)E=C,E=E&1?-306674912^E>>>1:E>>>1,E=E&1?-306674912^E>>>1:E>>>1,E=E&1?-306674912^E>>>1:E>>>1,E=E&1?-306674912^E>>>1:E>>>1,E=E&1?-306674912^E>>>1:E>>>1,E=E&1?-306674912^E>>>1:E>>>1,E=E&1?-306674912^E>>>1:E>>>1,E=E&1?-306674912^E>>>1:E>>>1,P[C]=E;return typeof Int32Array<"u"?new Int32Array(P):P}var a=i();function c(E){var P=0,C=0,T=0,H=typeof Int32Array<"u"?new Int32Array(4096):new Array(4096);for(T=0;T!=256;++T)H[T]=E[T];for(T=0;T!=256;++T)for(C=E[T],P=256+T;P<4096;P+=256)C=H[P]=C>>>8^E[C&255];var B=[];for(T=1;T!=16;++T)B[T-1]=typeof Int32Array<"u"?H.subarray(T*256,T*256+256):H.slice(T*256,T*256+256);return B}var u=c(a),p=u[0],_=u[1],h=u[2],w=u[3],m=u[4],S=u[5],y=u[6],A=u[7],L=u[8],W=u[9],ge=u[10],re=u[11],Te=u[12],oe=u[13],He=u[14];function j(E,P){for(var C=P^-1,T=0,H=E.length;T<H;)C=C>>>8^a[(C^E.charCodeAt(T++))&255];return~C}function se(E,P){for(var C=P^-1,T=E.length-15,H=0;H<T;)C=He[E[H++]^C&255]^oe[E[H++]^C>>8&255]^Te[E[H++]^C>>16&255]^re[E[H++]^C>>>24]^ge[E[H++]]^W[E[H++]]^L[E[H++]]^A[E[H++]]^y[E[H++]]^S[E[H++]]^m[E[H++]]^w[E[H++]]^h[E[H++]]^_[E[H++]]^p[E[H++]]^a[E[H++]];for(T+=15;H<T;)C=C>>>8^a[(C^E[H++])&255];return~C}function ae(E,P){for(var C=P^-1,T=0,H=E.length,B=0,Q=0;T<H;)B=E.charCodeAt(T++),B<128?C=C>>>8^a[(C^B)&255]:B<2048?(C=C>>>8^a[(C^(192|B>>6&31))&255],C=C>>>8^a[(C^(128|B&63))&255]):B>=55296&&B<57344?(B=(B&1023)+64,Q=E.charCodeAt(T++)&1023,C=C>>>8^a[(C^(240|B>>8&7))&255],C=C>>>8^a[(C^(128|B>>2&63))&255],C=C>>>8^a[(C^(128|Q>>6&15|(B&3)<<4))&255],C=C>>>8^a[(C^(128|Q&63))&255]):(C=C>>>8^a[(C^(224|B>>12&15))&255],C=C>>>8^a[(C^(128|B>>6&63))&255],C=C>>>8^a[(C^(128|B&63))&255]);return~C}r.table=a,r.bstr=j,r.buf=se,r.str=ae})})(xr);var bt={},Ae={};Ae.byteLength=Br;Ae.toByteArray=Pr;Ae.fromByteArray=Fr;var q=[],M=[],br=typeof Uint8Array<"u"?Uint8Array:Array,Be="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var ee=0,Dr=Be.length;ee<Dr;++ee)q[ee]=Be[ee],M[Be.charCodeAt(ee)]=ee;M["-".charCodeAt(0)]=62;M["_".charCodeAt(0)]=63;function Dt(n){var r=n.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var i=n.indexOf("=");i===-1&&(i=r);var a=i===r?0:4-i%4;return[i,a]}function Br(n){var r=Dt(n),i=r[0],a=r[1];return(i+a)*3/4-a}function Rr(n,r,i){return(r+i)*3/4-i}function Pr(n){var r,i=Dt(n),a=i[0],c=i[1],u=new br(Rr(n,a,c)),p=0,_=c>0?a-4:a,h;for(h=0;h<_;h+=4)r=M[n.charCodeAt(h)]<<18|M[n.charCodeAt(h+1)]<<12|M[n.charCodeAt(h+2)]<<6|M[n.charCodeAt(h+3)],u[p++]=r>>16&255,u[p++]=r>>8&255,u[p++]=r&255;return c===2&&(r=M[n.charCodeAt(h)]<<2|M[n.charCodeAt(h+1)]>>4,u[p++]=r&255),c===1&&(r=M[n.charCodeAt(h)]<<10|M[n.charCodeAt(h+1)]<<4|M[n.charCodeAt(h+2)]>>2,u[p++]=r>>8&255,u[p++]=r&255),u}function Wr(n){return q[n>>18&63]+q[n>>12&63]+q[n>>6&63]+q[n&63]}function kr(n,r,i){for(var a,c=[],u=r;u<i;u+=3)a=(n[u]<<16&16711680)+(n[u+1]<<8&65280)+(n[u+2]&255),c.push(Wr(a));return c.join("")}function Fr(n){for(var r,i=n.length,a=i%3,c=[],u=16383,p=0,_=i-a;p<_;p+=u)c.push(kr(n,p,p+u>_?_:p+u));return a===1?(r=n[i-1],c.push(q[r>>2]+q[r<<4&63]+"==")):a===2&&(r=(n[i-2]<<8)+n[i-1],c.push(q[r>>10]+q[r>>4&63]+q[r<<2&63]+"=")),c.join("")}var Ue={};/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */Ue.read=function(n,r,i,a,c){var u,p,_=c*8-a-1,h=(1<<_)-1,w=h>>1,m=-7,S=i?c-1:0,y=i?-1:1,A=n[r+S];for(S+=y,u=A&(1<<-m)-1,A>>=-m,m+=_;m>0;u=u*256+n[r+S],S+=y,m-=8);for(p=u&(1<<-m)-1,u>>=-m,m+=a;m>0;p=p*256+n[r+S],S+=y,m-=8);if(u===0)u=1-w;else{if(u===h)return p?NaN:(A?-1:1)*(1/0);p=p+Math.pow(2,a),u=u-w}return(A?-1:1)*p*Math.pow(2,u-a)};Ue.write=function(n,r,i,a,c,u){var p,_,h,w=u*8-c-1,m=(1<<w)-1,S=m>>1,y=c===23?Math.pow(2,-24)-Math.pow(2,-77):0,A=a?0:u-1,L=a?1:-1,W=r<0||r===0&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(_=isNaN(r)?1:0,p=m):(p=Math.floor(Math.log(r)/Math.LN2),r*(h=Math.pow(2,-p))<1&&(p--,h*=2),p+S>=1?r+=y/h:r+=y*Math.pow(2,1-S),r*h>=2&&(p++,h/=2),p+S>=m?(_=0,p=m):p+S>=1?(_=(r*h-1)*Math.pow(2,c),p=p+S):(_=r*Math.pow(2,S-1)*Math.pow(2,c),p=0));c>=8;n[i+A]=_&255,A+=L,_/=256,c-=8);for(p=p<<c|_,w+=c;w>0;n[i+A]=p&255,A+=L,p/=256,w-=8);n[i+A-L]|=W*128};/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */(function(n){const r=Ae,i=Ue,a=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;n.Buffer=_,n.SlowBuffer=Te,n.INSPECT_MAX_BYTES=50;const c=2147483647;n.kMaxLength=c,_.TYPED_ARRAY_SUPPORT=u(),!_.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function u(){try{const o=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(o,e),o.foo()===42}catch{return!1}}Object.defineProperty(_.prototype,"parent",{enumerable:!0,get:function(){if(_.isBuffer(this))return this.buffer}}),Object.defineProperty(_.prototype,"offset",{enumerable:!0,get:function(){if(_.isBuffer(this))return this.byteOffset}});function p(o){if(o>c)throw new RangeError('The value "'+o+'" is invalid for option "size"');const e=new Uint8Array(o);return Object.setPrototypeOf(e,_.prototype),e}function _(o,e,t){if(typeof o=="number"){if(typeof e=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return S(o)}return h(o,e,t)}_.poolSize=8192;function h(o,e,t){if(typeof o=="string")return y(o,e);if(ArrayBuffer.isView(o))return L(o);if(o==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof o);if(z(o,ArrayBuffer)||o&&z(o.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(z(o,SharedArrayBuffer)||o&&z(o.buffer,SharedArrayBuffer)))return W(o,e,t);if(typeof o=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');const s=o.valueOf&&o.valueOf();if(s!=null&&s!==o)return _.from(s,e,t);const l=ge(o);if(l)return l;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof o[Symbol.toPrimitive]=="function")return _.from(o[Symbol.toPrimitive]("string"),e,t);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof o)}_.from=function(o,e,t){return h(o,e,t)},Object.setPrototypeOf(_.prototype,Uint8Array.prototype),Object.setPrototypeOf(_,Uint8Array);function w(o){if(typeof o!="number")throw new TypeError('"size" argument must be of type number');if(o<0)throw new RangeError('The value "'+o+'" is invalid for option "size"')}function m(o,e,t){return w(o),o<=0?p(o):e!==void 0?typeof t=="string"?p(o).fill(e,t):p(o).fill(e):p(o)}_.alloc=function(o,e,t){return m(o,e,t)};function S(o){return w(o),p(o<0?0:re(o)|0)}_.allocUnsafe=function(o){return S(o)},_.allocUnsafeSlow=function(o){return S(o)};function y(o,e){if((typeof e!="string"||e==="")&&(e="utf8"),!_.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const t=oe(o,e)|0;let s=p(t);const l=s.write(o,e);return l!==t&&(s=s.slice(0,l)),s}function A(o){const e=o.length<0?0:re(o.length)|0,t=p(e);for(let s=0;s<e;s+=1)t[s]=o[s]&255;return t}function L(o){if(z(o,Uint8Array)){const e=new Uint8Array(o);return W(e.buffer,e.byteOffset,e.byteLength)}return A(o)}function W(o,e,t){if(e<0||o.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(o.byteLength<e+(t||0))throw new RangeError('"length" is outside of buffer bounds');let s;return e===void 0&&t===void 0?s=new Uint8Array(o):t===void 0?s=new Uint8Array(o,e):s=new Uint8Array(o,e,t),Object.setPrototypeOf(s,_.prototype),s}function ge(o){if(_.isBuffer(o)){const e=re(o.length)|0,t=p(e);return t.length===0||o.copy(t,0,0,e),t}if(o.length!==void 0)return typeof o.length!="number"||Le(o.length)?p(0):A(o);if(o.type==="Buffer"&&Array.isArray(o.data))return A(o.data)}function re(o){if(o>=c)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+c.toString(16)+" bytes");return o|0}function Te(o){return+o!=o&&(o=0),_.alloc(+o)}_.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==_.prototype},_.compare=function(e,t){if(z(e,Uint8Array)&&(e=_.from(e,e.offset,e.byteLength)),z(t,Uint8Array)&&(t=_.from(t,t.offset,t.byteLength)),!_.isBuffer(e)||!_.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let s=e.length,l=t.length;for(let d=0,f=Math.min(s,l);d<f;++d)if(e[d]!==t[d]){s=e[d],l=t[d];break}return s<l?-1:l<s?1:0},_.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},_.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return _.alloc(0);let s;if(t===void 0)for(t=0,s=0;s<e.length;++s)t+=e[s].length;const l=_.allocUnsafe(t);let d=0;for(s=0;s<e.length;++s){let f=e[s];if(z(f,Uint8Array))d+f.length>l.length?(_.isBuffer(f)||(f=_.from(f)),f.copy(l,d)):Uint8Array.prototype.set.call(l,f,d);else if(_.isBuffer(f))f.copy(l,d);else throw new TypeError('"list" argument must be an Array of Buffers');d+=f.length}return l};function oe(o,e){if(_.isBuffer(o))return o.length;if(ArrayBuffer.isView(o)||z(o,ArrayBuffer))return o.byteLength;if(typeof o!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof o);const t=o.length,s=arguments.length>2&&arguments[2]===!0;if(!s&&t===0)return 0;let l=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return t;case"utf8":case"utf-8":return Ie(o).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return t*2;case"hex":return t>>>1;case"base64":return Qe(o).length;default:if(l)return s?-1:Ie(o).length;e=(""+e).toLowerCase(),l=!0}}_.byteLength=oe;function He(o,e,t){let s=!1;if((e===void 0||e<0)&&(e=0),e>this.length||((t===void 0||t>this.length)&&(t=this.length),t<=0)||(t>>>=0,e>>>=0,t<=e))return"";for(o||(o="utf8");;)switch(o){case"hex":return kt(this,e,t);case"utf8":case"utf-8":return Q(this,e,t);case"ascii":return Pt(this,e,t);case"latin1":case"binary":return Wt(this,e,t);case"base64":return B(this,e,t);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Ft(this,e,t);default:if(s)throw new TypeError("Unknown encoding: "+o);o=(o+"").toLowerCase(),s=!0}}_.prototype._isBuffer=!0;function j(o,e,t){const s=o[e];o[e]=o[t],o[t]=s}_.prototype.swap16=function(){const e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)j(this,t,t+1);return this},_.prototype.swap32=function(){const e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)j(this,t,t+3),j(this,t+1,t+2);return this},_.prototype.swap64=function(){const e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)j(this,t,t+7),j(this,t+1,t+6),j(this,t+2,t+5),j(this,t+3,t+4);return this},_.prototype.toString=function(){const e=this.length;return e===0?"":arguments.length===0?Q(this,0,e):He.apply(this,arguments)},_.prototype.toLocaleString=_.prototype.toString,_.prototype.equals=function(e){if(!_.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:_.compare(this,e)===0},_.prototype.inspect=function(){let e="";const t=n.INSPECT_MAX_BYTES;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"},a&&(_.prototype[a]=_.prototype.inspect),_.prototype.compare=function(e,t,s,l,d){if(z(e,Uint8Array)&&(e=_.from(e,e.offset,e.byteLength)),!_.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(t===void 0&&(t=0),s===void 0&&(s=e?e.length:0),l===void 0&&(l=0),d===void 0&&(d=this.length),t<0||s>e.length||l<0||d>this.length)throw new RangeError("out of range index");if(l>=d&&t>=s)return 0;if(l>=d)return-1;if(t>=s)return 1;if(t>>>=0,s>>>=0,l>>>=0,d>>>=0,this===e)return 0;let f=d-l,g=s-t;const b=Math.min(f,g),x=this.slice(l,d),D=e.slice(t,s);for(let I=0;I<b;++I)if(x[I]!==D[I]){f=x[I],g=D[I];break}return f<g?-1:g<f?1:0};function se(o,e,t,s,l){if(o.length===0)return-1;if(typeof t=="string"?(s=t,t=0):t>2147483647?t=2147483647:t<-2147483648&&(t=-2147483648),t=+t,Le(t)&&(t=l?0:o.length-1),t<0&&(t=o.length+t),t>=o.length){if(l)return-1;t=o.length-1}else if(t<0)if(l)t=0;else return-1;if(typeof e=="string"&&(e=_.from(e,s)),_.isBuffer(e))return e.length===0?-1:ae(o,e,t,s,l);if(typeof e=="number")return e=e&255,typeof Uint8Array.prototype.indexOf=="function"?l?Uint8Array.prototype.indexOf.call(o,e,t):Uint8Array.prototype.lastIndexOf.call(o,e,t):ae(o,[e],t,s,l);throw new TypeError("val must be string, number or Buffer")}function ae(o,e,t,s,l){let d=1,f=o.length,g=e.length;if(s!==void 0&&(s=String(s).toLowerCase(),s==="ucs2"||s==="ucs-2"||s==="utf16le"||s==="utf-16le")){if(o.length<2||e.length<2)return-1;d=2,f/=2,g/=2,t/=2}function b(D,I){return d===1?D[I]:D.readUInt16BE(I*d)}let x;if(l){let D=-1;for(x=t;x<f;x++)if(b(o,x)===b(e,D===-1?0:x-D)){if(D===-1&&(D=x),x-D+1===g)return D*d}else D!==-1&&(x-=x-D),D=-1}else for(t+g>f&&(t=f-g),x=t;x>=0;x--){let D=!0;for(let I=0;I<g;I++)if(b(o,x+I)!==b(e,I)){D=!1;break}if(D)return x}return-1}_.prototype.includes=function(e,t,s){return this.indexOf(e,t,s)!==-1},_.prototype.indexOf=function(e,t,s){return se(this,e,t,s,!0)},_.prototype.lastIndexOf=function(e,t,s){return se(this,e,t,s,!1)};function E(o,e,t,s){t=Number(t)||0;const l=o.length-t;s?(s=Number(s),s>l&&(s=l)):s=l;const d=e.length;s>d/2&&(s=d/2);let f;for(f=0;f<s;++f){const g=parseInt(e.substr(f*2,2),16);if(Le(g))return f;o[t+f]=g}return f}function P(o,e,t,s){return ce(Ie(e,o.length-t),o,t,s)}function C(o,e,t,s){return ce(Ut(e),o,t,s)}function T(o,e,t,s){return ce(Qe(e),o,t,s)}function H(o,e,t,s){return ce(Nt(e,o.length-t),o,t,s)}_.prototype.write=function(e,t,s,l){if(t===void 0)l="utf8",s=this.length,t=0;else if(s===void 0&&typeof t=="string")l=t,s=this.length,t=0;else if(isFinite(t))t=t>>>0,isFinite(s)?(s=s>>>0,l===void 0&&(l="utf8")):(l=s,s=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");const d=this.length-t;if((s===void 0||s>d)&&(s=d),e.length>0&&(s<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");l||(l="utf8");let f=!1;for(;;)switch(l){case"hex":return E(this,e,t,s);case"utf8":case"utf-8":return P(this,e,t,s);case"ascii":case"latin1":case"binary":return C(this,e,t,s);case"base64":return T(this,e,t,s);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return H(this,e,t,s);default:if(f)throw new TypeError("Unknown encoding: "+l);l=(""+l).toLowerCase(),f=!0}},_.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function B(o,e,t){return e===0&&t===o.length?r.fromByteArray(o):r.fromByteArray(o.slice(e,t))}function Q(o,e,t){t=Math.min(o.length,t);const s=[];let l=e;for(;l<t;){const d=o[l];let f=null,g=d>239?4:d>223?3:d>191?2:1;if(l+g<=t){let b,x,D,I;switch(g){case 1:d<128&&(f=d);break;case 2:b=o[l+1],(b&192)===128&&(I=(d&31)<<6|b&63,I>127&&(f=I));break;case 3:b=o[l+1],x=o[l+2],(b&192)===128&&(x&192)===128&&(I=(d&15)<<12|(b&63)<<6|x&63,I>2047&&(I<55296||I>57343)&&(f=I));break;case 4:b=o[l+1],x=o[l+2],D=o[l+3],(b&192)===128&&(x&192)===128&&(D&192)===128&&(I=(d&15)<<18|(b&63)<<12|(x&63)<<6|D&63,I>65535&&I<1114112&&(f=I))}}f===null?(f=65533,g=1):f>65535&&(f-=65536,s.push(f>>>10&1023|55296),f=56320|f&1023),s.push(f),l+=g}return Rt(s)}const Oe=4096;function Rt(o){const e=o.length;if(e<=Oe)return String.fromCharCode.apply(String,o);let t="",s=0;for(;s<e;)t+=String.fromCharCode.apply(String,o.slice(s,s+=Oe));return t}function Pt(o,e,t){let s="";t=Math.min(o.length,t);for(let l=e;l<t;++l)s+=String.fromCharCode(o[l]&127);return s}function Wt(o,e,t){let s="";t=Math.min(o.length,t);for(let l=e;l<t;++l)s+=String.fromCharCode(o[l]);return s}function kt(o,e,t){const s=o.length;(!e||e<0)&&(e=0),(!t||t<0||t>s)&&(t=s);let l="";for(let d=e;d<t;++d)l+=Ot[o[d]];return l}function Ft(o,e,t){const s=o.slice(e,t);let l="";for(let d=0;d<s.length-1;d+=2)l+=String.fromCharCode(s[d]+s[d+1]*256);return l}_.prototype.slice=function(e,t){const s=this.length;e=~~e,t=t===void 0?s:~~t,e<0?(e+=s,e<0&&(e=0)):e>s&&(e=s),t<0?(t+=s,t<0&&(t=0)):t>s&&(t=s),t<e&&(t=e);const l=this.subarray(e,t);return Object.setPrototypeOf(l,_.prototype),l};function R(o,e,t){if(o%1!==0||o<0)throw new RangeError("offset is not uint");if(o+e>t)throw new RangeError("Trying to access beyond buffer length")}_.prototype.readUintLE=_.prototype.readUIntLE=function(e,t,s){e=e>>>0,t=t>>>0,s||R(e,t,this.length);let l=this[e],d=1,f=0;for(;++f<t&&(d*=256);)l+=this[e+f]*d;return l},_.prototype.readUintBE=_.prototype.readUIntBE=function(e,t,s){e=e>>>0,t=t>>>0,s||R(e,t,this.length);let l=this[e+--t],d=1;for(;t>0&&(d*=256);)l+=this[e+--t]*d;return l},_.prototype.readUint8=_.prototype.readUInt8=function(e,t){return e=e>>>0,t||R(e,1,this.length),this[e]},_.prototype.readUint16LE=_.prototype.readUInt16LE=function(e,t){return e=e>>>0,t||R(e,2,this.length),this[e]|this[e+1]<<8},_.prototype.readUint16BE=_.prototype.readUInt16BE=function(e,t){return e=e>>>0,t||R(e,2,this.length),this[e]<<8|this[e+1]},_.prototype.readUint32LE=_.prototype.readUInt32LE=function(e,t){return e=e>>>0,t||R(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216},_.prototype.readUint32BE=_.prototype.readUInt32BE=function(e,t){return e=e>>>0,t||R(e,4,this.length),this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])},_.prototype.readBigUInt64LE=Y(function(e){e=e>>>0,Z(e,"offset");const t=this[e],s=this[e+7];(t===void 0||s===void 0)&&ie(e,this.length-8);const l=t+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24,d=this[++e]+this[++e]*2**8+this[++e]*2**16+s*2**24;return BigInt(l)+(BigInt(d)<<BigInt(32))}),_.prototype.readBigUInt64BE=Y(function(e){e=e>>>0,Z(e,"offset");const t=this[e],s=this[e+7];(t===void 0||s===void 0)&&ie(e,this.length-8);const l=t*2**24+this[++e]*2**16+this[++e]*2**8+this[++e],d=this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+s;return(BigInt(l)<<BigInt(32))+BigInt(d)}),_.prototype.readIntLE=function(e,t,s){e=e>>>0,t=t>>>0,s||R(e,t,this.length);let l=this[e],d=1,f=0;for(;++f<t&&(d*=256);)l+=this[e+f]*d;return d*=128,l>=d&&(l-=Math.pow(2,8*t)),l},_.prototype.readIntBE=function(e,t,s){e=e>>>0,t=t>>>0,s||R(e,t,this.length);let l=t,d=1,f=this[e+--l];for(;l>0&&(d*=256);)f+=this[e+--l]*d;return d*=128,f>=d&&(f-=Math.pow(2,8*t)),f},_.prototype.readInt8=function(e,t){return e=e>>>0,t||R(e,1,this.length),this[e]&128?(255-this[e]+1)*-1:this[e]},_.prototype.readInt16LE=function(e,t){e=e>>>0,t||R(e,2,this.length);const s=this[e]|this[e+1]<<8;return s&32768?s|4294901760:s},_.prototype.readInt16BE=function(e,t){e=e>>>0,t||R(e,2,this.length);const s=this[e+1]|this[e]<<8;return s&32768?s|4294901760:s},_.prototype.readInt32LE=function(e,t){return e=e>>>0,t||R(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},_.prototype.readInt32BE=function(e,t){return e=e>>>0,t||R(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},_.prototype.readBigInt64LE=Y(function(e){e=e>>>0,Z(e,"offset");const t=this[e],s=this[e+7];(t===void 0||s===void 0)&&ie(e,this.length-8);const l=this[e+4]+this[e+5]*2**8+this[e+6]*2**16+(s<<24);return(BigInt(l)<<BigInt(32))+BigInt(t+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24)}),_.prototype.readBigInt64BE=Y(function(e){e=e>>>0,Z(e,"offset");const t=this[e],s=this[e+7];(t===void 0||s===void 0)&&ie(e,this.length-8);const l=(t<<24)+this[++e]*2**16+this[++e]*2**8+this[++e];return(BigInt(l)<<BigInt(32))+BigInt(this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+s)}),_.prototype.readFloatLE=function(e,t){return e=e>>>0,t||R(e,4,this.length),i.read(this,e,!0,23,4)},_.prototype.readFloatBE=function(e,t){return e=e>>>0,t||R(e,4,this.length),i.read(this,e,!1,23,4)},_.prototype.readDoubleLE=function(e,t){return e=e>>>0,t||R(e,8,this.length),i.read(this,e,!0,52,8)},_.prototype.readDoubleBE=function(e,t){return e=e>>>0,t||R(e,8,this.length),i.read(this,e,!1,52,8)};function K(o,e,t,s,l,d){if(!_.isBuffer(o))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>l||e<d)throw new RangeError('"value" argument is out of bounds');if(t+s>o.length)throw new RangeError("Index out of range")}_.prototype.writeUintLE=_.prototype.writeUIntLE=function(e,t,s,l){if(e=+e,t=t>>>0,s=s>>>0,!l){const g=Math.pow(2,8*s)-1;K(this,e,t,s,g,0)}let d=1,f=0;for(this[t]=e&255;++f<s&&(d*=256);)this[t+f]=e/d&255;return t+s},_.prototype.writeUintBE=_.prototype.writeUIntBE=function(e,t,s,l){if(e=+e,t=t>>>0,s=s>>>0,!l){const g=Math.pow(2,8*s)-1;K(this,e,t,s,g,0)}let d=s-1,f=1;for(this[t+d]=e&255;--d>=0&&(f*=256);)this[t+d]=e/f&255;return t+s},_.prototype.writeUint8=_.prototype.writeUInt8=function(e,t,s){return e=+e,t=t>>>0,s||K(this,e,t,1,255,0),this[t]=e&255,t+1},_.prototype.writeUint16LE=_.prototype.writeUInt16LE=function(e,t,s){return e=+e,t=t>>>0,s||K(this,e,t,2,65535,0),this[t]=e&255,this[t+1]=e>>>8,t+2},_.prototype.writeUint16BE=_.prototype.writeUInt16BE=function(e,t,s){return e=+e,t=t>>>0,s||K(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=e&255,t+2},_.prototype.writeUint32LE=_.prototype.writeUInt32LE=function(e,t,s){return e=+e,t=t>>>0,s||K(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=e&255,t+4},_.prototype.writeUint32BE=_.prototype.writeUInt32BE=function(e,t,s){return e=+e,t=t>>>0,s||K(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e&255,t+4};function Ge(o,e,t,s,l){Je(e,s,l,o,t,7);let d=Number(e&BigInt(4294967295));o[t++]=d,d=d>>8,o[t++]=d,d=d>>8,o[t++]=d,d=d>>8,o[t++]=d;let f=Number(e>>BigInt(32)&BigInt(4294967295));return o[t++]=f,f=f>>8,o[t++]=f,f=f>>8,o[t++]=f,f=f>>8,o[t++]=f,t}function ze(o,e,t,s,l){Je(e,s,l,o,t,7);let d=Number(e&BigInt(4294967295));o[t+7]=d,d=d>>8,o[t+6]=d,d=d>>8,o[t+5]=d,d=d>>8,o[t+4]=d;let f=Number(e>>BigInt(32)&BigInt(4294967295));return o[t+3]=f,f=f>>8,o[t+2]=f,f=f>>8,o[t+1]=f,f=f>>8,o[t]=f,t+8}_.prototype.writeBigUInt64LE=Y(function(e,t=0){return Ge(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),_.prototype.writeBigUInt64BE=Y(function(e,t=0){return ze(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),_.prototype.writeIntLE=function(e,t,s,l){if(e=+e,t=t>>>0,!l){const b=Math.pow(2,8*s-1);K(this,e,t,s,b-1,-b)}let d=0,f=1,g=0;for(this[t]=e&255;++d<s&&(f*=256);)e<0&&g===0&&this[t+d-1]!==0&&(g=1),this[t+d]=(e/f>>0)-g&255;return t+s},_.prototype.writeIntBE=function(e,t,s,l){if(e=+e,t=t>>>0,!l){const b=Math.pow(2,8*s-1);K(this,e,t,s,b-1,-b)}let d=s-1,f=1,g=0;for(this[t+d]=e&255;--d>=0&&(f*=256);)e<0&&g===0&&this[t+d+1]!==0&&(g=1),this[t+d]=(e/f>>0)-g&255;return t+s},_.prototype.writeInt8=function(e,t,s){return e=+e,t=t>>>0,s||K(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=e&255,t+1},_.prototype.writeInt16LE=function(e,t,s){return e=+e,t=t>>>0,s||K(this,e,t,2,32767,-32768),this[t]=e&255,this[t+1]=e>>>8,t+2},_.prototype.writeInt16BE=function(e,t,s){return e=+e,t=t>>>0,s||K(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=e&255,t+2},_.prototype.writeInt32LE=function(e,t,s){return e=+e,t=t>>>0,s||K(this,e,t,4,2147483647,-2147483648),this[t]=e&255,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},_.prototype.writeInt32BE=function(e,t,s){return e=+e,t=t>>>0,s||K(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e&255,t+4},_.prototype.writeBigInt64LE=Y(function(e,t=0){return Ge(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),_.prototype.writeBigInt64BE=Y(function(e,t=0){return ze(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function qe(o,e,t,s,l,d){if(t+s>o.length)throw new RangeError("Index out of range");if(t<0)throw new RangeError("Index out of range")}function je(o,e,t,s,l){return e=+e,t=t>>>0,l||qe(o,e,t,4),i.write(o,e,t,s,23,4),t+4}_.prototype.writeFloatLE=function(e,t,s){return je(this,e,t,!0,s)},_.prototype.writeFloatBE=function(e,t,s){return je(this,e,t,!1,s)};function Ve(o,e,t,s,l){return e=+e,t=t>>>0,l||qe(o,e,t,8),i.write(o,e,t,s,52,8),t+8}_.prototype.writeDoubleLE=function(e,t,s){return Ve(this,e,t,!0,s)},_.prototype.writeDoubleBE=function(e,t,s){return Ve(this,e,t,!1,s)},_.prototype.copy=function(e,t,s,l){if(!_.isBuffer(e))throw new TypeError("argument should be a Buffer");if(s||(s=0),!l&&l!==0&&(l=this.length),t>=e.length&&(t=e.length),t||(t=0),l>0&&l<s&&(l=s),l===s||e.length===0||this.length===0)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(s<0||s>=this.length)throw new RangeError("Index out of range");if(l<0)throw new RangeError("sourceEnd out of bounds");l>this.length&&(l=this.length),e.length-t<l-s&&(l=e.length-t+s);const d=l-s;return this===e&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(t,s,l):Uint8Array.prototype.set.call(e,this.subarray(s,l),t),d},_.prototype.fill=function(e,t,s,l){if(typeof e=="string"){if(typeof t=="string"?(l=t,t=0,s=this.length):typeof s=="string"&&(l=s,s=this.length),l!==void 0&&typeof l!="string")throw new TypeError("encoding must be a string");if(typeof l=="string"&&!_.isEncoding(l))throw new TypeError("Unknown encoding: "+l);if(e.length===1){const f=e.charCodeAt(0);(l==="utf8"&&f<128||l==="latin1")&&(e=f)}}else typeof e=="number"?e=e&255:typeof e=="boolean"&&(e=Number(e));if(t<0||this.length<t||this.length<s)throw new RangeError("Out of range index");if(s<=t)return this;t=t>>>0,s=s===void 0?this.length:s>>>0,e||(e=0);let d;if(typeof e=="number")for(d=t;d<s;++d)this[d]=e;else{const f=_.isBuffer(e)?e:_.from(e,l),g=f.length;if(g===0)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(d=0;d<s-t;++d)this[d+t]=f[d%g]}return this};const X={};function $e(o,e,t){X[o]=class extends t{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${o}]`,this.stack,delete this.name}get code(){return o}set code(l){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:l,writable:!0})}toString(){return`${this.name} [${o}]: ${this.message}`}}}$e("ERR_BUFFER_OUT_OF_BOUNDS",function(o){return o?`${o} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),$e("ERR_INVALID_ARG_TYPE",function(o,e){return`The "${o}" argument must be of type number. Received type ${typeof e}`},TypeError),$e("ERR_OUT_OF_RANGE",function(o,e,t){let s=`The value of "${o}" is out of range.`,l=t;return Number.isInteger(t)&&Math.abs(t)>2**32?l=Ye(String(t)):typeof t=="bigint"&&(l=String(t),(t>BigInt(2)**BigInt(32)||t<-(BigInt(2)**BigInt(32)))&&(l=Ye(l)),l+="n"),s+=` It must be ${e}. Received ${l}`,s},RangeError);function Ye(o){let e="",t=o.length;const s=o[0]==="-"?1:0;for(;t>=s+4;t-=3)e=`_${o.slice(t-3,t)}${e}`;return`${o.slice(0,t)}${e}`}function Kt(o,e,t){Z(e,"offset"),(o[e]===void 0||o[e+t]===void 0)&&ie(e,o.length-(t+1))}function Je(o,e,t,s,l,d){if(o>t||o<e){const f=typeof e=="bigint"?"n":"";let g;throw d>3?e===0||e===BigInt(0)?g=`>= 0${f} and < 2${f} ** ${(d+1)*8}${f}`:g=`>= -(2${f} ** ${(d+1)*8-1}${f}) and < 2 ** ${(d+1)*8-1}${f}`:g=`>= ${e}${f} and <= ${t}${f}`,new X.ERR_OUT_OF_RANGE("value",g,o)}Kt(s,l,d)}function Z(o,e){if(typeof o!="number")throw new X.ERR_INVALID_ARG_TYPE(e,"number",o)}function ie(o,e,t){throw Math.floor(o)!==o?(Z(o,t),new X.ERR_OUT_OF_RANGE(t||"offset","an integer",o)):e<0?new X.ERR_BUFFER_OUT_OF_BOUNDS:new X.ERR_OUT_OF_RANGE(t||"offset",`>= ${t?1:0} and <= ${e}`,o)}const vt=/[^+/0-9A-Za-z-_]/g;function Mt(o){if(o=o.split("=")[0],o=o.trim().replace(vt,""),o.length<2)return"";for(;o.length%4!==0;)o=o+"=";return o}function Ie(o,e){e=e||1/0;let t;const s=o.length;let l=null;const d=[];for(let f=0;f<s;++f){if(t=o.charCodeAt(f),t>55295&&t<57344){if(!l){if(t>56319){(e-=3)>-1&&d.push(239,191,189);continue}else if(f+1===s){(e-=3)>-1&&d.push(239,191,189);continue}l=t;continue}if(t<56320){(e-=3)>-1&&d.push(239,191,189),l=t;continue}t=(l-55296<<10|t-56320)+65536}else l&&(e-=3)>-1&&d.push(239,191,189);if(l=null,t<128){if((e-=1)<0)break;d.push(t)}else if(t<2048){if((e-=2)<0)break;d.push(t>>6|192,t&63|128)}else if(t<65536){if((e-=3)<0)break;d.push(t>>12|224,t>>6&63|128,t&63|128)}else if(t<1114112){if((e-=4)<0)break;d.push(t>>18|240,t>>12&63|128,t>>6&63|128,t&63|128)}else throw new Error("Invalid code point")}return d}function Ut(o){const e=[];for(let t=0;t<o.length;++t)e.push(o.charCodeAt(t)&255);return e}function Nt(o,e){let t,s,l;const d=[];for(let f=0;f<o.length&&!((e-=2)<0);++f)t=o.charCodeAt(f),s=t>>8,l=t%256,d.push(l),d.push(s);return d}function Qe(o){return r.toByteArray(Mt(o))}function ce(o,e,t,s){let l;for(l=0;l<s&&!(l+t>=e.length||l>=o.length);++l)e[l+t]=o[l];return l}function z(o,e){return o instanceof e||o!=null&&o.constructor!=null&&o.constructor.name!=null&&o.constructor.name===e.name}function Le(o){return o!==o}const Ot=function(){const o="0123456789abcdef",e=new Array(256);for(let t=0;t<16;++t){const s=t*16;for(let l=0;l<16;++l)e[s+l]=o[t]+o[l]}return e}();function Y(o){return typeof BigInt>"u"?Gt:o}function Gt(){throw new Error("BigInt not supported")}})(bt);class Ne extends Me{constructor(r,i,a,c){super(`Object ${r} ${c?`at ${c}`:""}was anticipated to be a ${a} but it is a ${i}.`),this.code=this.name=Ne.code,this.data={oid:r,actual:i,expected:a,filepath:c}}}Ne.code="ObjectTypeError";typeof window<"u"&&(window.Buffer=bt.Buffer);const{wpCLI:Kr,...it}=Lr;({...it,importFile:it.importWxr});async function vr(n,r){await Ce(n,{consts:{USE_FETCH_FOR_REQUESTS:!0}}),await n.onMessage(async i=>{let a;try{a=JSON.parse(i)}catch{return""}const{type:c,data:u}=a;if(c!=="request")return"";u.headers?Array.isArray(u.headers)&&(u.headers=Object.fromEntries(u.headers)):u.headers={},new URL(u.url).hostname===window.location.hostname&&(u.headers["x-request-issuer"]="php");const _=r?.corsProxyUrl;return Mr(u,(h,w)=>Pn(h,w,_))})}async function Mr(n,r=fetch){let i;try{const h=n.method||"GET",w=n.headers||{},m=Object.keys(w).some(S=>S.toLowerCase()==="content-type");h=="POST"&&!m&&(w["Content-Type"]="application/x-www-form-urlencoded"),i=await r(n.url,{method:h,headers:w,body:h==="GET"?void 0:n.data,credentials:"omit"})}catch{return new TextEncoder().encode(`HTTP/1.1 400 Invalid Request\r
content-type: text/plain\r
\r
Playground could not serve the request.`)}const a=[];i.headers.forEach((h,w)=>{a.push(w+": "+h)});const c=["HTTP/1.1 "+i.status+" "+i.statusText,...a].join(`\r
`)+`\r
\r
`,u=new TextEncoder().encode(c),p=new Uint8Array(await i.arrayBuffer()),_=new Uint8Array(u.byteLength+p.byteLength);return _.set(u),_.set(p,u.byteLength),_}const Bt=new URL("/",(import.meta||{}).url).origin,Ur=new URL(Vn,Bt)+"",Nr=new URL(Yn,Bt),Or=new URL(document.location.href).searchParams;async function Gr(){qr();const n=Or.has("progressbar");let r;n&&(r=new jn,document.body.prepend(r.element));const i=navigator.serviceWorker;if(!i)throw window.isSecureContext?new et("Service workers are not supported in your browser."):new et("WordPress Playground uses service workers and may only work on HTTPS and http://localhost/ sites, but the current site is neither.");const a=await i.register(Nr+"",{type:"module",updateViaCache:"none"});try{await a.update()}catch(m){U.error("Failed to update service worker.",m)}const c=Cn(await kn(Ur)),u=document.querySelector("#wp"),p={async onDownloadProgress(m){return c.onDownloadProgress(m)},async journalFSEvents(m,S){return c.journalFSEvents(m,S)},async replayFSJournal(m){return c.replayFSJournal(m)},async addEventListener(m,S){return await c.addEventListener(m,S)},async removeEventListener(m,S){return await c.removeEventListener(m,S)},async setProgress(m){if(!r)throw new Error("Progress bar not available");r.setOptions(m)},async setLoaded(){if(!r)throw new Error("Progress bar not available");r.destroy()},async onNavigation(m){u.addEventListener("load",async S=>{try{const y=S.currentTarget.contentWindow;await new Promise(L=>setTimeout(L,0));const A=await w.internalUrlToPath(y.location.href);m(A)}catch{}})},async goTo(m){m.startsWith("/")||(m="/"+m),m==="/wp-admin"&&(m="/wp-admin/");const S=await w.pathToInternalUrl(m),y=u.src;if(S===y&&u.contentWindow)try{u.contentWindow.location.href=S;return}catch{}u.src=S},async getCurrentURL(){let m="";try{m=u.contentWindow.location.href}catch{}return m||(m=u.src),await w.internalUrlToPath(m)},async setIframeSandboxFlags(m){u.setAttribute("sandbox",m.join(" "))},async onMessage(m){return await c.onMessage(m)},async mountOpfs(m,S){return await c.mountOpfs(m,S)},async unmountOpfs(m){return await c.unmountOpfs(m)},async backfillStaticFilesRemovedFromMinifiedBuild(){await c.backfillStaticFilesRemovedFromMinifiedBuild()},async hasCachedStaticFilesRemovedFromMinifiedBuild(){return await c.hasCachedStaticFilesRemovedFromMinifiedBuild()},async boot(m){await c.boot(m),navigator.serviceWorker.addEventListener("message",async function(y){if(m.scope&&y.data.scope!==m.scope)return;const A=y.data.args||[],L=y.data.method,W=await c[L](...A);y.source.postMessage(Bn(y.data.requestId,W))}),i.startMessages();try{await c.isReady(),Wn(u,zr(await w.absoluteUrl)),m.withNetworking&&await vr(c,{corsProxyUrl:m.corsProxyUrl}),_()}catch(S){throw h(S),S}await p.hasCachedStaticFilesRemovedFromMinifiedBuild()?await p.backfillStaticFilesRemovedFromMinifiedBuild():u.addEventListener("load",()=>{p.backfillStaticFilesRemovedFromMinifiedBuild()})}};await c.isConnected();const[_,h,w]=An(p,c);return w}function zr(n){return new URL(n,"https://example.com").origin}function qr(){let n=!1;try{n=window.parent!==window&&window.parent.IS_WASM_WORDPRESS}catch{}if(n)throw new Error(`The service worker did not load correctly. This is a bug,
			please report it on https://github.com/WordPress/wordpress-playground/issues`);window.IS_WASM_WORDPRESS=!0}const jr="nightly",Vr="6.7.1-RC1",Yr={nightly:jr,beta:Vr,"6.7":"6.7.1","6.6":"6.6.2","6.5":"6.5.5","6.4":"6.4.5","6.3":"6.3.5"},Jr=Object.keys(Yr);Jr.filter(n=>n.match(/^\d/))[0];window.top!=window.self&&document.body.classList.add("is-embedded");try{window.playground=await Gr()}catch(n){console.error(n),document.body.className="has-error",document.body.innerHTML="",n?.name==="NotSupportedError"?document.body.append(await Xr()):document.body.append(Qr(n))}finally{document.body.classList.remove("is-loading")}function Qr(n){const r=document.createDocumentFragment(),i=document.createElement("div");i.className="error-message";const a=n.userFriendlyMessage||"See the developer tools for error details.";i.innerHTML="Ooops! WordPress Playground had a hiccup! <br/><br/> "+a,r.append(i);const c=document.createElement("button");c.innerText="Try again",c.onclick=()=>{window.location.reload()},r.append(c);const u=document.createElement("p");return u.innerHTML=`
					If the problem persists, please
					<a href="https://github.com/WordPress/playground-tools/issues/new"
						target="_blank"
						>report an issue on GitHub</a>.
				`,r.append(u),r}async function Xr(){const n=document.createDocumentFragment();let r=!1;try{const{state:i}=await navigator.permissions.query({name:"storage-access"});r=i==="granted"}catch{}if(r||!("requestStorageAccess"in document)){const i=document.createElement("div");i.innerText="It looks like you have disabled third-party cookies in your browser. This also disables the Service Worker API used by WordPress Playground. Please re-enable third-party cookies and try again.",n.append(i);const a=document.createElement("button");a.innerText="Try again",a.onclick=()=>{window.location.reload()},n.append(a)}else{const i=document.createElement("div");i.innerText="WordPress Playground needs to use storage in your browser.",n.append(i);const a=document.createElement("button");a.innerText="Allow storage access",n.append(a),a.onclick=async()=>{try{await document.requestStorageAccess(),window.location.reload()}catch{i.innerHTML=`
								<p>
									Oops! Playground failed to start. Here's what to do:
								</p>

								<h3>Did you disable third-party cookies?</h3>
								<p>
									It also disables the required Service Worker API. Please re-enable
									third-party cookies and try again.
								</p>

								<h3>Did you refuse to grant Playground storage access?</h3>
								<p>
									Click the button below and grant storage access. Note the button may
									not work if you have disabled third-party cookies in your browser.
								</p>
								<p>
									If neither method helped, please
									<a href="https://github.com/WordPress/playground-tools/issues/new"
										target="_blank">
										report an issue on GitHub
									</a>.
								</p>
								`}}}return n}
//# sourceMappingURL=wordpress-235dee24.js.map
