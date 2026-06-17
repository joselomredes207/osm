// js/script-02.js - separado desde index.html
const firebaseConfig={apiKey:'AIzaSyAeyNCuJwyT6V6IsLOZY3LmVs9_tisI1C4',authDomain:'premierleague-292ff.firebaseapp.com',projectId:'premierleague-292ff',storageBucket:'premierleague-292ff.firebasestorage.app',messagingSenderId:'291127472983',appId:'1:291127472983:web:a1335400cadbbca73c0412',measurementId:'G-3FCDF5P4JM'};
let db=null,noticias=null,notificaciones=null,fb=null,firebaseReady=null;
async function initFirebase(){
 if(firebaseReady)return firebaseReady;
 firebaseReady=Promise.all([
  import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'),
  import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js')
 ]).then(([appMod,fs])=>{
  fb=fs;
  const app=appMod.initializeApp(firebaseConfig);
  db=fs.getFirestore(app);
  noticias=fs.collection(db,'noticias');
  notificaciones=fs.collection(db,'notificaciones');
  window.fb=fb;window.db=db;window.noticias=noticias;window.notificaciones=notificaciones;
 });
 return firebaseReady;
}
window.initFirebase=initFirebase;
const cats={
 memes:{g:document.getElementById('galeria-memes'),s:document.getElementById('estado-memes'),t:document.getElementById('titulo-memes'),n:'Zona Memes'},
 clubes:{g:document.getElementById('galeria-clubes'),s:document.getElementById('estado-clubes'),t:document.getElementById('titulo-clubes'),n:'Comunicados de Clubes'},
 premier:{g:document.getElementById('galeria-premier'),s:document.getElementById('estado-premier'),t:document.getElementById('titulo-premier'),n:'Comunicados Premier League'}
};

