function scrollFunction(){const o=document.body.scrollTop>20||document.documentElement.scrollTop>20?"block":"none";document.getElementById("topButton").style.display=o}function smoothScroll(){document.querySelectorAll("nav a").forEach(o=>{o.addEventListener("click",o=>{o.preventDefault();const t=o.target.hash,e=document.querySelector(t).offsetTop;window.scrollTo({top:e,behavior:"smooth"})})})}document.addEventListener("DOMContentLoaded",function(o){document.querySelector("#loading").remove(),document.querySelector(".wait").classList.remove("wait"),window.onscroll=function(){scrollFunction()},document.getElementById("topButton").addEventListener("click",o=>{o.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})}),smoothScroll()});