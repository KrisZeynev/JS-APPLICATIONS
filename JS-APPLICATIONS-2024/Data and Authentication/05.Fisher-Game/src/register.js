// window.addEventListener("DOMContentLoaded", () => {
//   const registerForm = document.querySelector("#register-view form");
//   registerForm.addEventListener("submit", regFunc);
//   document.querySelector("#logout").style.display = "none";
// })
// async function regFunc(e) {
//   const notification = document.querySelector(".notification");
//   e.preventDefault();
//   const { email, password, rePass } = Object.fromEntries(
//     new FormData(e.target)
//   );
//   if (!email || !password || !rePass) {
//     notification.innerHTML = "Please fill all fields!";
//     return;
//   }
//   if (password !== rePass) {
//     notification.innerHTML = "Both password must match!";
//     return;
//   }
//   notification.innerHTML = "";

//   const response = await fetch("http://localhost:3030/users/register", {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await response.json();
//   // console.log(data);

//   if (response.status === 200) {
//     sessionStorage.setItem("accessToken", data.accessToken);
//     sessionStorage.setItem("userEmail", data.email);
//     sessionStorage.setItem("userId", data._id);

//     Array.from(document.querySelectorAll("input")).forEach(
//       (input) => (input.value = "")
//     );
//     // location.href = "index.html";
//     window.location.assign('./index.html')
//   } else {
//     notification.innerHTML = data.message;
//   }
// }