const DEFAULT_AVATAR='data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#00ff87"/><stop offset="1" stop-color="#04f5ff"/></linearGradient></defs><rect width="120" height="120" rx="60" fill="#16001d"/><circle cx="60" cy="44" r="24" fill="url(#g)"/><path d="M20 108c6-28 24-42 40-42s34 14 40 42" fill="url(#g)"/></svg>`);
let currentLightboxPost=null; window.currentLightboxPost=null;
function getDeviceId(){let id=localStorage.getItem('premier_profile_id');if(!id){id='p_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,9);localStorage.setItem('premier_profile_id',id)}return id}
function getProfile(){try{return JSON.parse(localStorage.getItem('premier_profile')||'null')}catch(_){return null}}
function profileReady(){const p=getProfile();return !!(p&&p.name&&p.club)}
function currentProfile(){const p=getProfile()||{};return {id:getDeviceId(),name:p.name||'Entrenador anónimo',club:p.club||'Sin club',avatar:p.avatar||DEFAULT_AVATAR,photo:p.photo||p.avatar||DEFAULT_AVATAR}}
const UPLOAD_AUTHORS={"trainer-jose-antonio":{name:"José Antonio López Morales",club:"Liverpool FC",role:"Entrenador",avatar:DEFAULT_AVATAR,photo:DEFAULT_AVATAR},"trainer-diego":{name:"Diego Mañas Haro",club:"Tottenham Hotspur",role:"Entrenador",avatar:DEFAULT_AVATAR,photo:DEFAULT_AVATAR},"trainer-pedro":{name:"Pedro Ruz Mañas",club:"Manchester City",role:"Entrenador",avatar:DEFAULT_AVATAR,photo:DEFAULT_AVATAR},"trainer-dennis":{name:"Dennis Patrik Bucur",club:"Arsenal FC",role:"Entrenador",avatar:DEFAULT_AVATAR,photo:DEFAULT_AVATAR},"trainer-jose-felix":{name:"Jose Félix Codina Ramos",club:"Manchester United",role:"Entrenador",avatar:DEFAULT_AVATAR,photo:DEFAULT_AVATAR},"trainer-javier":{name:"Javier Carrión Guillén",club:"Chelsea FC",role:"Entrenador",avatar:DEFAULT_AVATAR,photo:DEFAULT_AVATAR},"trainer-alvaro":{name:"Álvaro Codina Ramos",club:"Newcastle United",role:"Entrenador",avatar:DEFAULT_AVATAR,photo:DEFAULT_AVATAR},"org-miguel":{name:"Miguel Ángel",club:"Organismo interno · Presidencia oficial",role:"Organismo interno",avatar:"https://i.ibb.co/1Gyxxf4d/image.png",photo:"https://i.ibb.co/1Gyxxf4d/image.png"},"org-diddy":{name:"P. Diddy",club:"Organismo interno · Vicepresidencia",role:"Organismo interno",avatar:DEFAULT_AVATAR,photo:DEFAULT_AVATAR},"org-jeffrey":{name:"Jeffrey Epstein",club:"Organismo interno · Control interno",role:"Organismo interno",avatar:DEFAULT_AVATAR,photo:DEFAULT_AVATAR},"org-gaspar":{name:"Gaspar Torrente",club:"Organismo interno · Disciplina",role:"Organismo interno",avatar:DEFAULT_AVATAR,photo:DEFAULT_AVATAR},"org-rafael":{name:"Rafael Cazorla",club:"Organismo interno · Jefatura arbitral",role:"Organismo interno",avatar:DEFAULT_AVATAR,photo:DEFAULT_AVATAR},"premier-league":{name:"Premier League",club:"Comunicado oficial de la liga",role:"Institución",avatar:"https://i.ibb.co/RTLRRmMg/image-removebg-preview.png",photo:"https://i.ibb.co/RTLRRmMg/image-removebg-preview.png"},"club-arsenal":{name:"Arsenal FC",club:"Cuenta oficial · Arsenal FC",role:"Cuenta de club",avatar:"https://i.ibb.co/wZ96RsLT/image.png",photo:"https://i.ibb.co/wZ96RsLT/image.png"},"club-chelsea":{name:"Chelsea FC",club:"Cuenta oficial · Chelsea FC",role:"Cuenta de club",avatar:"https://i.ibb.co/rKxZvxgy/image.png",photo:"https://i.ibb.co/rKxZvxgy/image.png"},"club-tottenham":{name:"Tottenham Hotspur",club:"Cuenta oficial · Tottenham Hotspur",role:"Cuenta de club",avatar:"https://i.ibb.co/PZmybN86/image.png",photo:"https://i.ibb.co/PZmybN86/image.png"},"club-united":{name:"Manchester United",club:"Cuenta oficial · Manchester United",role:"Cuenta de club",avatar:"https://i.ibb.co/7xCCqss7/image.png",photo:"https://i.ibb.co/7xCCqss7/image.png"},"club-city":{name:"Manchester City",club:"Cuenta oficial · Manchester City",role:"Cuenta de club",avatar:"https://i.ibb.co/v4PDyF8B/image.png",photo:"https://i.ibb.co/v4PDyF8B/image.png"},"club-liverpool":{name:"Liverpool FC",club:"Cuenta oficial · Liverpool FC",role:"Cuenta de club",avatar:"https://i.ibb.co/zHTWCm5v/image.png",photo:"https://i.ibb.co/zHTWCm5v/image.png"},"club-newcastle":{name:"Newcastle United",club:"Cuenta oficial · Newcastle United",role:"Cuenta de club",avatar:"https://i.ibb.co/bjfCZSBd/image.png",photo:"https://i.ibb.co/bjfCZSBd/image.png"}};
window.openAuthorSelect=function(sel){try{sel.dataset.oldSize=sel.size||1;sel.size=Math.min(8,sel.options.length);sel.classList.add('select-open')}catch(_){}};
window.closeAuthorSelect=function(sel){setTimeout(()=>{try{sel.size=1;sel.classList.remove('select-open')}catch(_){}},160)};
window.toggleCustomAuthor=function(cat){const sel=document.getElementById('autor-'+cat),box=document.getElementById('custom-author-'+cat);if(box)box.style.display=(sel&&sel.value==='custom')?'block':'none';if(sel)closeAuthorSelect(sel)};
function validateSelectedAuthor(cat){const sel=document.getElementById('autor-'+cat);if(sel&&sel.value==='custom'){const name=(document.getElementById('custom-author-name-'+cat)?.value||'').trim();if(!name)return 'Escribe el nombre del autor personalizado.';}return ''}
function getSelectedUploadAuthor(cat){const sel=document.getElementById('autor-'+cat);const owner=currentProfile();if(sel&&sel.value==='custom'){const name=(document.getElementById('custom-author-name-'+cat)?.value||'').trim();const club=(document.getElementById('custom-author-club-'+cat)?.value||'').trim();return {name:name||owner.name||'Autor personalizado',club:club||'Autor personalizado',role:'Autor personalizado',avatar:owner.avatar||DEFAULT_AVATAR,photo:owner.photo||owner.avatar||DEFAULT_AVATAR,selectedAuthorId:'custom',selectedAuthorRole:'Autor personalizado'}}const selected=sel&&sel.value?UPLOAD_AUTHORS[sel.value]:null;if(!selected)return {name:owner.name,club:owner.club,avatar:owner.avatar,photo:owner.photo,role:'Entrenador',selectedAuthorId:'profile-current',selectedAuthorRole:'Perfil actual'};return {...selected,selectedAuthorId:sel.value,selectedAuthorRole:selected.role||''}}
function resetUploadAuthor(cat){const sel=document.getElementById('autor-'+cat);if(sel)sel.value='';const box=document.getElementById('custom-author-'+cat);if(box)box.style.display='none';const n=document.getElementById('custom-author-name-'+cat);if(n)n.value='';const c=document.getElementById('custom-author-club-'+cat);if(c)c.value=''}
function autorLabel(role){if(role==='Cuenta de club')return '🏟️ Cuenta de club';if(role==='Institución')return '🦁 Premier League';if(role==='Organismo interno')return '🏛️ Organismo interno';if(role==='Autor personalizado')return '✍️ Autor personalizado';return '👔 Entrenador'}

function setProfile(p){localStorage.setItem('premier_profile',JSON.stringify({...p,id:getDeviceId()}));paintProfileUI();try{window.checkReplyDigest&&window.checkReplyDigest()}catch(_){}}
function paintProfileUI(){const p=currentProfile();const img=document.getElementById('profile-pill-img'),name=document.getElementById('profile-pill-name');if(img)img.src=p.avatar;if(name){if(profileReady()){name.innerHTML=`<b>${p.name}</b><small>${p.club}</small>`}else{name.innerHTML='<b>Crear perfil</b><small>Configura tu entrenador</small>'}}}
function paintProfilePreview(p=currentProfile()){const img=document.getElementById('profile-preview-img'),name=document.getElementById('profile-preview-name'),club=document.getElementById('profile-preview-club');if(img)img.src=p.photo||p.avatar||DEFAULT_AVATAR;if(name)name.textContent=p.name||'Nuevo entrenador';if(club)club.textContent=p.club||'Sin club'}
function openProfileModal(force=false){const modal=document.getElementById('profile-modal');if(!modal)return;modal.dataset.force=force?'1':'0';const p=currentProfile();document.getElementById('profile-name').value=p.name==='Entrenador anónimo'?'':p.name;document.getElementById('profile-club').value=p.club==='Sin club'?'':p.club;paintProfilePreview(p);modal.classList.add('open');document.body.classList.add('lock')}
function closeProfileModal(){const modal=document.getElementById('profile-modal');if(!modal)return;if(modal.dataset.force==='1'&&!profileReady())return;modal.classList.remove('open');document.body.classList.remove('lock')}
function requireProfile(){if(profileReady())return true;openProfileModal(true);return false}
window.DEFAULT_AVATAR=DEFAULT_AVATAR;window.currentProfile=currentProfile;window.requireProfile=requireProfile;window.profileReady=profileReady;
async function fileToSmallAvatar(file){return new Promise((res,rej)=>{if(!file)return res(currentProfile().avatar);const r=new FileReader();r.onerror=()=>rej(new Error('No se pudo leer el avatar'));r.onload=()=>{const img=new Image();img.onerror=()=>rej(new Error('No se pudo cargar el avatar'));img.onload=()=>{const c=document.createElement('canvas');c.width=180;c.height=180;const ctx=c.getContext('2d');ctx.fillStyle='#16001d';ctx.fillRect(0,0,180,180);const s=Math.min(img.width,img.height),sx=(img.width-s)/2,sy=(img.height-s)/2;ctx.drawImage(img,sx,sy,s,s,0,0,180,180);res(c.toDataURL('image/jpeg',.72))};img.src=r.result};r.readAsDataURL(file)})}
async function fileToProfilePhoto(file){return new Promise((res,rej)=>{if(!file)return res(currentProfile().photo||currentProfile().avatar);const r=new FileReader();r.onerror=()=>rej(new Error('No se pudo leer la foto'));r.onload=()=>{const img=new Image();img.onerror=()=>rej(new Error('No se pudo cargar la foto'));img.onload=()=>{const max=1100,scale=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.82))};img.src=r.result};r.readAsDataURL(file)})}
function fmtDate(ms){try{return new Date(ms||Date.now()).toLocaleString('es-ES',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}catch(_){return ''}}
function safeFileName(t){return (t||'publicacion-premier-osm').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,60)||'publicacion-premier-osm'}
function cleanPostTitle(t){t=(t||'').trim();return t==='Publicación oficial'?'':t}
function showBigLikeHeart(card){
 try{
  const openedImg=document.querySelector('.lightbox.social-mode.open #img-ampliada')||document.querySelector('.lightbox.open #img-ampliada');
  const cardImg=card&&card.querySelector?card.querySelector('img'):null;
  const target=(openedImg&&openedImg.src)?openedImg:cardImg;
  let x=window.innerWidth/2,y=window.innerHeight/2;
  if(target&&target.getBoundingClientRect){
   const r=target.getBoundingClientRect();
   if(r.width>20&&r.height>20){x=r.left+r.width/2;y=r.top+r.height/2;}
  }
  const h=document.createElement('div');
  h.className='big-like-heart';
  h.style.setProperty('--heart-x',x+'px');
  h.style.setProperty('--heart-y',y+'px');
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),1050);
  if(card){card.classList.remove('like-burst');void card.offsetWidth;card.classList.add('like-burst');setTimeout(()=>card.classList.remove('like-burst'),900)}
  if(navigator.vibrate)navigator.vibrate(35);
 }catch(_){ }
}
window.showBigLikeHeart=showBigLikeHeart;
function openMiniProfile(profile={}){const p={name:profile.name||'Entrenador anónimo',club:profile.club||'Sin club',avatar:profile.photo||profile.avatar||DEFAULT_AVATAR};let viewer=document.getElementById('mini-profile-viewer');if(!viewer){viewer=document.createElement('div');viewer.id='mini-profile-viewer';viewer.className='mini-profile-viewer';viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.classList.remove('open')});document.body.appendChild(viewer)}viewer.innerHTML=`<div class="mini-profile-card"><button type="button" class="mini-profile-close" onclick="document.getElementById('mini-profile-viewer').classList.remove('open')">&times;</button><img class="mini-profile-avatar" src="${p.avatar}" alt="Foto de perfil"><h3></h3><div class="mini-club"></div><div class="mini-profile-info"><div><b>Perfil</b>Entrenador</div><div><b>Club/Rol</b><span class="mini-club-value"></span></div></div></div>`;viewer.querySelector('h3').textContent=p.name;viewer.querySelector('.mini-club').textContent=p.club;viewer.querySelector('.mini-club-value').textContent=p.club;viewer.querySelector('.mini-profile-avatar').addEventListener('click',(e)=>{e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();if(window.openProfilePhotoFront){window.openProfilePhotoFront(p.avatar)}else{const pv=document.getElementById('profile-photo-viewer'),pi=document.getElementById('profile-photo-viewer-img');if(pv&&pi){pi.src=p.avatar;pv.style.zIndex='2147483000';document.body.appendChild(pv);document.body.classList.add('profile-photo-open');pv.classList.add('open')}}});viewer.classList.add('open')}
window.openMiniProfile=openMiniProfile;

