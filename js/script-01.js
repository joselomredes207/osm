// js/script-01.js - separado desde index.html
window.abrirLightbox=function(src){const v=document.getElementById('visor'),img=document.getElementById('img-ampliada'),vid=document.getElementById('video-ampliado');v.classList.remove('video-mode','social-mode');if(vid)vid.removeAttribute('src');img.style.display='block';img.alt='Imagen ampliada';img.src=src;v.classList.add('open');document.body.classList.add('lock')};
window.abrirVideoLightbox=function(src){const v=document.getElementById('visor'),img=document.getElementById('img-ampliada'),vid=document.getElementById('video-ampliado');img.style.display='none';img.removeAttribute('src');img.alt='';vid.src=src;v.classList.add('video-mode','open');document.body.classList.add('lock')};
window.cerrarLightbox=function(){const v=document.getElementById('visor'),img=document.getElementById('img-ampliada'),vid=document.getElementById('video-ampliado');v.classList.remove('open','video-mode','social-mode');img.style.display='none';img.removeAttribute('src');img.alt='';if(vid)vid.removeAttribute('src');document.body.classList.remove('lock','social-lightbox-open')};
window.switchTab=function(e,id){
 document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
 document.querySelectorAll('.navbtn').forEach(b=>b.classList.remove('active'));
 const tab=document.getElementById(id);
 tab?.classList.add('active');
 const activeBtn=e?.currentTarget||document.querySelector('.navbtn[onclick*="'+id+'"]');
 if(activeBtn){activeBtn.classList.add('active');activeBtn.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});}
 requestAnimationFrame(()=>{
 const nav=document.querySelector('nav');
 const navH=nav?nav.getBoundingClientRect().height:0;
 const y=tab?Math.max(0,window.scrollY+tab.getBoundingClientRect().top-navH-14):0;
 window.scrollTo({top:y,behavior:'smooth'});
 });
 setTimeout(revealNow,80);
};
window.irSaberMas=function(){
 switchTab(null,'saber-mas');
};
window.irSponsors=function(){
 switchTab(null,'inicio');
 setTimeout(()=>{
  const sponsors=document.getElementById('sponsors-grid');
  if(!sponsors)return;
  const nav=document.querySelector('nav');
  const navH=nav?nav.getBoundingClientRect().height:0;
  const y=Math.max(0,window.scrollY+sponsors.getBoundingClientRect().top-navH-24);
  window.scrollTo({top:y,behavior:'smooth'});
  sponsors.classList.add('show');
 },220);
};
function iniciarContador(){const obj=new Date(2026,5,17,16,0,0).getTime();function tick(){const d=obj-Date.now(),vals=d<=0?{days:0,hours:0,minutes:0,seconds:0}:{days:Math.floor(d/86400000),hours:Math.floor(d%86400000/3600000),minutes:Math.floor(d%3600000/60000),seconds:Math.floor(d%60000/1000)};Object.entries(vals).forEach(([id,v])=>{let el=document.getElementById(id);if(el)el.innerText=String(v).padStart(2,'0')})}tick();setInterval(tick,1000)}
function updateScroll(){
 const h=document.documentElement,b=document.body;
 const y=window.scrollY||h.scrollTop||b.scrollTop||0;
 const max=Math.max(1,(h.scrollHeight||b.scrollHeight)-window.innerHeight);
 const pct=Math.min(100,Math.max(0,y/max*100));
 const progress=document.getElementById('progress');
 const topBtn=document.getElementById('totop');
 if(progress)progress.style.width=pct+'%';
 if(topBtn)topBtn.classList.toggle('show',y>450);
}
let scrollTicking=false;
window.addEventListener('scroll',()=>{
 if(!scrollTicking){
  scrollTicking=true;
  requestAnimationFrame(()=>{updateScroll();scrollTicking=false;});
 }
},{passive:true});
let revealObserver=null;
function revealNow(){
 if(!('IntersectionObserver' in window)){
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('show'));
  return;
 }
 if(!revealObserver){
  revealObserver=new IntersectionObserver(es=>es.forEach(e=>{
   if(e.isIntersecting){e.target.classList.add('show');revealObserver.unobserve(e.target);}
  }),{threshold:.08,rootMargin:'80px 0px'});
 }
 document.querySelectorAll('.reveal:not(.show)').forEach(el=>revealObserver.observe(el));
}

function subirArriba(e){
 if(e){e.preventDefault();e.stopPropagation();}
 try{window.scrollTo({top:0,left:0,behavior:'smooth'});}catch(_){window.scrollTo(0,0);}
 setTimeout(()=>{document.documentElement.scrollTop=0;document.body.scrollTop=0;updateScroll();},450);
}

let estadoTroll='activo',timer=null,seg=10,trollActivado=false;
window.accionarTroll=function(){
 if(!trollActivado)return;
 const b=document.getElementById('troll');
 if(!b)return;
 if(estadoTroll==='activo'){
 estadoTroll='huyendo';
 clearInterval(timer);
 timer=setInterval(()=>{
 seg--;
 b.innerText='⏱️ ¡SÍGUEME! ('+seg+'s) ⏱️';
 if(seg<=0){clearInterval(timer);estadoTroll='atrapable';b.style.position='fixed';b.style.left='50%';b.style.top='50%';b.style.bottom='auto';b.style.transform='translate(-50%,-50%) scale(1.2)';b.style.background='linear-gradient(135deg,#00ff87,#006133)';b.style.color='#0b000c';b.innerText='🔓 ACCESO CONCEDIDO: ENTRAR AQUÍ 🔓'}
 },1000);
 }
 if(estadoTroll==='huyendo'){
 b.style.position='fixed';b.style.left=Math.max(20,Math.floor(Math.random()*Math.max(40,innerWidth-b.offsetWidth-40)))+'px';b.style.top=Math.max(20,Math.floor(Math.random()*Math.max(40,innerHeight-b.offsetHeight-40)))+'px';b.style.bottom='auto'
 }
};
window.clickTroll=function(){if(estadoTroll==='atrapable'){document.getElementById('modal-troll').classList.add('open');return;}if(!trollActivado)trollActivado=true;accionarTroll()};
window.cerrarModalTroll=function(){document.getElementById('modal-troll').classList.remove('open');estadoTroll='activo';trollActivado=false;seg=10;clearInterval(timer);const b=document.getElementById('troll');b.style.position='absolute';b.style.left='20px';b.style.top='auto';b.style.bottom='0';b.style.transform='none';b.style.background='linear-gradient(135deg,#e90052,#7a0026)';b.style.color='white';b.innerText='⚠️ ¡ NO TOCAR A MENOS DE SER EL ADMINISTRADOR ! ⚠️'};document.addEventListener('keydown',e=>{if(e.key==='Escape'){cerrarLightbox(); if(window.cerrarModalTroll) cerrarModalTroll()}});document.addEventListener('DOMContentLoaded',()=>{const topBtn=document.getElementById('totop');if(topBtn)topBtn.addEventListener('click',subirArriba);iniciarContador();updateScroll();revealNow()});
