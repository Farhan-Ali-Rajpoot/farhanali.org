import { initSwup } from "./modules/initSwup.js";
import { initGlobalClickRouter } from "./modules/click/initGlobalClickRouter.js";
import { initGlobalScrollDispatcher } from "./modules/scroll/initScrollRouter.js";
import { initGlobalMouseMoveRouter } from "./modules/move/initMouseMoveRouter.js";


window.addEventListener("DOMContentLoaded", () => {
    initSwup()
    initGlobalClickRouter()
    initGlobalScrollDispatcher()
    initGlobalMouseMoveRouter()
})

