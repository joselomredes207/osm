// js/script-07.js - separado desde index.html
/* FIX definitivo: el perfil no se encoge ni se oculta al pasar el ratón */
(function(){
  function unlockProfileHoverBug(){
    document.body.classList.remove('profile-pointer-near');
  }
  ['mousemove','mouseover','mouseenter','pointermove','pointerover','click'].forEach(ev=>{
    document.addEventListener(ev, unlockProfileHoverBug, {passive:true, capture:true});
  });
  document.addEventListener('DOMContentLoaded', unlockProfileHoverBug);
})();
