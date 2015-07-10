/* **************************************************************
  #Adiciona os Bullets de navegação do slideshow
  
    Tudo relacionado ao slideshow estende o objeto mySwipe e
    não o objeto app.

* ***************************************************************/
if(document.getElementById("slider")) {
  mySwipe.addBullets = function(el) {

    // Insere a ul que comporta os bullets
    el.insertAdjacentHTML("afterbegin", "<ul class='swipe-bullets' id='bullets'></ul>");

    var bullets    = document.getElementById("bullets"),
        slidesNum  = mySwipe.getNumSlides(),
        slides     = [];

    // Um bullet para cada slide...
    for(var i = 0; i < slidesNum; i++) {
      slides.push("<li onclick='mySwipe.slide(" + i + ", 400);'></li>");
    }

    // Insere as bullets na página
    slides = slides.join("");
    bullets.insertAdjacentHTML("afterbegin", slides);

    // Ativa a bullet inicial
    var firstBullet = document.querySelectorAll("#bullets > li")[0];
    firstBullet.classList.add("is-active");

  }
  
  // Equaliza a altura do slideshow com a coluna vizinha
  mySwipe.equalize = function() {
    // Largura do viewport (área útil da página no browser)
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if(document.body.classList.contains("home") && viewportWidth >= 750) {
      var slider         = document.getElementById("slider"),
          sliderSibiling = slider.parentNode.nextElementSibling,
          wrap           = slider.parentNode.parentNode,
          sliders        = document.querySelectorAll(".swipe-wrap > div"),
          slideImg;
      
      for(var i = 0; i < sliders.length; i++){
        slideImg = sliders[i].querySelector("img");
        sliders[i].style.background = "url(" + slideImg.getAttribute("src") + ") center no-repeat";
        sliders[i].style.backgroundSize = "cover";
        sliders[i].style.height = Math.max(wrap.clientHeight, sliderSibiling.clientHeight);
        sliders[i].innerHTML = "";
      }
      
    }
  }


  // Cria as bullets
  mySwipe.addBullets(document.getElementById("slider"));
  
  document.addEventListener("DOMContentLoaded", function() {
    // Equaliza as colunas quando carrega a página
    mySwipe.equalize();
  });
};
