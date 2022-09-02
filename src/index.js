import "./modules/styles/style.css";
import { Model } from "./modules/model/mainModel.js";
import { View } from "./modules/view/mainView.js";
import { Controller } from "./modules/controller/mainController.js";

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