async function crearNotificacion(ownerId,payload={}){
 try{
  if(!ownerId||ownerId===currentProfile().id)return;
  await initFirebase();
  const actor=currentProfile();
  await fb.addDoc(notificaciones,{ownerId,actorId:actor.id,actorName:actor.name,actorClub:actor.club,actorAvatar:actor.avatar,type:payload.type||'info',postId:payload.postId||'',postTitle:payload.postTitle||'',commentId:payload.commentId||'',text:(payload.text||'').slice(0,180),read:false,fecha:Date.now(),createdAt:fb.serverTimestamp()});
 }catch(e){console.warn('No se pudo crear notificación',e)}
}
function textoNotificacion(n){
 const name=n.actorName||'Alguien';
 const post=n.postTitle?` en “${n.postTitle}”`:'';
 if(n.type==='like')return `${name} dio like a tu publicación${post}.`;
 if(n.type==='comment')return `${name} comentó en tu publicación${post}.`;
 if(n.type==='reply')return `${name} respondió a tu comentario${post}.`;
 if(n.type==='reply_post')return `${name} respondió un comentario en tu publicación${post}.`;
 return `${name} interactuó con una publicación${post}.`;
}
function showNotifyToast(text){
 let t=document.getElementById('notify-toast');
 if(!t){t=document.createElement('div');t.id='notify-toast';t.className='notify-toast';document.body.appendChild(t)}
 t.textContent=text;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),4200);
}
let userNotifUnsub=null,userNotifFirst=true,userNotifs=[];
async function setupUserNotifications(){
 if(!profileReady()||userNotifUnsub)return;
 await initFirebase();
 const me=currentProfile().id;
 const q=fb.query(notificaciones,fb.where('ownerId','==',me));
 userNotifUnsub=fb.onSnapshot(q,snap=>{
  const prevUnread=userNotifs.filter(n=>!n.read).length;
  const arr=[];snap.forEach(d=>arr.push({id:d.id,...d.data()}));
  arr.sort((a,b)=>(b.fecha||0)-(a.fecha||0));userNotifs=arr.slice(0,60);renderNotifPanel();
  const unread=userNotifs.filter(n=>!n.read).length;const badge=document.getElementById('notify-badge');if(badge){badge.textContent=unread>99?'99+':String(unread);badge.classList.toggle('show',unread>0)}
  if(!userNotifFirst&&unread>prevUnread){const newest=userNotifs.find(n=>!n.read);if(newest)showNotifyToast(textoNotificacion(newest))}
  userNotifFirst=false;
 },err=>console.warn('Notificaciones no disponibles',err));
}
function renderNotifPanel(){
 const list=document.getElementById('notify-list');if(!list)return;
 if(!userNotifs.length){list.innerHTML='<div class="notify-empty">No hay notificaciones todavía.</div>';return;}
 list.innerHTML='';userNotifs.forEach(n=>{const item=document.createElement('div');item.className='notify-item '+(!n.read?'unread':'');item.innerHTML=`<b>${n.actorName||'Alguien'}</b><p></p><span class="notify-time">${fmtDate(n.fecha)}</span>`;item.querySelector('p').textContent=textoNotificacion(n);item.addEventListener('click',async()=>{try{await fb.updateDoc(fb.doc(db,'notificaciones',n.id),{read:true})}catch(_){} if(n.postId){const snap=await fb.getDoc(fb.doc(db,'noticias',n.postId));if(snap.exists())openPostLightbox(snap.data().src,n.postId,snap.data())}});list.appendChild(item)});
}
async function markAllNotificationsRead(){try{await initFirebase();await Promise.all(userNotifs.filter(n=>!n.read).map(n=>fb.updateDoc(fb.doc(db,'notificaciones',n.id),{read:true})))}catch(e){console.warn(e)}}


function contarComentariosVisibles(comments=[]){
 const arr=Array.isArray(comments)?comments:[];
 const byParent={};
 arr.forEach(c=>{if(c&&c.parentId){(byParent[c.parentId]||(byParent[c.parentId]=[])).push(c)}});
 let count=0;
 function walk(c){count++;(byParent[c.id]||[]).forEach(walk)}
 arr.filter(c=>!c.parentId).forEach(walk);
 return count;
}
function idsComentarioConRespuestas(comments=[],commentId){
 const ids=new Set([commentId]);
 let changed=true;
 while(changed){
  changed=false;
  comments.forEach(c=>{if(c&&c.parentId&&ids.has(c.parentId)&&!ids.has(c.id)){ids.add(c.id);changed=true}});
 }
 return ids;
}

function renderComment(c,postId,allComments=[],onReply=null,depth=0){
 const me=currentProfile().id;
 const div=document.createElement('div');div.className='comment '+(c.parentId?'reply':'');
 const canDelete=c.profileId===me;
 div.innerHTML=`<div class="comment-head"><img src="${c.avatar||DEFAULT_AVATAR}" alt=""><span class="comment-author-click">${c.name||'Entrenador'}</span><small class="comment-date">${fmtDate(c.fecha)}</small>${canDelete?'<button class="comment-del" type="button">Eliminar</button>':''}</div><div class="comment-text"></div><div class="comment-actions-row"><button type="button" class="comment-reply-btn">Responder</button></div>`;
 div.querySelector('.comment-text').textContent=c.text||'';
 div.querySelector('.comment-author-click')?.addEventListener('click',()=>openMiniProfile({name:c.name,club:c.club,avatar:c.photo||c.avatar}));
 div.querySelector('.comment-head img')?.addEventListener('click',()=>openMiniProfile({name:c.name,club:c.club,avatar:c.photo||c.avatar}));
 div.querySelector('.comment-reply-btn')?.addEventListener('click',()=>onReply&&onReply(c));
 if(canDelete)div.querySelector('.comment-del').addEventListener('click',()=>window.deleteComment(postId||currentLightboxPost,c.id));
 const replies=allComments.filter(r=>r.parentId===c.id).sort((a,b)=>(a.fecha||0)-(b.fecha||0));
 if(replies.length&&depth<6){const box=document.createElement('div');box.className='comment-replies';replies.forEach(r=>box.appendChild(renderComment(r,postId,allComments,onReply,depth+1)));div.appendChild(box)}
 return div;
}
function renderSocialPanel(id,f){
 const panel=document.getElementById('social-panel');if(!panel)return;
 const author=f.author||{},likes=Array.isArray(f.likes)?f.likes:[],comments=Array.isArray(f.comments)?f.comments:[],liked=likes.includes(currentProfile().id),titleText=cleanPostTitle(f.titulo),isOwner=author.id===currentProfile().id,isLegacy=!author.id,canManage=isOwner||isLegacy;
 panel.innerHTML='';
 const head=document.createElement('div');head.className='social-panel-head';head.innerHTML=`<img src="${author.avatar||DEFAULT_AVATAR}" alt="Autor"><div><b>${author.name||'Entrenador anónimo'}</b><br><span style="color:var(--pl-cyan);font-weight:900">${author.club||'Sin club'}</span></div>`;head.addEventListener('click',()=>openMiniProfile({name:author.name,club:author.club,avatar:author.photo||author.avatar}));panel.appendChild(head);
 if(titleText){const title=document.createElement('div');title.className='social-panel-title title-edit-row';const span=document.createElement('span');span.textContent=titleText;title.appendChild(span);if(canManage){const edit=document.createElement('button');edit.type='button';edit.className='inline-title-edit';edit.title='Editar título';edit.textContent='✏️';edit.addEventListener('click',ev=>{ev.stopPropagation();window.editarTituloPublicacion(id,titleText)});title.appendChild(edit)}panel.appendChild(title)}else if(canManage){const holder=document.createElement('div');holder.className='title-placeholder-edit';const edit=document.createElement('button');edit.type='button';edit.className='inline-title-edit';edit.textContent='✏️ Añadir título';edit.addEventListener('click',()=>window.editarTituloPublicacion(id,''));holder.appendChild(edit);panel.appendChild(holder)}
 const actions=document.createElement('div');actions.className='social-panel-actions';actions.innerHTML=`<div class="post-actions"><button type="button" class="react-btn ${liked?'active':''}" id="lb-like">❤️ ${likes.length}</button><button type="button" class="download-btn view-image-btn" id="lb-view-img">🖼️ Ver imagen</button><a class="download-btn" download="${safeFileName(titleText||'publicacion-premier-osm')}.jpg" href="${f.src||'#'}">⬇️ Descargar</a>${!author.id?'<button type="button" class="claim-btn" id="lb-claim">🏷️ Reclamar</button>':''}</div>`;panel.appendChild(actions);
 const visibleCount=contarComentariosVisibles(comments);const commentsTitle=document.createElement('div');commentsTitle.className='social-comments-title';commentsTitle.textContent=visibleCount===1?'1 comentario':`${visibleCount} comentarios`;panel.appendChild(commentsTitle);
 const list=document.createElement('div');list.className='social-panel-comments';panel.appendChild(list);
 const formWrap=document.createElement('div');formWrap.className='social-panel-actions comment-form-wrap';
 const replyHint=document.createElement('div');replyHint.className='reply-hint';replyHint.innerHTML='<span></span><button type="button">×</button>';formWrap.appendChild(replyHint);
 let replyTarget=null;
 const setReplyTarget=(c)=>{replyTarget=c;replyHint.querySelector('span').textContent='Respondiendo a '+(c.name||'Entrenador');replyHint.classList.add('show');inp.focus()};
 replyHint.querySelector('button').addEventListener('click',()=>{replyTarget=null;replyHint.classList.remove('show')});
 if(!visibleCount){list.innerHTML='<div class="social-empty">Todavía no hay comentarios. Sé el primero en comentar.</div>'}else{comments.filter(c=>!c.parentId).sort((a,b)=>(a.fecha||0)-(b.fecha||0)).forEach(c=>list.appendChild(renderComment(c,id,comments,setReplyTarget)))}
 const form=document.createElement('div');form.className='comment-form';const inp=document.createElement('input');inp.className='input';inp.placeholder='Escribe un mensaje...';inp.maxLength=220;const send=document.createElement('button');send.className='btn send-message-btn';send.type='button';send.innerHTML='📨 Enviar';send.className='btn send-message-btn';send.setAttribute('aria-label','Enviar mensaje');send.title='Enviar mensaje';const submit=()=>{window.addComment(id,inp.value,replyTarget?replyTarget.id:null);inp.value='';replyTarget=null;replyHint.classList.remove('show')};send.addEventListener('click',submit);inp.addEventListener('keydown',ev=>{if(ev.key==='Enter')submit()});form.append(inp,send);formWrap.appendChild(form);panel.appendChild(formWrap);panel.querySelector('#lb-like')?.addEventListener('click',()=>window.toggleLike(id));panel.querySelector('#lb-view-img')?.addEventListener('click',()=>window.abrirLightbox(f.src||''));panel.querySelector('#lb-claim')?.addEventListener('click',()=>window.reclamarPublicacion(id))
}
function openPostLightbox(src,id,f){currentLightboxPost=id;window.currentLightboxPost=id;document.body.classList.add('social-lightbox-open');const v=document.getElementById('visor'),img=document.getElementById('img-ampliada'),vid=document.getElementById('video-ampliado');v.classList.remove('video-mode');if(vid)vid.removeAttribute('src');img.style.display='block';img.alt=cleanPostTitle(f?.titulo)||'Imagen ampliada';img.src=src;renderSocialPanel(id,f||{});v.classList.add('social-mode','open');document.body.classList.add('lock')}

