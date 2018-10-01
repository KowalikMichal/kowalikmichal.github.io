document.addEventListener("DOMContentLoaded", function(event) {
  document.querySelector('#loading').remove();
  document.querySelector(".wait").classList.remove('wait');
  window.onscroll = function(){
    scrollFunction()
  };
  document.getElementById('topButton').addEventListener('click', e =>{
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
  smoothScroll();
});

function scrollFunction() {
    const display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block":"none";
    document.getElementById("topButton").style.display = display;
}

function smoothScroll(){
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(navLink =>{
    navLink.addEventListener('click', e=>{
      e.preventDefault();
      const target = e.target.hash;
      const targetScroll = document.querySelector(target).offsetTop;
      window.scrollTo({top: targetScroll, behavior: 'smooth'});
    });
  });
}
