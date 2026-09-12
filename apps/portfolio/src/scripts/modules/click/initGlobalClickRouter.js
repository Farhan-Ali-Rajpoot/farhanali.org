import { ToggleMenu } from "./toggleMenu.js";


const clickHooks = [];

export function registerClickHook(callback) {
    if (typeof callback === 'function') {
        clickHooks.push(callback);
    }
}

export function initGlobalClickRouter() {

    registerClickHook(ToggleMenu)
    




    document.addEventListener('click', (e) => {
        for (const hook of clickHooks) {
            const isHandled = hook(e);
            if (isHandled) break; 
        }
    })
}