let activeCategory='memes';
const state={memes:{loaded:false,loading:false},clubes:{loaded:false,loading:false},premier:{loaded:false,loading:false}};
const setE=(c,m,t='')=>{if(cats[c]?.s){cats[c].s.textContent=m;cats[c].s.className='status '+(t||'')}};
const empty=t=>'<div class="empty">'+t+'</div>';
function fechaMs(f){
 const fecha=f?.fecha;
 if(!fecha)return 0;
 if(typeof fecha.toMillis==='function')return fecha.toMillis();
 if(typeof fecha.seconds==='number')return fecha.seconds*1000+Math.floor((fecha.nanoseconds||0)/1000000);
 const d=new Date(fecha);
 return isNaN(d.getTime())?0:d.getTime();
}
async function comprimir(file){
 return new Promise((res,rej)=>{
 const r=new FileReader();
 r.onerror=()=>rej(new Error('No se pudo leer el archivo'));
 r.onload=()=>{
 const img=new Image();
 img.onerror=()=>rej(new Error('No se pudo cargar la imagen'));
 img.onload=()=>{
 let mw=900,q=.62,data='';
 for(let i=0;i<7;i++){
 const sc=Math.min(1,mw/img.width),c=document.createElement('canvas');
 c.width=Math.max(1,Math.round(img.width*sc));
 c.height=Math.max(1,Math.round(img.height*sc));
 c.getContext('2d',{alpha:false}).drawImage(img,0,0,c.width,c.height);
 data=c.toDataURL('image/jpeg',q);
 if(data.length<650000)break;
 mw=Math.round(mw*.80);
 q=Math.max(.42,q-.07);
 }
 res(data);
 };
 img.src=r.result;
 };
 r.readAsDataURL(file);
 });
}
function crearBotonMover(id,destino){
 const b=document.createElement('button');
 b.type='button';
 b.textContent='Mover a '+cats[destino].n;
 b.addEventListener('click',()=>window.moverPublicacion(id,destino));
 return b;
}
function paint(g,f,id,prepend=false){const cat=f.categoria||'memes',likes=Array.isArray(f.likes)?f.likes:[],comments=Array.isArray(f.comments)?f.comments:[],liked=likes.includes(currentProfile().id),titleText=cleanPostTitle(f.titulo),author=f.author||{},owner=f.owner||{},ownerId=f.ownerId||owner.id||author.id,isLegacy=!ownerId&&!author.id,canManage=(ownerId===currentProfile().id)||isLegacy;const card=document.createElement('div');card.className='imgcard card '+(!titleText?'post-no-title':'');card.dataset.id=id;card.dataset.title=(titleText||'').toLowerCase();card.dataset.author=((author.name||'')+' '+(author.club||'')).toLowerCase();card.dataset.role=author.role||author.selectedAuthorRole||'Entrenador';card.dataset.likes=String(likes.length);card.dataset.comments=String(contarComentariosVisibles(comments));card.dataset.date=String(fechaMs(f)||Date.now());card.dataset.pinned=f.pinned?'1':'0';if(f.pinned){const pin=document.createElement('div');pin.className='pinned-ribbon';pin.textContent='📌 Fijado';card.appendChild(pin)}if(canManage){const trash=document.createElement('button');trash.type='button';trash.className='trash';trash.textContent='🗑️';trash.addEventListener('click',()=>window.borrarFotoPrensaReal(id));card.appendChild(trash);const admin=document.createElement('div');admin.className='post-admin-actions';const pinBtn=document.createElement('button');pinBtn.type='button';pinBtn.textContent=f.pinned?'📌 Desfijar':'📌 Fijar';pinBtn.addEventListener('click',ev=>{ev.stopPropagation();window.togglePinnedPublicacion(id,!!f.pinned)});const authorBtn=document.createElement('button');authorBtn.type='button';authorBtn.textContent='👤 Autor';authorBtn.addEventListener('click',ev=>{ev.stopPropagation();window.editarAutorPublicacion(id,author)});admin.append(pinBtn,authorBtn);card.appendChild(admin)}const img=document.createElement('img');img.loading='lazy';img.decoding='async';img.src=f.src||'';img.alt=titleText||'Publicación sin título';img.className='zoomable';img.addEventListener('click',()=>openPostLightbox(img.src,id,f));const body=document.createElement('div');body.style.cssText='padding:15px;text-align:center;font-weight:bold';if(titleText||canManage){const row=document.createElement('div');row.className='card-title-row';if(titleText){const title=document.createElement('span');title.textContent=titleText;row.appendChild(title)}if(canManage){const edit=document.createElement('button');edit.type='button';edit.className='inline-title-edit';edit.title=titleText?'Editar título':'Añadir título';edit.textContent='✏️';edit.addEventListener('click',ev=>{ev.stopPropagation();window.editarTituloPublicacion(id,titleText)});row.appendChild(edit)}body.appendChild(row)}const authorLine=document.createElement('div');authorLine.className='author-line';authorLine.innerHTML=`<img src="${author.avatar||DEFAULT_AVATAR}" alt="Autor"><span>${author.name||'Entrenador anónimo'} · ${author.club||'Sin club'}</span>`;authorLine.addEventListener('click',()=>openMiniProfile({name:author.name,club:author.club,avatar:author.photo||author.avatar}));body.appendChild(authorLine);const typeBadge=document.createElement('div');typeBadge.className='author-type-badge';typeBadge.textContent=autorLabel(author.role||author.selectedAuthorRole||'Entrenador');body.appendChild(typeBadge);if(isLegacy){const legacy=document.createElement('div');legacy.className='legacy-author-warning';legacy.textContent='Publicación sin autor · puedes reclamarla';body.appendChild(legacy)}const actions=document.createElement('div');actions.className='post-actions';const likeBtn=document.createElement('button');likeBtn.type='button';likeBtn.className='react-btn '+(liked?'active':'');likeBtn.textContent='❤️ '+likes.length;likeBtn.addEventListener('click',()=>window.toggleLike(id));const commentBtn=document.createElement('button');commentBtn.type='button';commentBtn.className='react-btn';commentBtn.textContent='💬 '+comments.length;commentBtn.addEventListener('click',()=>openPostLightbox(img.src,id,f));const viewBtn=document.createElement('button');viewBtn.type='button';viewBtn.className='download-btn view-image-btn';viewBtn.textContent='🖼️ Ver imagen';viewBtn.addEventListener('click',ev=>{ev.stopPropagation();window.abrirLightbox(img.src)});const dl=document.createElement('a');dl.className='download-btn';dl.href=f.src||'#';dl.download=safeFileName(titleText||'publicacion-premier-osm')+'.jpg';dl.textContent='⬇️ Descargar';if(isLegacy){const claim=document.createElement('button');claim.type='button';claim.className='claim-btn';claim.textContent='🏷️ Reclamar';claim.addEventListener('click',()=>window.reclamarPublicacion(id));actions.append(likeBtn,commentBtn,viewBtn,claim,dl)}else{actions.append(likeBtn,commentBtn,viewBtn,dl)};body.appendChild(actions);const move=document.createElement('div');move.className='move';Object.keys(cats).filter(k=>k!==cat).forEach(k=>move.appendChild(crearBotonMover(id,k)));body.appendChild(move);card.append(img,body);prepend?g.prepend(card):g.appendChild(card);applyGalleryFilters(cat)}
async function cargarCategoria(cat,force=false){
 if(!cats[cat]||state[cat].loading)return;
 activeCategory=cat;
 if(state[cat].loaded&&!force)return;
 state[cat].loading=true;
 const g=cats[cat].g;
 g.innerHTML='';
 setE(cat,'Cargando publicaciones...');
 try{
 await initFirebase();
 const snap=await fb.getDocs(fb.query(noticias,fb.where('categoria','==',cat)));
 const docs=[];
 snap.forEach(d=>docs.push({id:d.id,data:{...d.data(),categoria:cat}}));
 docs.sort((a,b)=>(b.data.pinned===true)-(a.data.pinned===true)||fechaMs(b.data)-fechaMs(a.data));
 if(!docs.length){
 g.innerHTML=empty(cat==='memes'?'No hay memes todavía.':cat==='clubes'?'No hay comunicados de clubes todavía.':'No hay comunicados Premier todavía.');
 setE(cat,'','');
 }else{
 let painted=0;docs.forEach(x=>{try{paint(g,x.data,x.id);painted++;}catch(renderErr){console.error('Error renderizando publicación',x.id,renderErr)}});
 if(!painted&&docs.length){g.innerHTML=empty('No se pudieron mostrar las publicaciones por un error de renderizado.');setE(cat,'⚠️ Publicaciones encontradas, pero hubo un error al mostrarlas.','err');}else{setE(cat,'✅ '+painted+' publicaciones cargadas de más recientes a menos recientes.','okmsg');}
 }
 state[cat].loaded=true;
 }catch(err){
 console.error(err);
 g.innerHTML=empty('No se pudieron cargar las publicaciones. Revisa permisos de Firestore o la conexión.');
 setE(cat,'❌ Error al cargar publicaciones.','err');
 }finally{
 state[cat].loading=false;
 }
}

