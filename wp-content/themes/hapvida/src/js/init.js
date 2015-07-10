/* **************************************************************
  #Inicia as funções e plugins

* ***************************************************************/
(function() {
  // Ativa o menu mobile
  app.menu();

  // Ativa o slideshow, se presente na página.
  var slideshow = document.getElementById("slider");

  if(slideshow) {
    window.mySwipe = new Swipe(slideshow, {
      speed: 400,
      auto: 4000,
      continuous: false,
      callback: function(){

        // Ativa os bullets de navegação do slideshow
        var i  = mySwipe.getPos(),
            el = document.querySelectorAll("#slider > ul > li");

        // Remove a classe ".is-active" de todos os bullets
        for(var x = 0; x < el.length; x++) {
          if(el[x].classList.contains("is-active")) {
            el[x].classList.remove("is-active");
          }
        };

        // Ativa a bullet correta
        el[i].classList.add("is-active");

      }
    });

  };
})();
