import gsap from "gsap";
import { select } from "../../utils/select.js";

let activeMagneticElement = null;
const innerCache = new WeakMap();

export function MagneticEffect(e) {
    const target = e.target;
    const currentTarget = target.closest("[data-magnetic]");

    // EARLY EXIT: no target and nothing active
    if (!currentTarget && !activeMagneticElement) {
        return false;
    }

    // CASE: magnetic element found
    if (currentTarget) {
        // Switch active if different
        if (activeMagneticElement !== currentTarget) {
            if (activeMagneticElement) {
                resetElement(activeMagneticElement);
            }
            activeMagneticElement = currentTarget;
        }

        const rect = currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - centerX) * 0.4;
        const distanceY = (e.clientY - centerY) * 0.4;

        // Animate main element
        gsap.to(currentTarget, {
            x: distanceX,
            y: distanceY,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto"
        });

        // Cached inner content
        let innerContent = innerCache.get(currentTarget);
        if (innerContent === undefined) {
            innerContent = select("[data-magnetic-inner]", currentTarget);
            innerCache.set(currentTarget, innerContent);
        }
        if (innerContent) {
            const innerDistanceX = (e.clientX - centerX) * 0.25;
            const innerDistanceY = (e.clientY - centerY) * 0.25;
            gsap.to(innerContent, {
                x: innerDistanceX,
                y: innerDistanceY,
                duration: 0.7,
                ease: "power3.out",
                overwrite: "auto"
            });
        }

        return true; // handled
    }

    // CASE: no magnetic target – reset active if any
    if (activeMagneticElement) {
        resetElement(activeMagneticElement);
        activeMagneticElement = null;
    }
    return false;
}

function resetElement(el) {
    // Reset main element with elastic bounce
    gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out",
        overwrite: "auto"
    });

    // Reset cached inner content
    const innerContent = innerCache.get(el);
    if (innerContent) {
        gsap.to(innerContent, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "elastic.out",
            overwrite: "auto"
        });
    }
}