function ensureClaimPostModal(){
 let modal=document.getElementById('claim-post-modal');
 if(modal)return modal;
 modal=document.createElement('div');
 modal.id='claim-post-modal';
 modal.className='claim-post-modal';
 modal.innerHTML=`<div class="claim-post-box"><button type="button" class="claim-post-close" id="claim-post-close">&times;</button><div class="claim-post-head"><div class="claim-post-icon">🏷️</div><div><h3>Reclamar publicación</h3><p>Vas a asignar esta publicación a tu perfil de entrenador.</p></div></div><div class="claim-post-preview" id="claim-post-preview"><img id="claim-post-img" alt="Vista previa de la publicación"></div><div class="claim-post-note"><b>Importante:</b> al reclamarla, aparecerás como autor y podrás gestionarla desde tu perfil.</div><div class="claim-post-actions"><button type="button" class="claim-post-cancel" id="claim-post-cancel">Cancelar</button><button type="button" class="claim-post-confirm" id="claim-post-confirm">Sí, reclamar</button></div><div class="claim-post-status" id="claim-post-status"></div></div>`;
 document.body.appendChild(modal);
 modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
 modal.querySelector('#claim-post-close').addEventListener('click',()=>modal.classList.remove('open'));
 modal.querySelector('#claim-post-cancel').addEventListener('click',()=>modal.classList.remove('open'));
 return modal;
}
function confirmarReclamarPublicacion(data={}){
 return new Promise(resolve=>{
  const modal=ensureClaimPostModal();
  const preview=modal.querySelector('#claim-post-preview');
  const img=modal.querySelector('#claim-post-img');
  const status=modal.querySelector('#claim-post-status');
  const ok=modal.querySelector('#claim-post-confirm');
  const cancel=modal.querySelector('#claim-post-cancel');
  const close=modal.querySelector('#claim-post-close');
  status.textContent='';
  if(data.src){img.src=data.src;preview.classList.add('show')}else{img.removeAttribute('src');preview.classList.remove('show')}
  const clean=()=>{ok.onclick=null;cancel.onclick=null;close.onclick=null;modal.classList.remove('open')};
  ok.onclick=()=>{status.textContent='Reclamando publicación...';clean();resolve(true)};
  cancel.onclick=()=>{clean();resolve(false)};
  close.onclick=()=>{clean();resolve(false)};
  modal.classList.add('open');
 });
}
window.reclamarPublicacion=async(id)=>{
 if(!requireProfile())return;
 try{
  await initFirebase();
  const p=currentProfile();
  const ref=fb.doc(db,'noticias',id);
  const snap=await fb.getDoc(ref);
  if(!snap.exists()){alert('No se encontró la publicación.');return}
  const data=snap.data()||{};
  if(data.author&&data.author.id){alert('Esta publicación ya tiene autor.');return}
  if(!await confirmarReclamarPublicacion(data))return;
  await fb.updateDoc(ref,{author:{id:p.id,name:p.name,club:p.club,avatar:p.avatar,photo:p.photo},claimedAt:Date.now()});
  Object.keys(state).forEach(k=>state[k].loaded=false);
  await cargarCategoria(activeCategory,true);
  if(window.currentLightboxPost===id){const fresh=await fb.getDoc(ref);if(fresh.exists())renderSocialPanel(id,fresh.data())}
 }catch(e){console.error(e);alert('No se pudo reclamar la publicación')}
};
window.moverPublicacion=async(id,cat)=>{
 try{
 await initFirebase();
 await fb.updateDoc(fb.doc(db,'noticias',id),{categoria:cat});
 Object.keys(state).forEach(k=>state[k].loaded=false);
 await cargarCategoria(activeCategory,true);
 setE(cat,'✅ Imagen movida a '+cats[cat].n+'.','okmsg');
 }catch(e){
 console.error(e);
 alert('No se pudo mover la imagen');
 }
};
async function refreshVisibleAfterInteraction(){
 const old=currentLightboxPost;
 const scrollBefore=window.scrollY||document.documentElement.scrollTop||0;
 const anchorId=old||window.__lastLikeCardId||'';
 const anchorEl=anchorId?document.querySelector(`[data-id="${anchorId}"]`):null;
 const anchorTop=anchorEl?anchorEl.getBoundingClientRect().top:null;
 state[activeCategory].loaded=false;
 await cargarCategoria(activeCategory,true);
 if(old){try{const snap=await fb.getDoc(fb.doc(db,'noticias',old));if(snap.exists())renderSocialPanel(old,snap.data())}catch(_){}}
 requestAnimationFrame(()=>{
  const newAnchor=anchorId?document.querySelector(`[data-id="${anchorId}"]`):null;
  if(newAnchor&&anchorTop!==null){
   const diff=newAnchor.getBoundingClientRect().top-anchorTop;
   window.scrollTo({top:Math.max(0,(window.scrollY||0)+diff),behavior:'auto'});
  }else{
   window.scrollTo({top:scrollBefore,behavior:'auto'});
  }
 });
}
window.toggleLike=async(id)=>{
 if(!requireProfile())return;
 window.__lastLikeCardId=id;
 try{
  await initFirebase();
  const ref=fb.doc(db,'noticias',id);const snap=await fb.getDoc(ref);const data=snap.data()||{};
  const me=currentProfile().id;const arr=Array.isArray(data.likes)?data.likes:[];const wasLiked=arr.includes(me);const next=wasLiked?arr.filter(x=>x!==me):[...arr,me];
  await fb.updateDoc(ref,{likes:next});
  if(!wasLiked&&data.author?.id){await crearNotificacion(data.author.id,{type:'like',postId:id,postTitle:cleanPostTitle(data.titulo),text:'like'})}
  const visor=document.getElementById('visor');const likeDesdeVisor=!!(visor&&visor.classList.contains('open')&&visor.classList.contains('social-mode')&&window.currentLightboxPost===id);if(!wasLiked&&likeDesdeVisor)showBigLikeHeart(null);
  const updated={...data,likes:next};const card=document.querySelector(`[data-id="${id}"]`);if(card){const btns=card.querySelectorAll('.post-actions .react-btn');const likeBtn=btns&&btns[0];if(likeBtn){likeBtn.classList.toggle('active',next.includes(me));likeBtn.textContent='❤️ '+next.length}}
  if(likeDesdeVisor){renderSocialPanel(id,updated)}else{const lb=document.getElementById('lb-like');if(lb&&window.currentLightboxPost===id){lb.classList.toggle('active',next.includes(me));lb.textContent='❤️ '+next.length}}
 }catch(e){console.error(e);alert('No se pudo actualizar el like')}
};
window.addComment=async(id,text,parentId=null)=>{
 if(!requireProfile())return;
 text=(text||'').trim();if(!text)return;
 try{
  await initFirebase();
  const p=currentProfile();const ref=fb.doc(db,'noticias',id);const snap=await fb.getDoc(ref);const data=snap.data()||{};
  const comments=Array.isArray(data.comments)?data.comments:[];
  const newComment={id:'c_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,6),profileId:p.id,name:p.name,club:p.club,avatar:p.avatar,photo:p.photo,text:text.slice(0,220),fecha:Date.now()};
  if(parentId)newComment.parentId=parentId;
  comments.push(newComment);
  await fb.updateDoc(ref,{comments});
  const title=cleanPostTitle(data.titulo);
  const notified=new Set();
  if(parentId){
    const parent=comments.find(c=>c.id===parentId);
    if(parent?.profileId&&parent.profileId!==p.id){notified.add(parent.profileId);await crearNotificacion(parent.profileId,{type:'reply',postId:id,postTitle:title,commentId:parentId,text})}
    if(data.author?.id&&data.author.id!==p.id&&!notified.has(data.author.id)){await crearNotificacion(data.author.id,{type:'reply_post',postId:id,postTitle:title,commentId:newComment.id,text})}
  }else if(data.author?.id&&data.author.id!==p.id){
    await crearNotificacion(data.author.id,{type:'comment',postId:id,postTitle:title,commentId:newComment.id,text});
  }
  await refreshVisibleAfterInteraction();
 }catch(e){console.error(e);alert('No se pudo publicar el comentario')}
};
function ensureDeleteCommentModal(){
 let modal=document.getElementById('delete-comment-modal');
 if(modal)return modal;
 modal=document.createElement('div');
 modal.id='delete-comment-modal';
 modal.className='delete-comment-modal';
 modal.innerHTML=`<div class="delete-comment-box"><button type="button" class="delete-comment-close" id="delete-comment-close">&times;</button><div class="delete-comment-head"><div class="delete-comment-icon">💬</div><div><h3>Borrar comentario</h3><p>Este comentario se eliminará de la publicación. Esta acción no se puede deshacer.</p></div></div><div class="delete-comment-preview"><div class="delete-comment-preview-head"><img id="delete-comment-avatar" alt=""><span id="delete-comment-author">Entrenador</span></div><div class="delete-comment-preview-text" id="delete-comment-text"></div></div><div class="delete-comment-actions"><button type="button" class="delete-comment-cancel" id="delete-comment-cancel">Cancelar</button><button type="button" class="delete-comment-confirm" id="delete-comment-confirm">Sí, borrar</button></div><div class="delete-comment-status" id="delete-comment-status"></div></div>`;
 document.body.appendChild(modal);
 modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
 modal.querySelector('#delete-comment-close').addEventListener('click',()=>modal.classList.remove('open'));
 modal.querySelector('#delete-comment-cancel').addEventListener('click',()=>modal.classList.remove('open'));
 return modal;
}
function confirmarBorrarComentario(comment={}){
 return new Promise(resolve=>{
  const modal=ensureDeleteCommentModal();
  const avatar=modal.querySelector('#delete-comment-avatar');
  const author=modal.querySelector('#delete-comment-author');
  const text=modal.querySelector('#delete-comment-text');
  const status=modal.querySelector('#delete-comment-status');
  const ok=modal.querySelector('#delete-comment-confirm');
  const cancel=modal.querySelector('#delete-comment-cancel');
  const close=modal.querySelector('#delete-comment-close');
  avatar.src=comment.avatar||DEFAULT_AVATAR;
  author.textContent=comment.name||'Entrenador';
  text.textContent=comment.text||'Comentario sin texto';
  status.textContent='';
  modal.classList.add('open');
  const cleanup=value=>{ok.onclick=null;cancel.onclick=null;close.onclick=null;modal.classList.remove('open');resolve(value)};
  ok.onclick=()=>cleanup(true);
  cancel.onclick=()=>cleanup(false);
  close.onclick=()=>cleanup(false);
 });
}
window.deleteComment=async(id,commentId)=>{
 if(!id||!commentId)return;
 try{
  await initFirebase();
  const ref=fb.doc(db,'noticias',id);
  const snap=await fb.getDoc(ref);
  const data=snap.data()||{};
  const me=currentProfile().id;
  const comments=Array.isArray(data.comments)?data.comments:[];
  const target=comments.find(c=>c.id===commentId&&c.profileId===me);
  if(!target){alert('No se encontró el comentario o no puedes borrarlo.');return;}
  const confirmed=await confirmarBorrarComentario(target);
  if(!confirmed)return;
  const modal=ensureDeleteCommentModal();
  const status=modal.querySelector('#delete-comment-status');
  modal.classList.add('open');
  const deleteIds=idsComentarioConRespuestas(comments,commentId);
  status.textContent=deleteIds.size>1?'Borrando comentario y respuestas...':'Borrando comentario...';
  const next=comments.filter(c=>!deleteIds.has(c.id));
  await fb.updateDoc(ref,{comments:next});
  status.textContent=deleteIds.size>1?'✅ Comentario y respuestas borrados':'✅ Comentario borrado';
  await refreshVisibleAfterInteraction();
  setTimeout(()=>modal.classList.remove('open'),450);
 }catch(e){
  console.error(e);
  const modal=ensureDeleteCommentModal();
  modal.classList.add('open');
  modal.querySelector('#delete-comment-status').textContent='❌ No se pudo eliminar el comentario';
 }
};
function ensureTitleEditor(){
 let modal=document.getElementById('title-editor-modal');
 if(modal)return modal;
 modal=document.createElement('div');modal.id='title-editor-modal';modal.className='title-editor-modal';
 modal.innerHTML=`<div class="title-editor-box"><button type="button" class="title-editor-close" id="title-editor-close">&times;</button><h3>Editar título</h3><p>Cambia el título de la publicación o déjalo vacío para quitarlo.</p><input class="title-editor-input" id="title-editor-input" maxlength="90" placeholder="Título de la publicación"><div class="title-editor-actions"><button type="button" class="title-editor-cancel" id="title-editor-cancel">Cancelar</button><button type="button" class="title-editor-save" id="title-editor-save">Guardar título</button></div><div class="title-editor-status" id="title-editor-status"></div></div>`;
 document.body.appendChild(modal);
 modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
 modal.querySelector('#title-editor-close').addEventListener('click',()=>modal.classList.remove('open'));
 modal.querySelector('#title-editor-cancel').addEventListener('click',()=>modal.classList.remove('open'));
 return modal;
}
window.editarTituloPublicacion=async(id,actual='')=>{
 if(!requireProfile())return;
 const modal=ensureTitleEditor();
 const input=modal.querySelector('#title-editor-input');
 const save=modal.querySelector('#title-editor-save');
 const status=modal.querySelector('#title-editor-status');
 input.value=actual||'';status.textContent='';modal.classList.add('open');setTimeout(()=>{input.focus();input.select()},50);
 const doSave=async()=>{
  const titulo=input.value.trim();
  status.textContent='Guardando...';
  try{
   await initFirebase();
   const ref=fb.doc(db,'noticias',id);
   const snap=await fb.getDoc(ref);
   if(!snap.exists()){status.textContent='No se encontró la publicación.';return;}
   const data=snap.data()||{},author=data.author||{};
   if(author.id&&author.id!==currentProfile().id){status.textContent='Solo puede editarlo quien publicó la imagen.';return;}
   await fb.updateDoc(ref,{titulo});
   status.textContent='✅ Título guardado';
   await refreshVisibleAfterInteraction();
   setTimeout(()=>modal.classList.remove('open'),450);
  }catch(err){console.error(err);status.textContent='❌ No se pudo guardar';}
 };
 save.onclick=doSave;
 input.onkeydown=e=>{if(e.key==='Enter')doSave();if(e.key==='Escape')modal.classList.remove('open')};
};

window.subirImagenCategoria=async(e,cat)=>{
 const file=e.target.files[0];
 if(!file)return;
 if(!requireProfile()){e.target.value='';return;}
 const title=cats[cat].t.value.trim();
 const authorErr=validateSelectedAuthor(cat);if(authorErr){setE(cat,'❌ '+authorErr,'err');e.target.value='';return;}
 setE(cat,'Comprimiendo imagen...');
 try{
  const src=await comprimir(file);
  if(src.length>800000){
   setE(cat,'❌ Imagen demasiado pesada incluso comprimida.','err');
   e.target.value='';
   return;
  }
  await initFirebase();
  const owner=currentProfile();
  const author=getSelectedUploadAuthor(cat);
  const docRef=await fb.addDoc(noticias,{titulo:title,src,categoria:cat,tipo:'imagen-firestore',fecha:fb.serverTimestamp(),author,owner,ownerId:owner.id,pinned:false,likes:[],comments:[]});
  cats[cat].t.value='';
  resetUploadAuthor(cat);
  e.target.value='';

  // SOLUCIÓN: mostrar la imagen al instante sin tener que pulsar F5.
  // Firestore puede tardar unos milisegundos en devolver el nuevo documento en getDocs(),
  // así que pintamos una copia local inmediata y luego recargamos suavemente para ordenar.
  const g=cats[cat]?.g;
  if(g){
   const emptyBox=g.querySelector('.empty');
   if(emptyBox)emptyBox.remove();
   paint(g,{titulo:title,src,categoria:cat,tipo:'imagen-firestore',fecha:Date.now(),author,owner,ownerId:owner.id,pinned:false,likes:[],comments:[]},docRef.id,true);
  }

  state[cat].loaded=false;
  setE(cat,'✅ Publicado en '+cats[cat].n+'.','okmsg');

  // Recarga de seguridad para sincronizar con Firestore y mantener el orden correcto.
  setTimeout(()=>{
   if(activeCategory===cat){
    cargarCategoria(cat,true);
   }
  },900);
 }catch(err){
  console.error(err);
  setE(cat,'❌ No se pudo publicar.','err');
  e.target.value='';
 }
};
function ensureDeletePostModal(){
 let modal=document.getElementById('delete-post-modal');
 if(modal)return modal;
 modal=document.createElement('div');
 modal.id='delete-post-modal';
 modal.className='delete-post-modal';
 modal.innerHTML=`<div class="delete-post-box"><button type="button" class="delete-post-close" id="delete-post-close">&times;</button><div class="delete-post-head"><div class="delete-post-icon">🗑️</div><div><h3>Borrar publicación</h3><p>Esta imagen se eliminará de la sección. Esta acción no se puede deshacer.</p></div></div><div class="delete-post-preview" id="delete-post-preview"><img id="delete-post-preview-img" alt="Vista previa de la publicación"></div><div class="delete-post-actions"><button type="button" class="delete-post-cancel" id="delete-post-cancel">Cancelar</button><button type="button" class="delete-post-confirm" id="delete-post-confirm">Sí, borrar</button></div><div class="delete-post-status" id="delete-post-status"></div></div>`;
 document.body.appendChild(modal);
 modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
 modal.querySelector('#delete-post-close').addEventListener('click',()=>modal.classList.remove('open'));
 modal.querySelector('#delete-post-cancel').addEventListener('click',()=>modal.classList.remove('open'));
 return modal;
}
function confirmarBorrarPublicacion(id){
 return new Promise(resolve=>{
  const modal=ensureDeletePostModal();
  const preview=modal.querySelector('#delete-post-preview');
  const img=modal.querySelector('#delete-post-preview-img');
  const status=modal.querySelector('#delete-post-status');
  const ok=modal.querySelector('#delete-post-confirm');
  const cancel=modal.querySelector('#delete-post-cancel');
  const close=modal.querySelector('#delete-post-close');
  const card=document.querySelector(`[data-id="${id}"]`);
  const src=card?.querySelector('img')?.src||'';
  status.textContent='';
  if(src){img.src=src;preview.classList.add('show')}else{img.removeAttribute('src');preview.classList.remove('show')}
  modal.classList.add('open');
  const cleanup=(value)=>{ok.onclick=null;cancel.onclick=null;close.onclick=null;modal.classList.remove('open');resolve(value)};
  ok.onclick=()=>cleanup(true);
  cancel.onclick=()=>cleanup(false);
  close.onclick=()=>cleanup(false);
 });
}
window.borrarFotoPrensaReal=async id=>{
 const modal=ensureDeletePostModal();
 const status=modal.querySelector('#delete-post-status');
 const confirmed=await confirmarBorrarPublicacion(id);
 if(!confirmed)return;
 try{
  modal.classList.add('open');
  status.textContent='Borrando publicación...';
  await initFirebase();
  await fb.deleteDoc(fb.doc(db,'noticias',id));
  state[activeCategory].loaded=false;
  status.textContent='✅ Publicación borrada';
  await cargarCategoria(activeCategory,true);
  setTimeout(()=>modal.classList.remove('open'),450);
 }catch(err){
  console.error(err);
  status.textContent='❌ No se pudo borrar la publicación';
 }
};

/* ===== SISTEMA DE NOVEDADES POR USUARIO ===== */
function getSeen(cat){return Number(localStorage.getItem('premier_seen_'+cat)||0)}function setSeen(cat,ms=Date.now()){localStorage.setItem('premier_seen_'+cat,String(ms))}function hasSeenKey(cat){return localStorage.getItem('premier_seen_'+cat)!==null}function currentTabId(){return document.querySelector('.tab.active')?.id||'inicio'}
const notifState={memes:{count:0,latest:0,initial:false},clubes:{count:0,latest:0,initial:false},premier:{count:0,latest:0,initial:false}};let soundEnabled=localStorage.getItem('premier_sound_enabled')==='1';let audioCtx=null;const soundBtn=document.getElementById('sound-toggle');const soundHint=document.getElementById('sound-hint');function paintSoundBtn(){if(!soundBtn)return;soundBtn.classList.toggle('off',!soundEnabled);soundBtn.textContent=soundEnabled?'🔊 Sonido ON':'🔇 Sonido OFF'}function ensureAudio(){try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();return audioCtx}catch(e){return null}}function playNewSound(){if(!soundEnabled)return;const ctx=ensureAudio();if(!ctx)return;const now=ctx.currentTime;[880,1175,1568].forEach((freq,i)=>{const osc=ctx.createOscillator();const gain=ctx.createGain();osc.type='sine';osc.frequency.setValueAtTime(freq,now+i*.09);gain.gain.setValueAtTime(0.0001,now+i*.09);gain.gain.exponentialRampToValueAtTime(0.13,now+i*.09+.015);gain.gain.exponentialRampToValueAtTime(0.0001,now+i*.09+.12);osc.connect(gain);gain.connect(ctx.destination);osc.start(now+i*.09);osc.stop(now+i*.09+.14)})}function updateBadge(cat,count){const dot=document.getElementById('dot-'+cat),num=document.getElementById('count-'+cat);if(dot)dot.classList.toggle('show',count>0);if(num){num.textContent=count>99?'99+':String(count);num.classList.toggle('show',count>0)}}function showNewToast(cat,count){const toast=document.getElementById('new-toast');if(!toast)return;const names={memes:'Zona Memes',clubes:'Comunicados Clubes',premier:'Comunicados Premier'};const n=count>1?count+' nuevas publicaciones':'1 nueva publicación';toast.innerHTML='🔔 <b>'+n+'</b> en '+(names[cat]||'la liga');toast.classList.add('show');clearTimeout(window.__newToastTimer);window.__newToastTimer=setTimeout(()=>toast.classList.remove('show'),4200)}function computeNewFromDocs(cat,docs){const seen=getSeen(cat);let count=0,latest=0;docs.forEach(d=>{const ms=fechaMs(d.data());if(ms>latest)latest=ms;if(ms>seen)count++});return{count,latest}}function markSeen(cat){const latest=notifState[cat]?.latest||Date.now();setSeen(cat,Math.max(Date.now(),latest));notifState[cat].count=0;updateBadge(cat,0)}async function setupNotifications(){await initFirebase();Object.keys(cats).forEach(cat=>{const q=fb.query(noticias,fb.where('categoria','==',cat));fb.onSnapshot(q,(snap)=>{const docs=[];snap.forEach(d=>docs.push(d));const res=computeNewFromDocs(cat,docs);notifState[cat].latest=res.latest;if(!hasSeenKey(cat)){setSeen(cat,res.latest||Date.now());notifState[cat].count=0;updateBadge(cat,0);notifState[cat].initial=true;return;}const oldCount=notifState[cat].count;notifState[cat].count=res.count;updateBadge(cat,res.count);const map={memes:'memes',clubes:'comunicados-clubes',premier:'comunicados-premier'};const activeHere=currentTabId()===map[cat];if(activeHere&&res.count>0){markSeen(cat);return;}if(notifState[cat].initial&&res.count>oldCount&&!activeHere){playNewSound();showNewToast(cat,res.count-oldCount)}notifState[cat].initial=true;},err=>console.error('Error notificaciones '+cat,err));});}if(soundBtn){soundBtn.addEventListener('click',()=>{soundEnabled=!soundEnabled;localStorage.setItem('premier_sound_enabled',soundEnabled?'1':'0');if(soundEnabled)ensureAudio();paintSoundBtn();if(soundHint)soundHint.classList.remove('show')});}document.addEventListener('pointerdown',()=>{if(soundEnabled)ensureAudio()},{once:true});paintSoundBtn();setTimeout(()=>{if(!soundEnabled&&soundHint)soundHint.classList.add('show')},1200);setTimeout(()=>soundHint?.classList.remove('show'),7000);

