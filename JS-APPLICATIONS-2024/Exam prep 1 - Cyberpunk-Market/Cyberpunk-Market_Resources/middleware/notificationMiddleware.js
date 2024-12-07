// import { html, baseRender } from "../lib/lit-html";
// const errorBoxEl = document.querySelector("#errorBox");

// const template = (message) => html` <span class="msg">${message}</span> `;

// export const notificationsMiddleware = (ctx, next) => {
//   ctx.showNotification = (message) => {
//     baseRender(template(message), errorBoxEl);
//     errorBoxEl.style.display = "block";

//     setTimeout(() => {
//       errorBoxEl.style.display = "none";
//     }, 3000);
//   };

//   next();
// };
