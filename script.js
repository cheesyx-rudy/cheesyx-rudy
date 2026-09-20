document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(button.dataset.copy)}catch{prompt('Скопируйте ссылку:',button.dataset.copy)}const t=document.getElementById('toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1600)}));

const root=document.documentElement;
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce){
  const move=(x,y)=>{root.style.setProperty('--mx',(8+(x/window.innerWidth)*84)+'%');root.style.setProperty('--my',(8+(y/window.innerHeight)*84)+'%')};
  window.addEventListener('pointermove',e=>move(e.clientX,e.clientY),{passive:true});
  const applyTilt=(x,y)=>{const px=Math.max(-1,Math.min(1,x)),py=Math.max(-1,Math.min(1,y));root.style.setProperty('--mx',(50+px*24)+'%');root.style.setProperty('--my',(35+py*20)+'%')};
  window.addEventListener('deviceorientation',e=>{if(typeof e.gamma==='number'&&typeof e.beta==='number')applyTilt(e.gamma/35,(e.beta-35)/35)},{passive:true});
  document.querySelectorAll('.hero,.card,.clients a,.terminal').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--rx',(-y*1.8)+'deg');el.style.setProperty('--ry',(x*1.8)+'deg');el.style.transform='perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))'});el.addEventListener('pointerleave',()=>{el.style.transform='';})});
}
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
