import { MenuFeature } from "./menuFeature.js";





const scrollHooks = [];

let lastScrollY = 0;
let ticking = false;

export function registerScrollHook(callback) {
    if (typeof callback === 'function') {
        scrollHooks.push(callback);
    }
}

export function initGlobalScrollDispatcher() {

    registerScrollHook(MenuFeature)

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                for (const hook of scrollHooks) {
                    hook(lastScrollY);
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true }); 
}