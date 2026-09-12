import { MagneticEffect } from "./magneticEffect.js";

const mouseMoveHooks = [];

export function registerMouseMoveHook(callback) {
    if (typeof callback === 'function') {
        mouseMoveHooks.push(callback);
    }
}

export function initGlobalMouseMoveRouter() {

    if (window.innerWidth > 512) {
        registerMouseMoveHook(MagneticEffect);
    }

    document.addEventListener('mousemove', (e) => {
        for (const hook of mouseMoveHooks) {
            const isHandled = hook(e);
            if (isHandled) break;
        }
    });
}
