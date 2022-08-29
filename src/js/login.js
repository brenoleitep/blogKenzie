import { Api } from "./api.js";

export async function getLog() {
  const token = localStorage.getItem("@kenzieBlog(token)")
  const inptEmail = document.querySelector(".inputText__email");
  const inptPassword = document.querySelector(".inputText__pass");
  const inptBtn = document.querySelector(".form__login--submit");
  const form = document.querySelector(".form--login");

  if (token) {
    window.location.assign("./src/pages/dashboard.html")
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      email: inptEmail.value,
      password: inptPassword.value
    }
    console.log(data)

    Api.makeLogin(data)
    form.reset()
  });

}
getLog()
// {
// 	"id": 14,
// 	"email": "breno@mail.com",
// 	"username": "breno",
// 	"avatarUrl": "fds"
// pass: Kenzie123
// }