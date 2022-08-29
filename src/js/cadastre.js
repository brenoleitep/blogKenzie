import { Api } from "./api.js";

export async function getCadastre() {
  const inptUserName = document.querySelector(".inputText__userName");
  const inptEmail = document.querySelector(".inputText__email");
  const inptFoto = document.querySelector(".inputText__perfil");
  const inptPassword = document.querySelector(".inputText__pass");
  const inptForm = document.querySelector(".form--cadastro");

  inptForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const body = {
        "username": inptUserName.value,
        "email": inptEmail.value,
        "avatarUrl": inptFoto.value,
        "password": inptPassword.value
      }
      console.log(body)
      inptForm.reset()

    Api.makeCadastre(body)
  })
}
getCadastre();