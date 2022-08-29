import { listComent, iconUser, editComent } from "./dashboard.js";

export class Api {
  static token = localStorage.getItem("@kenzieBlog(token)");
  static id = localStorage.getItem("@kenzieBlog(UserId)");

  static async makeCadastre(body) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    fetch("https://blog-m2.herokuapp.com/users/register", options)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          window.location.assign("/index.html");
        }
      })
      .catch((err) => console.log(err));
  }

  static async makeLogin(body) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    };

    fetch("https://blog-m2.herokuapp.com/users/login", options)
      .then((response) => response.json())
      .then((response) => {
        if (response.token !== undefined) {
          localStorage.setItem("@kenzieBlog(token)", response.token);
          localStorage.setItem("@kenzieBlog(UserId)", response.userId);
          window.location.assign("./src/pages/dashboard.html");
          return response;
        }
      })
      .catch((err) => console.log(err));
  }

  static async sendComent(body) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    };

    await fetch(`https://blog-m2.herokuapp.com/posts`, options)
      .then((response) => response.json())
      .then((response) => {
        location.reload()
        return response.id
      })
      .catch((err) => console.error(err));
  }

  static async getComentTest() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    fetch(`https://blog-m2.herokuapp.com/posts?page=1`, options)
      .then((response) => response.json())
      .then((response) => {
        const lastPage = response.totalPages
        return lastPage
      })
      .catch((err) => console.log(err));
  }

  static async getComent() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    const data = fetch(`https://blog-m2.herokuapp.com/posts?page=${this.getComentTest}`, options)
      .then((response) => response.json())
      .then((response) => {

        listComent(response, this.sendComent);
      })
      .catch((err) => console.log(err));
      
  }

  static async editComent(body, id) {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    };

    await fetch(`https://blog-m2.herokuapp.com/posts/${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        location.reload()
        return response
      })
      .catch((err) => console.error(err));
  }

  static async deletComent(id) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    await fetch(`https://blog-m2.herokuapp.com/posts/${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        location.reload()
        return response
      })
      .catch((err) => console.log(err));
  }

  static async getUser(body) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    };

    await fetch(`https://blog-m2.herokuapp.com/users/${this.id}`, options)
      .then((response) => response.json())
      .then((response) => {
        iconUser(response)
      })
      .catch((err) => console.error(err));
  }
}
Api.getComent()
Api.getUser()