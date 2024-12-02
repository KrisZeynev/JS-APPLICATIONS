import { showNavigation, showContent } from "./showNavigation.js";
import { showSingleCatch, addNewCatch } from "./showSingleCatch.js";
showNavigation();

const user = JSON.parse(sessionStorage.getItem("user"));
const mainEl = document.querySelector("main");
const registerSection = document.querySelector("#register-view");
const loginSection = document.querySelector("#login-view");
const homeSection = document.querySelector("#home-view");

document.querySelector("#views").style.display = "none";

const homeBtn = document.querySelector("#home");
const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const logoutBtn = document.querySelector("#logout");

const loadBtn = document.querySelector(".load");
loadBtn.addEventListener("click", showCatches);

mainEl.appendChild(homeSection);
const cathesDiv = document.querySelector("#catches");
cathesDiv.replaceChildren()
// cathesDiv.style.display = "none";

const addFormBtn = document.querySelector("#addForm button");
addFormBtn.addEventListener("click", addNewCatch);
if (user) {
  addFormBtn.disabled = false;
} else {
  addFormBtn.disabled = true;
}

homeBtn.addEventListener("click", (e) => {
  mainEl.replaceChildren();
  mainEl.appendChild(homeSection);
  const cathesDiv = document.querySelector("#catches");
  cathesDiv.style.display = "none";
});

loginBtn.addEventListener("click", (e) => {
  mainEl.replaceChildren();
  mainEl.appendChild(loginSection);

  const loginForm = document.querySelector("#login-view form");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target));
    // console.log(data);

    try {
      const response = await fetch("http://localhost:3030/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const responseData = await response.json();
      const data = responseData.accessToken;
      // console.log(responseData);
      const user = {
        username: responseData.username,
        email: responseData.email,
        id: responseData._id,
        token: data,
      };

      sessionStorage.setItem("user", JSON.stringify(user));
      e.target.reset();
      showNavigation();
      mainEl.replaceChildren();
      mainEl.appendChild(homeSection);
      addFormBtn.disabled = false;
    } catch (error) {
      alert(error.message);
    }
  });
});

registerBtn.addEventListener("click", (e) => {
  mainEl.replaceChildren();
  mainEl.appendChild(registerSection);

  const registerForm = document.querySelector("#register-view form");
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { email, password, rePass } = Object.fromEntries(
      new FormData(e.target)
    );
    // console.log(data);
    try {
      const response = await fetch("http://localhost:3030/users/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          rePass,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      if (rePass != password) {
        throw new Error("Passwords need to match");
      }

      const data = await response.json();
      const token = data.accessToken;
      const user = {
        username: data.username,
        email: data.email,
        id: data._id,
        token,
      };
      sessionStorage.setItem("user", JSON.stringify(user));
      e.target.reset();
      showNavigation();
      mainEl.replaceChildren();
      mainEl.appendChild(homeSection);
      addFormBtn.disabled = false;
    } catch (error) {
      alert(error.message);
    }
  });
});

logoutBtn.addEventListener("click", async (e) => {
  const userData = JSON.parse(sessionStorage.getItem("user"));

  await fetch("http://localhost:3030/users/logout", {
    headers: {
      "X-Authorization": userData.token,
    },
  });

  sessionStorage.clear();
  mainEl.replaceChildren();
  mainEl.appendChild(loginSection);
  showNavigation();
  addFormBtn.disabled = true;
});

export async function showCatches() {
  // !
//   const addForm = document.querySelector("#addForm");
//   addForm.reset();
  const cathesDiv = document.querySelector("#catches");
  cathesDiv.style.display = "inline";
  cathesDiv.replaceChildren();

  const res = await fetch("http://localhost:3030/data/catches");
  const allCatches = await res.json();

  Object.values(allCatches).forEach((singleCatch) => {
    // console.log(singleCatch);
    cathesDiv.appendChild(showSingleCatch(singleCatch));
  });

  //
}
