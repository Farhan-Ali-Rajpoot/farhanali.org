# Personal Portfolio Website (Engineered From Scratch)

## 🚀 Live Demo
👉 **[farhanali.org](https://farhanali.org)**

## ⚙️ Performance Engineering Highlights

### 1. Unified Event Delegation & Global Listeners
Rather than attaching event listeners to individual DOM elements, this website utilizes a single global `scroll` listener, a single `mousemove` listener, and a single `click` listener attached directly to the `document`. This architecture drastically minimizes the runtime memory footprint.

Advanced micro-interactions—such as the custom magnetic button animations—are computed entirely within this single, unified `mousemove` event loop. By using centralized event delegation instead of the traditional "one listener per item" approach common in amateur development, the site eliminates memory bloat and keeps execution overhead exceptionally low.

### 2. Zero-JS Plain CSS Architecture (GPU Accelerated)
To maximize performance, interactive state management relies heavily on pure CSS strategies rather than JavaScript runtimes.

*   **Checkbox State Toggling Hack:** The interactive navigation bar relies on the native HTML checkbox state hack. Eliminating JavaScript for state management ensures a tiny memory footprint.
*   **Hardware Acceleration:** Transitions and animations are offloaded directly to the GPU via native CSS, ensuring buttery-smooth 60fps rendering without blocking the main browser thread. The majority of the site's animations are engineered purely in native CSS.

### 3. High-Performance Page Routing (GSAP & Swup Integration)
By merging **Swup.js** and **GSAP (GreenSock Animation Platform)**, the website achieves seamless, immersive single-page-application (SPA) transitions on a static site structure—an effect that remains highly difficult to execute smoothly even within modern React/Next.js framework lifecycles. 

Swup handles asynchronous, zero-refresh DOM swapping and caching via clean APIs, while GSAP drives high-performance, timeline-controlled animations to create a premium user experience.
