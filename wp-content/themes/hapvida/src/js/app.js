/* **************************************************************
  #Instancia o App

    Cria a variável global para o website, evitando poluir
    o escopo global e melhorando a performance.
    Sempre que possível, estanda este objeto ao invez de criar
    novas variáveis e/ou funções globais.
* ***************************************************************/
var app = {};



/* **************************************************************
  #Polyfill para classList

    Testa por suporte ao método classList e carrega um Polyfill
    para adicionar o suporte aos browsers antigos se necessário,
    possibilitando o usuo seguro do mesmo.

    Use assim:
      var el = document.querySelector(".minha-div");
      // Adiciona a classe
      el.classList.add("active");

      // Remove a classe
      el.classList.remove("active");

      // Adiciona ou remove a classe
      el.classList.toggle("active");
* ***************************************************************/
yepnope({
  test : Modernizr.classlist,
  nope : "https://cdnjs.cloudflare.com/ajax/libs/classlist/2014.01.31/classList.min.js"
});
