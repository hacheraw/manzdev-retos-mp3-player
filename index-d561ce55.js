(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&l(m)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();const a=[{title:"Monkey Island Theme",artist:"Michael Land",url:"https://scummbar.com/mi2/MI1-CD/01%20-%20Opening%20Themes%20-%20Introduction.mp3",image:"monkey.jpg"},{title:"The SCUMM Bar",artist:"Michael Land",url:"https://scummbar.com/mi2/MI1-CD/03%20-%20The%20Scumm%20Bar.mp3",image:"scummbar.jpg"},{title:"LeChuck's Theme",artist:"Michael Land",url:"https://scummbar.com/mi2/MI1-CD/04%20-%20LeChuck's%20Theme.mp3",image:"lechuck.jpg"},{title:"Monkey Island (Remix)",artist:"Michael Land",url:"https://scummbar.com/mi2/MI1-CD/26%20-%20Monkey%20Island%20-%20Rock%20Remix%202.mp3",image:"monkey-mix.jpg"}],g=50,s=document.querySelector(".player"),n=s.querySelector("audio"),T=s.querySelector(".cover"),b=s.querySelector(".title"),w=s.querySelector(".artist"),v=s.querySelector(".prev"),E=s.querySelector(".play"),M=s.querySelector(".pause"),q=s.querySelector(".next"),$=s.querySelector(".lyrics"),y=s.querySelector(".progress"),k=y.querySelector(".bar"),B=s.querySelector(".current-time"),O=s.querySelector(".total-time"),d=s.querySelector(".lines"),h=document.querySelector(".playlist"),S=document.querySelectorAll(".loop"),L=document.querySelectorAll(".list"),N=[d];let u=!1,c=0;document.addEventListener("DOMContentLoaded",()=>{D(),C(a[c]),R()});E.addEventListener("click",()=>{n.play()});M.addEventListener("click",()=>{n.pause()});q.addEventListener("click",x);v.addEventListener("click",A);y.addEventListener("click",P);n.addEventListener("timeupdate",j);n.addEventListener("play",()=>{p()});n.addEventListener("pause",()=>{p()});n.addEventListener("ended",()=>{p(),x()});S.forEach(e=>e.addEventListener("click",()=>{u=!u,S.forEach(t=>t.classList.toggle("hide")),p()}));L.forEach(e=>e.addEventListener("click",()=>{h.classList.toggle("show"),L.forEach(t=>t.classList.toggle("hide"))}));function D(){a.forEach((e,t)=>{const r=document.createElement("div");r.textContent=`${e.artist} - ${e.title}`,r.addEventListener("click",()=>{c=t,f(e)}),h.appendChild(r)})}function C(e){const t=h.querySelectorAll("div");t.forEach(r=>{r.classList.remove("active")}),t[c].classList.add("active"),n.src=e.url,T.style.backgroundImage=`url(./assets/covers/${e.image})`,b.textContent=e.title,w.textContent=e.artist,$.textContent=e.lyrics,y.value=0}function x(){if(!u&&c===a.length-1)return;++c>=a.length&&(c=0);const e=a[c];n.src=e.url,f(e)}function A(){if(!u&&c===0)return;--c<0&&(c=a.length-1);const e=a[c];n.src=e.url,f(e)}function f(e){p(),C(e),n.play()}function P(e){const t=y.clientWidth,r=e.offsetX,l=n.duration;k.style.width=`${r/t*100}%`,n.currentTime=r/t*l}function j(){n.paused||(H(),U())}function H(){const e=n.duration,t=n.currentTime;t>0&&(k.style.width=`${t/e*100}%`);const r=String(Math.floor(t/60)).padStart(2,"0"),l=String(Math.floor(t%60)).padStart(2,"0"),o=String(Math.floor(e/60)).padStart(2,"0"),i=String(Math.floor(e%60)).padStart(2,"0"),m=`${r}:${l}`,I=`${o}:${i}`;B.innerHTML=m,O.innerHTML=isNaN(e)?"":I}function R(){const t=d.clientWidth/(g*1.5);for(let r=0;r<g;r++){const l=document.createElement("div");l.classList.add("line"),l.style.width=`${t}px`,l.style.height=0,d.appendChild(l)}}function U(){d.style.display="flex";const e=d.querySelectorAll(".line"),t=d.clientHeight;e.forEach(r=>{r.style.height=`${Math.random()*t}px`})}function p(){E.style.display=n.paused?"inherit":"none",M.style.display=n.paused?"none":"inherit",N.forEach(e=>{e.style.opacity=n.paused?0:1}),q.style.color=!u&&c===a.length-1?"grey":"currentColor",v.style.color=!u&&c===0?"grey":"currentColor"}
