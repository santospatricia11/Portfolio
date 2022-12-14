function carregar() {
    if (localStorage.info) {
        document.getElementById("mensagem_usuario").value = localStorage.info;
    }
}