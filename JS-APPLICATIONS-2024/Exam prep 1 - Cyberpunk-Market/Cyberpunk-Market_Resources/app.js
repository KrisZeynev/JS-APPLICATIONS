// import page from "./lib/page.js";
import page from "./lib/page.js";
import homeView from "./views/homeView.js";
import dashboardView from "./views/dashboardView.js";
import detailsView from "./views/detailsView.js";
import createView from "./views/createView.js";
import loginView from "./views/loginView.js";
import registerView from "./views/registerView.js";
import logoutView from "./views/logoutView.js";
import { navigationMiddleWare } from "./middleware/navigationMiddleware.js";
import editView from "./views/editView.js";
import deleteView from "./views/deleteView.js";
// import { notificationsMiddleware } from "./middleware/notificationMiddleware.js";

page(navigationMiddleWare)
// page(notificationsMiddleware)

// import { updateNavigation } from "./updateNavigation.js";

page("/", homeView);
page("/dashboard", dashboardView);
page("/dashboard/:itemId/details", detailsView);
page("/dashboard/:itemId/edit", editView);
page("/dashboard/:itemId/delete", deleteView);
page("/create", createView);
page("/login", loginView);
page("/register", registerView);
page("/logout", logoutView);
// updateNavigation()
page();
