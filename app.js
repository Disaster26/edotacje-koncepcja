(function(){
  var burger=document.getElementById('burger'), menu=document.getElementById('menu');
  function zamknij(){menu.classList.remove('otwarte');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Otwórz menu');}
  burger.addEventListener('click',function(){
    var o=menu.classList.toggle('otwarte');
    burger.setAttribute('aria-expanded',o?'true':'false');
    burger.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');
  });
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',zamknij);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij();});

  // dolny pasek na telefonie dopiero po przewinieciu za przycisk w hero
  var mob=document.getElementById('mob'), cta=document.getElementById('heroCta'), kontakt=document.getElementById('kontakt');
  var zaHero=false, przyKontakcie=false;
  function odswiez(){mob.classList.toggle('widac',zaHero&&!przyKontakcie);}
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(w){zaHero=!w[0].isIntersecting&&w[0].boundingClientRect.top<0;odswiez();}).observe(cta);
    new IntersectionObserver(function(w){przyKontakcie=w[0].isIntersecting;odswiez();},{threshold:.15}).observe(kontakt);
  }

  // formularz (wizualizacja - bez wysylki)
  var f=document.getElementById('form');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=true;
    f.querySelectorAll('[required]').forEach(function(el){
      var dobry=el.type==='checkbox'?el.checked:el.value.trim()!=='';
      el.classList.toggle('blad',!dobry); if(!dobry) ok=false;
    });
    if(!ok) return;
    document.getElementById('formOk').hidden=false;
    f.querySelector('button[type=submit]').disabled=true;
  });
})();
