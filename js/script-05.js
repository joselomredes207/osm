// js/script-05.js - separado desde index.html
/* Oculta el perfil cuando el ratón se acerca a la zona superior izquierda */
(function(){
  function updateProfileHoverHide(e){
    if(!e || typeof e.clientX!=='number') return;
    // Zona amplia para que desaparezca antes de tapar o molestar.
    const nearTopLeft = e.clientX < 390 && e.clientY < 125;
    document.body.classList.toggle('profile-pointer-near', nearTopLeft);
  }
  document.addEventListener('mousemove', updateProfileHoverHide, {passive:true});
  document.addEventListener('mouseleave', () => document.body.classList.remove('profile-pointer-near'), {passive:true});
})();
