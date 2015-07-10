/* **************************************************************
  #Modal Seletor de cidade
  
  Resposável pelo modal seletor de cidade.
  
* ***************************************************************/

app.modal = function() {
  var modal = document.getElementById("select-city");
  
  if(modal) {
    var wrap = document.getElementById("wrap");
    
    document.body.classList.add("has-modal");
  }
}

app.modalClose = function(el) {
  el.addEventListener("click", function() {
    document.body.classList.remove("has-modal");
  });
}

document.addEventListener("DOMContentLoaded", function() {
  app.modal();
  app.modalClose(document.getElementById("modal-close"));
});