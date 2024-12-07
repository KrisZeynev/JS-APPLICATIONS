import {
  render as baseRender,
  html,
} from "../node_modules/lit-html/lit-html.js";

// hardcode the main element which we will use for display the content
const mainEl = document.querySelector("#main-element");
export const render = (tempalteResult) => baseRender(tempalteResult, mainEl);

export {
    html,
    baseRender
}
