import { gsap } from "../vendor/gsap-core.js";

let activeMagneticElement = null;

export function MagneticEffect(e) {
    const currentTarget = e.target.closest("[data-magnetic]");

    if (currentTarget) {
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

        gsap.to(currentTarget, {
            x: distanceX,
            y: distanceY,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto"
        });

        const innerContent = currentTarget.querySelector("[data-magnetic-inner]");
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

        return true; 
    } else {
        if (activeMagneticElement) {
            resetElement(activeMagneticElement);
            activeMagneticElement = null;
        }
        
        return false;
    }
}

function resetElement(el) {
    gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1,       
        ease: "elastic.out",  
        overwrite: "auto"
    });

    const innerContent = el.querySelector("[data-magnetic-inner]");
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
