(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(n){if(n.ep)return;n.ep=!0;const l=s(n);fetch(n.href,l)}})();let R=I;const w=1,A=2,G={owned:null,cleanups:null,context:null,owner:null};var c=null;let U=null,j=null,d=null,p=null,g=null,C=0;function z(e,t){const s=d,o=c,n=e.length===0,l=t===void 0?o:t,r=n?G:{owned:null,cleanups:null,context:l?l.context:null,owner:l},i=n?e:()=>e(()=>E(()=>_(r)));c=r,d=null;try{return v(i,!0)}finally{d=s,c=o}}function m(e,t,s){const o=K(e,t,!1,w);M(o)}function E(e){if(d===null)return e();const t=d;d=null;try{return e()}finally{d=t}}function q(e,t,s){let o=e.value;return(!e.comparator||!e.comparator(o,t))&&(e.value=t,e.observers&&e.observers.length&&v(()=>{for(let n=0;n<e.observers.length;n+=1){const l=e.observers[n],r=U&&U.running;r&&U.disposed.has(l),(r?!l.tState:!l.state)&&(l.pure?p.push(l):g.push(l),l.observers&&$(l)),r||(l.state=w)}if(p.length>1e6)throw p=[],new Error},!1)),t}function M(e){if(!e.fn)return;_(e);const t=C;H(e,e.value,t)}function H(e,t,s){let o;const n=c,l=d;d=c=e;try{o=e.fn(t)}catch(r){return e.pure&&(e.state=w,e.owned&&e.owned.forEach(_),e.owned=null),e.updatedAt=s+1,D(r)}finally{d=l,c=n}(!e.updatedAt||e.updatedAt<=s)&&(e.updatedAt!=null&&"observers"in e?q(e,o):e.value=o,e.updatedAt=s)}function K(e,t,s,o=w,n){const l={fn:e,state:o,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:c,context:c?c.context:null,pure:s};return c===null||c!==G&&(c.owned?c.owned.push(l):c.owned=[l]),l}function P(e){if(e.state===0)return;if(e.state===A)return L(e);if(e.suspense&&E(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<C);)e.state&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===w)M(e);else if(e.state===A){const o=p;p=null,v(()=>L(e,t[0]),!1),p=o}}function v(e,t){if(p)return e();let s=!1;t||(p=[]),g?s=!0:g=[],C++;try{const o=e();return Q(s),o}catch(o){s||(g=null),p=null,D(o)}}function Q(e){if(p&&(I(p),p=null),e)return;const t=g;g=null,t.length&&v(()=>R(t),!1)}function I(e){for(let t=0;t<e.length;t++)P(e[t])}function L(e,t){e.state=0;for(let s=0;s<e.sources.length;s+=1){const o=e.sources[s];if(o.sources){const n=o.state;n===w?o!==t&&(!o.updatedAt||o.updatedAt<C)&&P(o):n===A&&L(o,t)}}}function $(e){for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];s.state||(s.state=A,s.pure?p.push(s):g.push(s),s.observers&&$(s))}}function _(e){let t;if(e.sources)for(;e.sources.length;){const s=e.sources.pop(),o=e.sourceSlots.pop(),n=s.observers;if(n&&n.length){const l=n.pop(),r=s.observerSlots.pop();o<n.length&&(l.sourceSlots[r]=o,n[o]=l,s.observerSlots[o]=r)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)_(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function V(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function D(e,t=c){throw V(e)}function W(e,t){return E(()=>e(t||{}))}function J(e,t,s){let o=s.length,n=t.length,l=o,r=0,i=0,f=t[n-1].nextSibling,u=null;for(;r<n||i<l;){if(t[r]===s[i]){r++,i++;continue}for(;t[n-1]===s[l-1];)n--,l--;if(n===r){const a=l<o?i?s[i-1].nextSibling:s[l-i]:f;for(;i<l;)e.insertBefore(s[i++],a)}else if(l===i)for(;r<n;)(!u||!u.has(t[r]))&&t[r].remove(),r++;else if(t[r]===s[l-1]&&s[i]===t[n-1]){const a=t[--n].nextSibling;e.insertBefore(s[i++],t[r++].nextSibling),e.insertBefore(s[--l],a),t[n]=s[l]}else{if(!u){u=new Map;let h=i;for(;h<l;)u.set(s[h],h++)}const a=u.get(t[r]);if(a!=null)if(i<a&&a<l){let h=r,N=1,O;for(;++h<n&&h<l&&!((O=u.get(t[h]))==null||O!==a+N);)N++;if(N>a-i){const F=t[r];for(;i<a;)e.insertBefore(s[i++],F)}else e.replaceChild(s[i++],t[r++])}else r++;else t[r++].remove()}}}function X(e,t,s,o={}){let n;return z(l=>{n=l,t===document?e():k(t,e(),t.firstChild?null:void 0,s)},o.owner),()=>{n(),t.textContent=""}}function Y(e,t,s){let o;const n=()=>{const r=document.createElement("template");return r.innerHTML=e,s?r.content.firstChild.firstChild:r.content.firstChild},l=t?()=>E(()=>document.importNode(o||(o=n()),!0)):()=>(o||(o=n())).cloneNode(!0);return l.cloneNode=l,l}function Z(e,t,s){s==null?e.removeAttribute(t):e.setAttribute(t,s)}function x(e,t){t==null?e.removeAttribute("class"):e.className=t}function k(e,t,s,o){if(s!==void 0&&!o&&(o=[]),typeof t!="function")return S(e,t,o,s);m(n=>S(e,t(),n,s),o)}function S(e,t,s,o,n){for(;typeof s=="function";)s=s();if(t===s)return s;const l=typeof t,r=o!==void 0;if(e=r&&s[0]&&s[0].parentNode||e,l==="string"||l==="number")if(l==="number"&&(t=t.toString()),r){let i=s[0];i&&i.nodeType===3?i.data!==t&&(i.data=t):i=document.createTextNode(t),s=y(e,s,o,i)}else s!==""&&typeof s=="string"?s=e.firstChild.data=t:s=e.textContent=t;else if(t==null||l==="boolean")s=y(e,s,o);else{if(l==="function")return m(()=>{let i=t();for(;typeof i=="function";)i=i();s=S(e,i,s,o)}),()=>s;if(Array.isArray(t)){const i=[],f=s&&Array.isArray(s);if(T(i,t,s,n))return m(()=>s=S(e,i,s,o,!0)),()=>s;if(i.length===0){if(s=y(e,s,o),r)return s}else f?s.length===0?B(e,i,o):J(e,s,i):(s&&y(e),B(e,i));s=i}else if(t.nodeType){if(Array.isArray(s)){if(r)return s=y(e,s,o,t);y(e,s,null,t)}else s==null||s===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);s=t}}return s}function T(e,t,s,o){let n=!1;for(let l=0,r=t.length;l<r;l++){let i=t[l],f=s&&s[l],u;if(!(i==null||i===!0||i===!1))if((u=typeof i)=="object"&&i.nodeType)e.push(i);else if(Array.isArray(i))n=T(e,i,f)||n;else if(u==="function")if(o){for(;typeof i=="function";)i=i();n=T(e,Array.isArray(i)?i:[i],Array.isArray(f)?f:[f])||n}else e.push(i),n=!0;else{const a=String(i);f&&f.nodeType===3&&f.data===a?e.push(f):e.push(document.createTextNode(a))}}return n}function B(e,t,s=null){for(let o=0,n=t.length;o<n;o++)e.insertBefore(t[o],s)}function y(e,t,s,o){if(s===void 0)return e.textContent="";const n=o||document.createTextNode("");if(t.length){let l=!1;for(let r=t.length-1;r>=0;r--){const i=t[r];if(n!==i){const f=i.parentNode===e;!l&&!r?f?e.replaceChild(n,i):e.insertBefore(n,s):f&&i.remove()}else l=!0}}else e.insertBefore(n,s);return[n]}const ee="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20166%20155.3'%3e%3cpath%20d='M163%2035S110-4%2069%205l-3%201c-6%202-11%205-14%209l-2%203-15%2026%2026%205c11%207%2025%2010%2038%207l46%209%2018-30z'%20fill='%2376b3e1'/%3e%3clinearGradient%20id='a'%20gradientUnits='userSpaceOnUse'%20x1='27.5'%20y1='3'%20x2='152'%20y2='63.5'%3e%3cstop%20offset='.1'%20stop-color='%2376b3e1'/%3e%3cstop%20offset='.3'%20stop-color='%23dcf2fd'/%3e%3cstop%20offset='1'%20stop-color='%2376b3e1'/%3e%3c/linearGradient%3e%3cpath%20d='M163%2035S110-4%2069%205l-3%201c-6%202-11%205-14%209l-2%203-15%2026%2026%205c11%207%2025%2010%2038%207l46%209%2018-30z'%20opacity='.3'%20fill='url(%23a)'/%3e%3cpath%20d='M52%2035l-4%201c-17%205-22%2021-13%2035%2010%2013%2031%2020%2048%2015l62-21S92%2026%2052%2035z'%20fill='%23518ac8'/%3e%3clinearGradient%20id='b'%20gradientUnits='userSpaceOnUse'%20x1='95.8'%20y1='32.6'%20x2='74'%20y2='105.2'%3e%3cstop%20offset='0'%20stop-color='%2376b3e1'/%3e%3cstop%20offset='.5'%20stop-color='%234377bb'/%3e%3cstop%20offset='1'%20stop-color='%231f3b77'/%3e%3c/linearGradient%3e%3cpath%20d='M52%2035l-4%201c-17%205-22%2021-13%2035%2010%2013%2031%2020%2048%2015l62-21S92%2026%2052%2035z'%20opacity='.3'%20fill='url(%23b)'/%3e%3clinearGradient%20id='c'%20gradientUnits='userSpaceOnUse'%20x1='18.4'%20y1='64.2'%20x2='144.3'%20y2='149.8'%3e%3cstop%20offset='0'%20stop-color='%23315aa9'/%3e%3cstop%20offset='.5'%20stop-color='%23518ac8'/%3e%3cstop%20offset='1'%20stop-color='%23315aa9'/%3e%3c/linearGradient%3e%3cpath%20d='M134%2080a45%2045%200%2000-48-15L24%2085%204%20120l112%2019%2020-36c4-7%203-15-2-23z'%20fill='url(%23c)'/%3e%3clinearGradient%20id='d'%20gradientUnits='userSpaceOnUse'%20x1='75.2'%20y1='74.5'%20x2='24.4'%20y2='260.8'%3e%3cstop%20offset='0'%20stop-color='%234377bb'/%3e%3cstop%20offset='.5'%20stop-color='%231a336b'/%3e%3cstop%20offset='1'%20stop-color='%231a336b'/%3e%3c/linearGradient%3e%3cpath%20d='M114%20115a45%2045%200%2000-48-15L4%20120s53%2040%2094%2030l3-1c17-5%2023-21%2013-34z'%20fill='url(%23d)'/%3e%3c/svg%3e",te="_App_9g4xh_1",se="_logo_9g4xh_5",le="_header_9g4xh_11",ne="_link_9g4xh_22",b={App:te,logo:se,"logo-spin":"_logo-spin_9g4xh_1",header:le,link:ne};var oe=Y('<div><header><img alt=logo><p>Edit <code>src/App.tsx</code> and save to reload.</p><a href=https://github.com/solidjs/solid target=_blank rel="noopener noreferrer">Learn Solid');const ie=()=>(()=>{var e=oe(),t=e.firstChild,s=t.firstChild,o=s.nextSibling,n=o.nextSibling;return Z(s,"src",ee),m(l=>{var r=b.App,i=b.header,f=b.logo,u=b.link;return r!==l.e&&x(e,l.e=r),i!==l.t&&x(t,l.t=i),f!==l.a&&x(s,l.a=f),u!==l.o&&x(n,l.o=u),l},{e:void 0,t:void 0,a:void 0,o:void 0}),e})(),re=document.getElementById("root");X(()=>W(ie,{}),re);
