import { Api } from "./api.js";

async function logout() {
  const spanLogout = document.querySelector(".span__logout");

  spanLogout.addEventListener("click", (e) => {
    localStorage.removeItem("@kenzieBlog(token)");
    localStorage.removeItem("@kenzieBlog(UserId)");

    window.location.assign("/index.html");
  });
}

export async function enviarComent() {
  const textComent = document.querySelector(".main__dashboard--text");
  const btnComent = document.querySelector(".main__dashboard--btn");
  const form = document.querySelector(".form__dash");

  btnComent.addEventListener("click", (e) => {
    e.preventDefault();
    const content = {
      content: textComent.value,
    };

    form.reset();
    Api.sendComent(content);
  });
}

export async function listComent(response, id) {
  const tagUl = document.querySelector(".secao__post--ul");
  const data = response.data.forEach((elem) => {
    const tagLi = document.createElement("li");
    const tagDiv = document.createElement("div");
    const tagImg = document.createElement("img");
    const tagH2 = document.createElement("h2");
    const divComent = document.createElement("div");
    const tagComent = document.createElement("p");
    const tagSpan = document.createElement("span");
    const tagDivIcons = document.createElement("div");
    const tagImgIcons = document.createElement("img");
    const tagImgIcons2 = document.createElement("img");
    const closeModal = document.querySelector(".close__modal");
    const closeModalDel = document.querySelector(".close__modal--del");

    tagDiv.classList.add("div__img");
    tagDivIcons.classList.add("div__icons");
    tagImgIcons.classList.add("icone__edit");
    tagImgIcons2.classList.add("icone__delete");
    divComent.classList.add("divComent")

    let dataTratada = elem.createdAt.slice(0, 10).replace(/-/g, "/");
    

    tagImg.src = elem.user.avatarUrl;
    tagH2.innerText = elem.user.username;
    tagComent.innerText = elem.content;
    tagSpan.innerText = dataTratada.split("/").reverse().join("/");
    tagImgIcons.src = "../assets/edit.png";
    tagImgIcons2.src = "../assets/trash-bin.png";

    divComent.append(tagComent)
    tagDiv.append(tagImg, tagH2);
    tagDivIcons.append(tagImgIcons, tagImgIcons2);
    tagLi.append(tagDiv, divComent, tagSpan);
    tagUl.append(tagLi);

    if (elem.user.id == Api.id) {
      tagLi.append(tagDivIcons);
      tagDivIcons.setAttribute("id", elem.id);
      const id = tagDivIcons.id;

      const textArea = document.querySelector(".form__modal--text");
      const btnTxt = document.querySelector(".form__modal");  
      const btnDel = document.querySelector(".form__modal--del");
      

      btnTxt.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const content = {
          content: textArea.value,
        };
        
        Api.editComent(content, id);
        btnTxt.reset()
      });

      btnDel.addEventListener("submit", (e) => {
        e.preventDefault()
        btnDel.reset()
        
        Api.deletComent(id)

      })

      tagImgIcons2.addEventListener("click", (e) => {
        e.preventDefault()
        abrirModalDelete()
      })

      tagImgIcons.addEventListener("click", (e) => {
        abrirModalEdit();
      });

      closeModal.addEventListener("click", (e) => {
        fecharModalEdit();
        fecharModalDel();
      });

      closeModalDel.addEventListener("click", (e) => {
        fecharModalDel();
      });

    }
  });
}

export async function editComent() {}

function abrirModalEdit() {
  document.querySelector(".bg__modal").style.top = "0";
}

function fecharModalEdit() {
  document.querySelector(".bg__modal").style.top = "-150%";
}

function abrirModalDelete() {
  document.querySelector(".bg__modalDelet").style.top = "0";
}

function fecharModalDel() {
  document.querySelector(".bg__modalDelet").style.top = "-150%";
}

export async function iconUser(response) {
  const userPhotoDiv = document.querySelector(".header__dashboard--div");

  const userPhoto = document.createElement("img");
  const tagP = document.createElement("p");

  userPhoto.src = response.avatarUrl;
  tagP.innerText = response.username;

  userPhotoDiv.append(userPhoto, tagP);
}

logout();
enviarComent();
editComent();
