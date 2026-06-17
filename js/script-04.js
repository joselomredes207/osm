// js/script-04.js - separado desde index.html
/* Perfil grande arriba, compacto cuando el menú de secciones está pegado */
(function(){
  function updateProfileMode(){
    const nav=document.querySelector('nav');
    const header=document.querySelector('header');
    let limit=260;
    if(header) limit=Math.max(180, header.offsetHeight-90);
    const navSticky=nav ? nav.getBoundingClientRect().top<=8 && window.scrollY>limit : window.scrollY>limit;
    document.body.classList.toggle('profile-mini-mode', navSticky);
  }
  window.addEventListener('scroll',()=>requestAnimationFrame(updateProfileMode),{passive:true});
  window.addEventListener('resize',updateProfileMode,{passive:true});
  document.addEventListener('DOMContentLoaded',updateProfileMode);
})();