const originalSwitchTab=window.switchTab;
window.switchTab=function(e,id){
 originalSwitchTab(e,id);
 const map={'memes':'memes','comunicados-clubes':'clubes','comunicados-premier':'premier'};
 if(map[id]){
  const cat=map[id];
  setTimeout(async()=>{
   markSeen(cat);
   await cargarCategoria(cat,false);
  },60);
 }
};
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('img').forEach(img=>{img.loading=img.loading||'lazy';img.decoding='async'});
 paintProfileUI();
 const pill=document.getElementById('profile-pill'); if(pill)pill.addEventListener('click',()=>openProfileModal(false));
 const close=document.getElementById('close-profile-btn'), xclose=document.getElementById('profile-x-close'); if(close)close.addEventListener('click',closeProfileModal); if(xclose)xclose.addEventListener('click',closeProfileModal);
 const name=document.getElementById('profile-name'), club=document.getElementById('profile-club'), file=document.getElementById('profile-avatar-file');
 function openProfilePhoto(){const src=file?.dataset.photo||currentProfile().photo||file?.dataset.avatar||currentProfile().avatar||DEFAULT_AVATAR;if(window.openProfilePhotoFront){window.openProfilePhotoFront(src)}else{const viewer=document.getElementById('profile-photo-viewer'),img=document.getElementById('profile-photo-viewer-img');if(viewer&&img){img.src=src;viewer.style.zIndex='2147483000';document.body.appendChild(viewer);document.body.classList.add('profile-photo-open');viewer.classList.add('open')}}}
 function updateClubChoices(){document.querySelectorAll('.club-choice').forEach(btn=>btn.classList.toggle('active',btn.dataset.club===(club?.value||'')))}
 function syncPreview(){paintProfilePreview({name:name.value||'Nuevo entrenador',club:club.value||'Sin club',avatar:file?.dataset.avatar||currentProfile().avatar,photo:file?.dataset.photo||currentProfile().photo||file?.dataset.avatar||currentProfile().avatar});updateClubChoices()}
 if(name)name.addEventListener('input',syncPreview); if(club)club.addEventListener('change',syncPreview);
 if(file)file.addEventListener('change',async()=>{const selected=file.files[0];const avatar=await fileToSmallAvatar(selected);const photo=await fileToProfilePhoto(selected);file.dataset.avatar=avatar;file.dataset.photo=photo;syncPreview()});
 if(club&&!document.getElementById('profile-club-picker')){const label=document.createElement('div');label.className='profile-field-label';label.textContent='Club o rol';const picker=document.createElement('div');picker.className='profile-club-picker';picker.id='profile-club-picker';Array.from(club.options).filter(o=>o.value||o.textContent.trim()).forEach(o=>{const btn=document.createElement('button');btn.type='button';btn.className='club-choice';btn.dataset.club=o.value||o.textContent;btn.textContent=o.textContent;btn.addEventListener('click',()=>{club.value=btn.dataset.club;club.dispatchEvent(new Event('change',{bubbles:true}))});picker.appendChild(btn)});club.insertAdjacentElement('beforebegin',label);club.insertAdjacentElement('afterend',picker);updateClubChoices()}
 const preview=document.querySelector('.profile-preview'),previewImg=document.getElementById('profile-preview-img');if(preview&&!document.getElementById('profile-change-photo-btn')){const tools=document.createElement('div');tools.className='profile-photo-tools';const change=document.createElement('button');change.type='button';change.className='profile-mini-btn';change.id='profile-change-photo-btn';change.textContent='📷 Cambiar foto';change.addEventListener('click',()=>file?.click());tools.append(change);preview.querySelector('div')?.appendChild(tools)}if(previewImg)previewImg.addEventListener('click',openProfilePhoto);
 const save=document.getElementById('save-profile-btn'); if(save)save.addEventListener('click',()=>{const n=(name.value||'').trim(),c=(club.value||'').trim(),st=document.getElementById('profile-status');if(!n||!c){if(st){st.textContent='❌ Rellena nombre y club/rol.';st.className='status err'}return}setProfile({name:n,club:c,avatar:file?.dataset.avatar||currentProfile().avatar,photo:file?.dataset.photo||currentProfile().photo||file?.dataset.avatar||currentProfile().avatar});if(st){st.textContent='✅ Perfil guardado.';st.className='status okmsg'}setTimeout(closeProfileModal,350)});
 if(!profileReady())setTimeout(()=>openProfileModal(true),650);
 setupNotifications().catch(console.error);setupUserNotifications().catch(console.error);const nf=document.getElementById('notify-fab'),np=document.getElementById('notify-panel'),nc=document.getElementById('notify-close');if(nf)nf.addEventListener('click',()=>{np?.classList.toggle('open');if(np?.classList.contains('open'))markAllNotificationsRead()});if(nc)nc.addEventListener('click',()=>np?.classList.remove('open'));
});


