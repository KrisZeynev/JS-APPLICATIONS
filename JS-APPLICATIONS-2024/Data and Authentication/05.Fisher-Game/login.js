export function loginFunc() {
  console.log("ae logni sa ve batal");
  const mainEl = document.querySelector("main");
  const registerSection = document.querySelector("#register-view");
  const loginSection = document.querySelector("#login-view");
  const homeSection = document.querySelector("#home-view");

      mainEl.replaceChildren();
    mainEl.appendChild(homeSection);
}
