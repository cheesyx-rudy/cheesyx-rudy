document.documentElement.classList.add('js');
const buttons=document.querySelectorAll('[data-copy]');
buttons.forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(button.dataset.copy)}catch{prompt('Скопируйте ссылку:',button.dataset.copy)}const t=document.getElementById('toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1600)}));
const root=document.documentElement, body=document.body, reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce){
 const orb=document.querySelector('.cursor-orb');
 window.addEventListener('pointermove',e=>{root.style.setProperty('--mx',(8+e.clientX/innerWidth*84)+'%');root.style.setProperty('--my',(8+e.clientY/innerHeight*84)+'%');if(orb){orb.style.left=e.clientX+'px';orb.style.top=e.clientY+'px'}},{passive:true});
 window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;root.style.setProperty('--scroll',(max>0?(scrollY/max*100):0)+'%')},{passive:true});
 document.querySelectorAll('.tilt').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX/r.width-.5,y=e.clientY/r.height-.5;el.style.transform=`perspective(1000px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-3px)`});el.addEventListener('pointerleave',()=>{el.style.transform=''});});
 window.addEventListener('deviceorientation',e=>{if(typeof e.gamma==='number'&&typeof e.beta==='number'){root.style.setProperty('--mx',(50+Math.max(-1,Math.min(1,e.gamma/35))*24)+'%');root.style.setProperty('--my',(35+Math.max(-1,Math.min(1,(e.beta-35)/35))*20)+'%')}} ,{passive:true});
}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
