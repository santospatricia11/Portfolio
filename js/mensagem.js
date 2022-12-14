var cardForm = document.getElementById("contato-form");
cardForm.addEventListener("submit", (e) => {
  ///nao recarregar a página
  e.preventDefault();
  /// receber dados do formulario
  console.log("tetesetssss");
  var nome_usuario = document.getElementById("nome_usuario").value;
  var email_usuario = document.getElementById("email_usuario").value;
  var mensagem_usuario = document.getElementById("mensagem_usuario").value;

  // console.log(nome);
  //console.log(email);

  //salvar usando arry de objetos
  let usuarios = new Array();
  // verificar o localStorage se ja existe usuarios.
  //recuperar os valores da propriedades usuarios  do localstorage
  //converter a String para objeto
  if (localStorage.hasOwnProperty("usuarios")) {
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    //      JSON.parse(localStorage.getItem("usuarios"));
  }
  /// add ojeto no usuarios

  console.error("tres");
  usuarios.push({ nome_usuario, email_usuario, mensagem_usuario });

  //salvar no localStrorage
  //e converter o ojeto usuarios em string
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
});
