/* **************************************************************
  #Função menu

    Responsável pelas interações do menu. A versão mobile
    depende desta função.
* ***************************************************************/

// Cria função menu
app.menu = function() {

  // Seleciona o ícone do menu
  var button = document.getElementById("menu-button"),
      nav    = document.getElementById("nav-main");

  // Adiciona o evento click no ícone
  if(document.addEventListener) {
    button.addEventListener('click', function() {
      menuToggle(nav);
    });
  }

  // Função que ativa e desativa o menu
  function menuToggle(el) {
    el.classList.toggle("is-active");
  };

}
