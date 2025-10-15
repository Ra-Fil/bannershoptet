<!-- Banner+ -->
<div id="favorite-categories" class="favorite-categories" aria-label="Oblíbené kategorie" style="display:none">
  <h2>Oblíbené kategorie:</h2>
  <div class="favorite-wrapper">

    <div class="favorite-item">
      <a href="/povolani" class="fav-card">
        <img src="https://www.abyto.cz/user/documents/Abyto-banner-povolani-1.jpg" alt="Povolání" class="fav-img" loading="lazy">
        <div class="fav-btn"><span>Povolání »</span></div>
      </a>
    </div>

    <div class="favorite-item">
      <a href="/zviratka" class="fav-card">
        <img src="https://www.abyto.cz/user/documents/Abyto-banner-zviratka-1.jpg" alt="Zvířátka" class="fav-img" loading="lazy">
        <div class="fav-btn"><span>Zvířátka »</span></div>
      </a>
    </div>

    <div class="favorite-item">
      <a href="/advent" class="fav-card">
        <img src="https://www.abyto.cz/user/documents/Abyto-banner-advent-2.jpg" alt="Advent" class="fav-img" loading="lazy">
        <div class="fav-btn"><span>Advent » </span></div>
      </a>
    </div>

  </div>
</div>

<style>
.favorite-categories {
  text-align: center;
  margin: 40px 0;
}
.favorite-categories h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #000;
}

.favorite-wrapper {
  display: grid;
  grid-template-columns: 1fr; /* mobil */
  gap: 20px;
  width: 100%;
}
@media (min-width: 600px){
  .favorite-wrapper { grid-template-columns: repeat(3, 1fr); } /* desktop */
}

.favorite-item { width: 100%; }

.fav-card{
  display: block;
  border-radius: 0;
  overflow: hidden;
  text-decoration: none;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transform: translateY(0);
  transition: transform .2s ease, box-shadow .2s ease;
}
.fav-card:hover{
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.fav-img{
  display: block;
  width: 100%;
  height: 120px;          /* pevná výška pro mobil */
  object-fit: cover;      /* ořízne, pokud je fotka větší */
  object-position: center;
}
@media (min-width: 600px){
  .fav-img{ height: 180px; }  /* pevná výška pro desktop */
}

.fav-btn{
  background: #cf4d7b;
  padding: 7px 12px;
  text-align: center;
}
.fav-btn span{
  font-size: 18px;
  font-weight: 300;
  color: #fff;
  text-decoration: underline
}
.fav-card:hover .fav-btn{
  background: #df8ba8;
}
</style>

<script>
(function () {
  function onReady(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  function isHome(){
    return location.pathname === '/' ||
           document.body.classList.contains('homepage') ||
           document.documentElement.classList.contains('homepage');
  }
  function getBenefits(){
    return document.querySelector('.benefitBanner.position--benefitHomepage')
        || document.querySelector('.benefitBanner');
  }
  function getProductsHeading(){
    return document.querySelector('.homepage-group-title.homepage-products-heading-4')
        || document.querySelector('.homepage-group-title');
  }
  function place(){
    var box = document.getElementById('favorite-categories');
    if (!box || box.dataset.moved === '1') return false;

    var benefits = getBenefits();
    if (benefits){
      benefits.insertAdjacentElement('afterend', box);
      box.dataset.moved = '1';
      box.style.display = '';
      return true;
    }
    var heading = getProductsHeading();
    if (heading){
      heading.insertAdjacentElement('beforebegin', box);
      box.dataset.moved = '1';
      box.style.display = '';
      return true;
    }
    return false;
  }

  onReady(function(){
    if (!isHome()){
      var box = document.getElementById('favorite-categories');
      if (box){ /* necháme skryté */ }
      return;
    }
    if (place()) return;

    var tries = 0;
    var iv = setInterval(function(){
      tries++;
      if (place() || tries > 120) clearInterval(iv);
    }, 125);

    var mo = new MutationObserver(function(){
      if (place()) mo.disconnect();
    });
    mo.observe(document.documentElement, {childList:true, subtree:true});
    setTimeout(function(){ try{ mo.disconnect(); } catch(e){} }, 16000);
  });
})();
</script>
<!-- Banner+ konec -->