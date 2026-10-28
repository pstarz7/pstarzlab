// js/main.js

let projectsVisible = 3;
let toolsVisible = 3;

// Card Template Generator
function generateCardHTML(item) {
    const tagsHTML = item.tags.map(tag => `<span class="bg-white border border-editorial-ink px-2 py-1">${tag}</span>`).join('');
    
    return `
        <a href="${item.link}" class="card-tactile bg-editorial-paper border-4 border-editorial-ink shadow-tactile block group flex flex-col h-full animate-fade-in">
            <div class="h-48 border-b-4 border-editorial-ink relative overflow-hidden bg-editorial-ink">
                <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700">
                <div class="absolute top-2 right-2 border-2 border-editorial-ink px-2 py-0.5 font-mono text-[10px] font-bold ${item.badgeClass}">${item.badge}</div>
            </div>
            <div class="p-5 flex flex-col flex-grow justify-between bg-editorial-card">
                <div>
                    <h3 class="text-xl font-black uppercase text-editorial-ink mb-2 group-hover:text-editorial-cobalt transition-colors">${item.title}</h3>
                    <p class="text-sm font-medium text-editorial-muted line-clamp-3">${item.desc}</p>
                </div>
                <div class="mt-4 pt-4 border-t-2 border-editorial-ink/20 flex flex-wrap gap-2 font-mono text-[10px] uppercase font-bold text-editorial-ink">
                    ${tagsHTML}
                </div>
            </div>
        </a>
    `;
}

// Render Functions
function renderProjects() {
    const container = document.getElementById('projects-grid');
    const btn = document.getElementById('btn-load-projects');
    
    container.innerHTML = projectsData.slice(0, projectsVisible).map(generateCardHTML).join('');
    
    if (projectsVisible >= projectsData.length) {
        btn.style.display = 'none';
    }
    // Refresh ScrollTrigger to account for new element heights
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
}

function renderTools() {
    const container = document.getElementById('tools-grid');
    const btn = document.getElementById('btn-load-tools');
    
    container.innerHTML = toolsData.slice(0, toolsVisible).map(generateCardHTML).join('');
    
    if (toolsVisible >= toolsData.length) {
        btn.style.display = 'none';
    }
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
}

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
    
    // Render Initial Data
    renderProjects();
    renderTools();

    // Load More Listeners
    document.getElementById('btn-load-projects').addEventListener('click', () => {
        projectsVisible += 3;
        renderProjects();
    });

    document.getElementById('btn-load-tools').addEventListener('click', () => {
        toolsVisible += 3;
        renderTools();
    });

    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.classList.replace('fa-xmark', 'fa-bars');
        } else {
            menuIcon.classList.replace('fa-bars', 'fa-xmark');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // Smooth Scroll (Lenis)
    const lenis = new Lenis({ duration: 1.2, touchMultiplier: 2 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".hero-elem", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
    
    gsap.utils.toArray('.section-fade').forEach(section => {
        gsap.from(section, { y: 40, opacity: 0, duration: 0.8, scrollTrigger: { trigger: section, start: "top 85%" }});
    });

    // Polaroid entrance animation
    gsap.from(".polaroid", { 
        scale: 0, opacity: 0, rotation: gsap.utils.random(-15, 15, true), 
        duration: 0.6, stagger: 0.15, ease: "back.out(1.7)", 
        scrollTrigger: { trigger: "#workbench", start: "top 70%" }
    });
});