/* HOTFIX FINAL: album inicio + navegacion + publicaciones */
(function(){
'use strict';
function id(x){return document.getElementById(x)}
function qa(s,r=document){return Array.from(r.querySelectorAll(s))}
function norm(v){return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim()}
function navH(){const n=document.querySelector('nav');return n?Math.ceil(n.getBoundingClientRect().height):0}
function scrollTrack(trackId,dir){const t=id(trackId);if(!t)return;const a=Math.max(220,Math.floor(t.clientWidth*.82));t.scrollBy({left:a*(dir||1),behavior:'smooth'})}
window.scrollConsejoAlbum=function(dir){scrollTrack('consejo-track',dir)};
window.scrollClubAccounts=function(dir){scrollTrack('club-accounts-track',dir)};
function enhance(trackId){const t=id(trackId);if(!t||t.dataset.hot==='1')return;t.dataset.hot='1';t.tabIndex=0;t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();scrollTrack(trackId,1)} if(e.key==='ArrowLeft'){e.preventDefault();scrollTrack(trackId,-1)}});t.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){t.scrollLeft+=e.deltaY;e.preventDefault()}},{passive:false})}
function n(c,k){return Number(c.dataset[k]||0)}
window.applyGalleryFilters=function(cat){const g=id('galeria-'+cat);if(!g)return;const cards=qa('.imgcard.card',g);if(!cards.length)return;const search=norm(id('buscar-'+cat)?.value||'');const role=norm(id('filtro-'+cat)?.value||'');const order=(id('orden-'+cat)?.value||'new').toLowerCase();let visible=0;cards.forEach(c=>{const hay=norm([c.dataset.title,c.dataset.author,c.dataset.role,c.textContent].join(' '));const roleText=norm(c.dataset.role||'');const show=(!search||hay.includes(search))&&(!role||roleText.includes(role)||hay.includes(role));c.hidden=!show;c.style.display=show?'':'none';if(show)visible++});cards.sort((a,b)=>{const pin=(b.dataset.pinned==='1')-(a.dataset.pinned==='1');if(pin)return pin;if(order==='old')return n(a,'date')-n(b,'date');if(order==='likes')return n(b,'likes')-n(a,'likes')||n(b,'date')-n(a,'date');if(order==='comments')return n(b,'comments')-n(a,'comments')||n(b,'date')-n(a,'date');return n(b,'date')-n(a,'date')}).forEach(c=>g.appendChild(c));const st=id('estado-'+cat);if(st){st.textContent=visible===cards.length?`✅ ${cards.length} publicaciones cargadas.`:`🔎 Mostrando ${visible} de ${cards.length} publicaciones.`;st.className='status okmsg'}};
window.filtrarGaleria=function(cat){window.applyGalleryFilters(cat)};
window.ordenarGaleria=function(cat){window.applyGalleryFilters(cat)};
window.filtrarPorCuenta=function(nombre){if(typeof window.switchTab==='function')window.switchTab(null,'comunicados-clubes');setTimeout(()=>{const inp=id('buscar-clubes');if(inp)inp.value=nombre||'';const f=id('filtro-clubes');if(f)f.value='Cuenta de club';window.applyGalleryFilters('clubes');const g=id('galeria-clubes');if(g)window.scrollTo({top:Math.max(0,window.scrollY+g.getBoundingClientRect().top-navH()-18),behavior:'smooth'})},450)};
const old=window.switchTab;if(typeof old==='function'&&!window.__navHotfix){window.__navHotfix=1;window.switchTab=function(e,tab){old(e,tab);setTimeout(()=>{const el=id(tab);if(el)window.scrollTo({top:Math.max(0,window.scrollY+el.getBoundingClientRect().top-navH()-12),behavior:'smooth'});qa('nav .navbtn').forEach(b=>b.setAttribute('aria-pressed',b.classList.contains('active')?'true':'false'))},80)}}
function init(){enhance('consejo-track');enhance('club-accounts-track');const nav=document.querySelector('nav');if(nav&&!nav.dataset.hot){nav.dataset.hot='1';nav.setAttribute('aria-label','Navegación principal');nav.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){nav.scrollLeft+=e.deltaY;e.preventDefault()}},{passive:false})}['memes','clubes','premier'].forEach(cat=>['buscar-','filtro-','orden-'].forEach(p=>{const el=id(p+cat);if(el&&!el.dataset.hot){el.dataset.hot='1';el.addEventListener(p==='buscar-'?'input':'change',()=>window.applyGalleryFilters(cat))}}))}
document.addEventListener('DOMContentLoaded',init);setTimeout(init,300);setTimeout(init,1200);
})();
