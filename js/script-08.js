// js/script-08.js - separado desde index.html
(function(){
 const MUSIC_KEY='premier_osm_music_on_v3';
 let lastHandled=0;
 function audioEl(){return document.getElementById('bgm-audio')}
 function btnEl(){return document.getElementById('bgm-audio-btn')}
 function paintMusic(on){const b=btnEl();if(!b)return;b.textContent=on?'🔊 Música ON':'🔇 Música OFF';b.classList.toggle('music-on',!!on);b.classList.toggle('on',!!on);b.style.display='inline-flex';b.style.visibility='visible';b.style.opacity='1'}
 async function forcePlay(){const a=audioEl();if(!a)return false;try{a.volume=.55;a.muted=false;a.loop=true;a.playsInline=true;await a.play();localStorage.setItem(MUSIC_KEY,'1');paintMusic(true);return true}catch(e){localStorage.setItem(MUSIC_KEY,'0');paintMusic(false);return false}}
 function forcePause(){const a=audioEl();try{if(a)a.pause()}catch(_){}localStorage.setItem(MUSIC_KEY,'0');paintMusic(false)}
 async function toggleMusic(ev){if(ev){ev.preventDefault();ev.stopPropagation();if(ev.stopImmediatePropagation)ev.stopImmediatePropagation()}const desiredOn=localStorage.getItem(MUSIC_KEY)!=='1';lastHandled=Date.now();if(desiredOn){await forcePlay()}else{forcePause()}}
 function bind(){const b=btnEl(),a=audioEl();if(!b||b.dataset.musicFixed==='1')return;b.dataset.musicFixed='1';paintMusic(localStorage.getItem(MUSIC_KEY)==='1'&&a&&!a.paused);['pointerdown','touchstart','click'].forEach(type=>{b.addEventListener(type,function(ev){if(type==='click'&&Date.now()-lastHandled<450){ev.preventDefault();ev.stopPropagation();if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();return}toggleMusic(ev)},true)});if(a){a.volume=.55;a.addEventListener('play',()=>paintMusic(true));a.addEventListener('pause',()=>paintMusic(false));a.addEventListener('volumechange',()=>{try{if(a.volume<.45)a.volume=.55}catch(_){}})}}
 document.addEventListener('DOMContentLoaded',()=>{bind();setInterval(bind,1000)});
 window.fixPremierMusicButton=bind;
})();
