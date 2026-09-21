const root=document.documentElement;
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Copy subscription URLs.
document.querySelectorAll('[data-copy]').forEach(btn=>{
  btn.addEventListener('click',async()=>{
    const url=btn.dataset.copy;
    let ok=false;
    try{await navigator.clipboard.writeText(url);ok=true}catch{}
    if(!ok){const ta=document.createElement('textarea');ta.value=url;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok=true}catch{}ta.remove()}
    btn.classList.add('done');
    btn.textContent=ok?'Скопировано':'Скопируйте URL';
    const toast=document.getElementById('toast');toast.classList.add('show');
    setTimeout(()=>{toast.classList.remove('show');btn.classList.remove('done');btn.textContent='Скопировать'},1600);
  });
});

// Subscription / pipeline tabs.
const tabs=[...document.querySelectorAll('.tab')];
const panels=[...document.querySelectorAll('.tab-panel')];
tabs.forEach(tab=>tab.addEventListener('click',()=>{
  const id=tab.dataset.tab;
  tabs.forEach(t=>{const on=t===tab;t.classList.toggle('active',on);t.setAttribute('aria-selected',String(on))});
  panels.forEach(p=>p.classList.toggle('active',p.id===id));
}));

// Scroll progress.
addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  document.getElementById('progress').style.width=(max>0?scrollY/max*100:0)+'%';
},{passive:true});

// Entrance animation.
if(!reduce && 'IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -5% 0px'});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=Math.min(i*55,220)+'ms';io.observe(el)});
}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));

// Animated stat counters.
const counters=document.querySelectorAll('[data-count]');
if('IntersectionObserver' in window){
  const cio=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,to=Number(el.dataset.count);let start=performance.now();
    const tick=now=>{const p=Math.min(1,(now-start)/850);const eased=1-Math.pow(1-p,4);el.textContent=Math.round(to*eased);if(p<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick);cio.unobserve(el);
  }),{threshold:.7});
  counters.forEach(c=>cio.observe(c));
}else counters.forEach(c=>c.textContent=c.dataset.count);

// Tiny pointer parallax for desktop only; deliberately subtle.
if(!reduce && matchMedia('(hover:hover) and (pointer:fine)').matches){
  const hero=document.querySelector('.hero');
  addEventListener('pointermove',e=>{
    const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);
    root.style.setProperty('--px',(x*10).toFixed(2)+'px');
    root.style.setProperty('--py',(y*7).toFixed(2)+'px');
  },{passive:true});
  hero.addEventListener('pointermove',e=>{
    const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    hero.style.transform=`perspective(1400px) rotateX(${(-y*1.2).toFixed(2)}deg) rotateY(${(x*1.2).toFixed(2)}deg)`;
  });
  hero.addEventListener('pointerleave',()=>hero.style.transform='');
}
