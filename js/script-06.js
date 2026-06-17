// js/script-06.js - separado desde index.html
/* FIX: elimina el bug de ocultarse/encogerse al acercar el ratón */
(function(){
  function clearProfilePointerBug(){
    document.body.classList.remove('profile-pointer-near');
  }
  document.addEventListener('mousemove', clearProfilePointerBug, {passive:true});
  document.addEventListener('DOMContentLoaded', clearProfilePointerBug);
})();
