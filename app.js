'use strict';
for(const [i,a] of artworks.entries()){
 const article=document.createElement('article');article.className='art-card';article.dataset.category=a.category;
 article.innerHTML=`<button class="art-image image-open" data-artwork="${i}" aria-label="放大欣賞${a.title}"><img src="assets/${a.file}.jpg" width="${a.width}" height="${a.height}" alt="葛飾北齋《${a.title}》" loading="lazy"><span class="zoom-label" aria-hidden="true">＋</span></button><div class="art-meta"><span>${a.series}</span><span>${a.date}</span></div><h3>${a.title}</h3><p>${a.desc}</p><p class="look">看畫提示｜${a.look}</p><a class="text-link" href="https://www.metmuseum.org/art/collection/search/${a.id}" target="_blank" rel="noopener">The Met · ${a.number} · 典藏資料 ↗</a>`;
 document.querySelector(`[data-art-group="${a.category}"]`).append(article);
 const credit=document.createElement('div');credit.className='credit';credit.innerHTML=`<a href="https://www.metmuseum.org/art/collection/search/${a.id}" target="_blank" rel="noopener">葛飾北齋《${a.title}》｜${a.number} ↗</a><p>${a.date}。${a.credit}。The Metropolitan Museum of Art, New York. Public Domain / Open Access CC0.</p>`;document.getElementById('credits').append(credit);
}
const mangaCredit=document.createElement('div');mangaCredit.className='credit';mangaCredit.innerHTML='<a href="https://www.metmuseum.org/art/collection/search/57679" target="_blank" rel="noopener">《北齋漫畫・初編》參考圖｜JIB81.1 ↗</a><p>1828年後。Rogers Fund, 1931. The Metropolitan Museum of Art, New York. Public Domain / Open Access CC0.</p>';document.getElementById('credits').append(mangaCredit);
for(const b of document.querySelectorAll('[data-filter]'))b.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(el=>{const active=el===b;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active))});
 document.querySelectorAll('.theme-group').forEach(el=>el.hidden=b.dataset.filter!=='all'&&el.dataset.theme!==b.dataset.filter);
});
const studies=[
{title:'浪花像伸開的指爪',text:'捲起的浪頭被清晰輪廓切成細密的白色浪花。巨大的弧線把視線帶向中央，也把小船包圍起來。',label:'01 · 浪的弧線',left:'28%',top:'14%',width:'21%',height:'30%'},
{title:'在巨大自然裡，仍有人的勞動',text:'仔細找出伏低身體的船員。長船的斜線與浪的曲線交錯，讓觀看者感受到一個尚未結束的瞬間。',label:'02 · 船與人的尺度',left:'65%',top:'68%',width:'30%',height:'22%'},
{title:'山很小，卻讓畫面安定下來',text:'遠方富士的三角形，被放進大浪形成的空間中。這是一次用大小對比與遠近關係安排視線的巧思。',label:'03 · 遠方的富士',left:'62%',top:'57%',width:'15%',height:'21%'}
];
for(const b of document.querySelectorAll('[data-study]'))b.addEventListener('click',()=>{
 const d=studies[Number(b.dataset.study)];document.querySelectorAll('[data-study]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});
 const box=document.getElementById('study-text');box.replaceChildren();const h=document.createElement('h3');h.textContent=d.title;const p=document.createElement('p');p.textContent=d.text;box.append(h,p);
 const ring=document.querySelector('.focus-ring');for(const prop of ['left','top','width','height'])ring.style[prop]=d[prop];document.querySelector('.study-label').textContent=d.label;
});
const dialog=document.getElementById('lightbox'),lbImg=document.getElementById('lightbox-img'),lbCaption=document.getElementById('lightbox-caption'),lbCount=document.getElementById('lightbox-count');
let artworkIndex=null;
function showImage(src,caption){lbImg.src=src;lbImg.alt=caption;lbCaption.textContent=caption;lbCount.textContent=artworkIndex===null?'作品欣賞':`典藏作品 ${artworkIndex+1} / ${artworks.length}`;document.getElementById('lightbox-prev').disabled=artworkIndex===null;document.getElementById('lightbox-next').disabled=artworkIndex===null;if(!dialog.open){dialog.showModal();document.body.classList.add('modal-open')}}
function showArtwork(i){artworkIndex=(i+artworks.length)%artworks.length;const a=artworks[artworkIndex];showImage(`assets/${a.file}.jpg`,`《${a.title}》｜${a.date}｜The Met，${a.number} · Public Domain`)}
document.querySelectorAll('.image-open').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.artwork!==undefined)showArtwork(Number(b.dataset.artwork));else{artworkIndex=null;showImage(b.dataset.image,b.dataset.caption)}}));
document.getElementById('lightbox-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.getElementById('lightbox-prev').addEventListener('click',()=>showArtwork(artworkIndex-1));document.getElementById('lightbox-next').addEventListener('click',()=>showArtwork(artworkIndex+1));
dialog.addEventListener('keydown',e=>{if(artworkIndex!==null&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();showArtwork(artworkIndex+(e.key==='ArrowRight'?1:-1))}});
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){nav.querySelectorAll('a').forEach(a=>{const active=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}},{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('main section[id]').forEach(el=>observer.observe(el))}
