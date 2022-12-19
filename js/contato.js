"use strict";
//inicio
const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};
//transformando o ojeto em uma array de string
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_contato")) ?? [];
const setLocalStorage = (dbContato) =>
  localStorage.setItem("db_contato", JSON.stringify(dbContato));

const deleteContato = (index) => {
  const dbContato = readContato();
  dbContato.splice(index, 1);
  setLocalStorage(dbContato);
};

const updateContato = (index, contato) => {
  const dbContato = readContato();
  dbContato[index] = contato;
  setLocalStorage(dbContato);
};

const readContato = () => getLocalStorage();

const createContato = (contato) => {
  const dbContato = getLocalStorage();
  dbContato.push(contato);
  setLocalStorage(dbContato);
};

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

//Interação com o layout

const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = ""));
  document.getElementById("nome").dataset.index = "new";
  document.querySelector(".modal-header>h2").textContent = "Novo Contato";
};

const saveContato = () => {
  if (isValidFields()) {
    const contato = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      celular: document.getElementById("celular").value,
      mensagem: document.getElementById("mensagem").value,
    };
    const index = document.getElementById("nome").dataset.index;
    if (index == "new") {
      const response = confirm(`Contato Salvo Como ${contato.nome}`);
      createContato(contato);
      updateTable();
      closeModal();
    } else {
      updateContato(index, contato);
      updateTable();
      closeModal();
    }
  }
};

const createRow = (contato, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${contato.nome}</td>
        <td>${contato.email}</td>
        <td>${contato.celular}</td>
        <td>${contato.mensagem}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `;
  document.querySelector("#tableContato>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableContato>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbContato = readContato();
  clearTable();
  dbContato.forEach(createRow);
};

const fillFields = (contato) => {
  document.getElementById("nome").value = contato.nome;
  document.getElementById("email").value = contato.email;
  document.getElementById("celular").value = contato.celular;
  document.getElementById("mensagem").value = contato.mensagem;
  document.getElementById("nome").dataset.index = contato.index;
};

const editContato = (index) => {
  const contato = readContato()[index];
  contato.index = index;
  fillFields(contato);
  document.querySelector(
    ".modal-header>h2"
  ).textContent = `Editando ${contato.nome}`;
  openModal();
};

const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");

    if (action == "edit") {
      editContato(index);
    } else {
      const contato = readContato()[index];
      const response = confirm(
        `Deseja realmente excluir o contato ${contato.nome}`
      );
      if (response) {
        deleteContato(index);
        updateTable();
      }
    }
  }
};

updateTable();

// Eventos
document
  .getElementById("cadastrarContato")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("salvar").addEventListener("click", saveContato);

document
  .querySelector("#tableContato>tbody")
  .addEventListener("click", editDelete);

document.getElementById("cancelar").addEventListener("click", closeModal);
