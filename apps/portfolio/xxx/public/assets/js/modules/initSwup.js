import './vendor/swup.js';
import { gsap } from './vendor/gsap-core.js';
import { select, selectAll } from '../utils/select.js';

export function initSwup() {
    const swup = new Swup({ 
        animationSelector: false
    });

    // Page transition container
    const ptcontainer = select('.pt-container');
    const columns = selectAll('.pt-column');
    
    if (columns.length === 0) return;

    const initView = select('#swup'); 

    gsap.set(ptcontainer, { pointerEvents: 'auto' });
    gsap.set(columns, { y: '0%' });
    
    if (initView) gsap.set(initView, { y: '10vh' }); 

    const initTl = gsap.timeline({
        onComplete: () => {
            gsap.set(columns, { y: '100%' }); 
            gsap.set(ptcontainer, { pointerEvents: 'none' }); 
        }
    });

    initTl.to(columns, { 
        y: '-100%', 
        duration: 0.7, 
        ease: "power2.inOut", 
        stagger: 0.05,
        delay: .1
    }, 0);
    
    if (initView) {
        initTl.to(initView, { 
            y: '0%', 
            duration: 0.7, 
            ease: "power2.inOut" 
        }, 0.05); 
    }

    swup.hooks.replace('animation:out:await', async () => {
        const tl = gsap.timeline();
        const liveView = select('#swup');

        gsap.set(ptcontainer, { pointerEvents: 'auto' });
        gsap.set(columns, { y: '100%' }); // Start stairs at bottom

        // Old view container animates UP and away, staying within screen bounds
        if (liveView) {
            tl.to(liveView, {
                y: '-10vh',
                duration: 0.7,
                ease: 'power2.inOut'
            }, 0);
        }

        // Stairs sweep upward simultaneously
        tl.to(columns, { 
            y: '0%', 
            duration: 0.7, 
            ease: 'power2.inOut', 
            stagger: 0.05 
        }, 0);

        await tl; 
    });

    swup.hooks.replace('animation:in:await', async () => {
        const tl = gsap.timeline();
        const liveView = select('#swup');
        
        // Instantly stage the incoming new page container at the bottom
        if (liveView) gsap.set(liveView, { y: '10vh' });

        // Stairs clear out through the top
        tl.to(columns, { 
            y: '-100%', 
            duration: 0.7, 
            ease: 'power2.inOut', 
            stagger: 0.05 
        }, 0);

        // New page content settles into the center
        if (liveView) {
            tl.to(liveView, {
                y: '0%',
                duration: 0.7,
                ease: 'power2.inOut'
            }, 0.05); 
        }

        await tl;
        
        // Reset state loops
        gsap.set(columns, { y: '100%' });
        gsap.set(ptcontainer, { pointerEvents: 'none' });
    });
}