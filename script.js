(function(){
  var d=document,root=d.documentElement,h=d.querySelector('.site-header'),t=d.querySelector('.nav-toggle'),n=d.getElementById('nav');
  root.classList.remove('no-js');root.classList.add('js');
  var still=window.matchMedia('(prefers-reduced-motion: reduce)');
  function close(){n.classList.remove('open');t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Open menu');d.body.style.overflow='';}
  t.addEventListener('click',function(){var o=t.getAttribute('aria-expanded')==='true';if(o){close();}else{n.classList.add('open');t.setAttribute('aria-expanded','true');t.setAttribute('aria-label','Close menu');d.body.style.overflow='hidden';}});
  n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  function onScroll(){h.classList.toggle('scrolled',window.scrollY>8);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  // reveal on scroll
  var els=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !still.matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:.08});
    els.forEach(function(el){io.observe(el);});
  } else { els.forEach(function(el){el.classList.add('in');}); }
  // follow-spot in the hero (pointer devices only, motion allowed)
  var hero=d.querySelector('.hero');
  if(hero && !still.matches && window.matchMedia('(pointer:fine)').matches){
    hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();hero.style.setProperty('--x',(e.clientX-r.left)+'px');hero.style.setProperty('--y',(e.clientY-r.top)+'px');});
  }
  // rental wishlist
  var f=d.getElementById('inquiry'),wl=f.elements.wishlist,cnt=d.querySelector('.wish-count'),picked=[];
  function sync(){wl.value=picked.join('\n');cnt.textContent='('+picked.length+')';}
  d.querySelectorAll('.kit').forEach(function(b){b.addEventListener('click',function(){
    var name=b.textContent.trim(),on=b.getAttribute('aria-pressed')!=='true';
    d.querySelectorAll('.kit').forEach(function(o){if(o.textContent.trim()===name)o.setAttribute('aria-pressed',on?'true':'false');});
    var i=picked.indexOf(name);if(on&&i<0)picked.push(name);if(!on&&i>-1)picked.splice(i,1);sync();
  });});
  wl.addEventListener('input',function(){picked=wl.value.split('\n').map(function(s){return s.trim();}).filter(Boolean);cnt.textContent='('+picked.length+')';
    d.querySelectorAll('.kit').forEach(function(o){o.setAttribute('aria-pressed',picked.indexOf(o.textContent.trim())>-1?'true':'false');});});
  // inquiry form -> pre-filled email to info@nrglites.com
  var note=f.querySelector('.form-note');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var v=function(k){return (f.elements[k].value||'').trim();};
    var miss=['first','last','email','subject','message'].filter(function(k){return !v(k);});
    if(miss.length||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('email'))){note.textContent='Please fill in your name, a valid email, a subject and a message.';note.classList.add('err');(f.elements[miss[0]||'email']).focus();return;}
    note.classList.remove('err');
    var body='Name: '+v('first')+' '+v('last')+'\nEmail: '+v('email')+'\n\n'+v('message')+(v('wishlist')?'\n\nWishlist:\n'+v('wishlist'):'');
    location.href='mailto:info@nrglites.com?subject='+encodeURIComponent(v('subject'))+'&body='+encodeURIComponent(body);
    note.textContent='Thanks! Your email app should open with your message ready to send.';
  });
  var y=d.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
})();
