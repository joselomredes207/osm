// js/script-09.js - separado desde index.html
(function(){
 window.openProfilePhotoFront=function(src){
  const pv=document.getElementById('profile-photo-viewer');
  const pi=document.getElementById('profile-photo-viewer-img');
  if(!pv||!pi)return;
  pi.src=src||pi.src||'';
  pv.style.zIndex='2147483000';
  pv.style.display='flex';
  document.body.appendChild(pv);
  document.body.classList.add('profile-photo-open');
  pv.classList.add('open');
 };
 document.addEventListener('click',function(e){
  const pv=document.getElementById('profile-photo-viewer');
  if(!pv)return;
  if(e.target===pv||e.target.closest('.profile-photo-viewer button')){
   pv.classList.remove('open');
   pv.style.display='none';
   document.body.classList.remove('profile-photo-open');
  }
 },true);
})();
