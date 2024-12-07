import navigationView from "../views/navigationView.js"

export const navigationMiddleWare = (ctx, next) => {
    navigationView();
    next();
}