import { logout } from "../api/usersApi.js";
import page from "../lib/page.js";
import { clearUserData } from "../utils/userUtils.js";

export default async function logoutView(ctx) {
  try {
    await logout();
    clearUserData();
    page.redirect("/");
  } catch (error) {
    alert(error.message);
  }
}