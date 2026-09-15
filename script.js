// ==============================================
// Dark & Light Mode Context Swapper
// ==============================================
const button = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

body.classList.add('preload-theme');

const savedTheme = localStorage.getItem('mosavid-theme');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    if (themeIcon) {
        themeIcon.src = 'images/dark.png';
        themeIcon.alt = 'Switch to Light Mode';
    }
} else {
    // Default to light mode
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    if (themeIcon) {
        themeIcon.src = 'images/light.png';
        themeIcon.alt = 'Switch to Dark Mode';
    }
}

setTimeout(() => {
    body.classList.remove('preload-theme');
}, 100);

if (button) {
    button.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');

        const isDarkMode = body.classList.contains('dark-mode');

        if (isDarkMode) {
            themeIcon.src = 'images/dark.png';
            themeIcon.alt = 'Switch to Light Mode';
            localStorage.setItem('mosavid-theme', 'dark');
        } else {
            themeIcon.src = 'images/light.png';
            themeIcon.alt = 'Switch to Dark Mode';
            localStorage.setItem('mosavid-theme', 'light');
        }
    });
}

// ==============================================
// Dropdown Setup & Smooth Scrolling
// ==============================================
const optionsBtn = document.querySelector('.options-btn');
if (optionsBtn) {
    optionsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelector('.options-dropdown').classList.toggle('open');
    });
}

document.addEventListener('click', function () {
    const dropdown = document.querySelector('.options-dropdown');
    if (dropdown && dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
    }
});

// Enable Smooth Scroll offset for fixed header
document.querySelectorAll('.nav-links a, .logo').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: targetId === '#top' ? 0 : offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==============================================
// GSAP Animations
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- Hero Section Animation & Scroll Indicator Fade ---
        const heroSection = document.querySelector('.hero-scroll-section');
        if (heroSection) {
            const heroTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-scroll-section",
                    start: "top top",      
                    end: "+=150%",         
                    scrub: 1,              
                    pin: true,             
                }
            });

            // Fade out the scroll indicator instantly when scrolling starts
            heroTimeline.to(".scroll-indicator", {
                opacity: 0,
                y: 20,
                duration: 0.05, 
                ease: "power1.out"
            }, 0); 

            heroTimeline.to(".mask-wrapper", {
                webkitMaskSize: "20000%", 
                maskSize: "20000%",
                ease: "power2.in"
            }, 0); 

            heroTimeline.to(".phase-1", {
                opacity: 0,
                y: "-=50", 
                ease: "power1.inOut"
            }, 0);

            heroTimeline.fromTo(".phase-2", 
                { opacity: 0, y: "+=50", autoAlpha: 0 }, 
                { opacity: 1, y: "-=50", autoAlpha: 1, ease: "power2.out" }, 
                0.2 
            );

            heroTimeline.to(".phase-2-bg", {
                opacity: 1,
                ease: "power2.inOut"
            }, 0.2);
        }

        // --- SVG Path Animation ---
        const path = document.querySelector('#scroll-line');
        if (path) {
            const pathLength = path.getTotalLength();

            gsap.set(path, { 
                strokeDasharray: pathLength, 
                strokeDashoffset: pathLength 
            });

            gsap.to(path, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: ".journey_wrapper", 
                    start: "top 60%",           
                    end: "bottom 80%",           
                    scrub: 1,                    
                }
            });
        }

        // --- Stats Content Parallax ---
        const statsContent = document.querySelector('.stats-content');
        if (statsContent) {
            gsap.to(statsContent, {
                y: -150, 
                ease: "none", 
                scrollTrigger: {
                    trigger: ".mountain-parallax-section",
                    start: "top bottom", 
                    end: "bottom top",   
                    scrub: 0.5
                }
            });
        }
    }
});

// ==========================================================================
// MOTOR DINÁMICO DE SCROLL Y PINNING - Main Page
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const spacers = document.querySelectorAll('.pin-spacer');
    const track = document.querySelector('.vo-stack-track');

    if (spacers.length === 0 || !track) return; // Exit if elements don't exist

    const collapsedCardHeight = window.innerWidth > 768 ? 65 : 45;
    const baseTopOffset = 130; 

    const handleScrollPinning = () => {
        const trackRect = track.getBoundingClientRect();
        
        spacers.forEach((spacer, index) => {
            const cardContent = spacer.querySelector('.vo-card-content');
            const targetTop = baseTopOffset + (index * collapsedCardHeight);
            
            const spacerRect = spacer.getBoundingClientRect();

            if (spacerRect.top <= targetTop) {
                spacer.classList.add('pinned-state');
                
                if (cardContent) {
                    cardContent.style.position = 'fixed';
                    cardContent.style.top = `${targetTop}px`;
                }
                
                spacer.style.height = `${spacerRect.height}px`;
            } else {
                spacer.classList.remove('pinned-state');
                
                if (cardContent) {
                    cardContent.style.position = 'relative';
                    cardContent.style.top = 'auto';
                }
                spacer.style.height = 'auto';
            }
        });
    };

    window.addEventListener('scroll', handleScrollPinning, { passive: true });
    window.addEventListener('resize', handleScrollPinning);
    
    // Initialize positioning on load
    handleScrollPinning();
});

// ==========================================================================
// Article Section
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const updateItems = document.querySelectorAll('.update-item');
    
    const floatingContainer = document.getElementById('floating-image-container');
    const floatingImage = document.getElementById('floating-image');
    
    const modal = document.getElementById('article-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalHeroImg = document.getElementById('modal-hero-image');
    const modalTitle = document.getElementById('modal-title');
    const modalAuthor = document.getElementById('modal-author');
    const modalDate = document.getElementById('modal-date');
    const modalText = document.getElementById('modal-text');

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!modal) return;

    updateItems.forEach(item => {
        if (!isMobile && floatingContainer && floatingImage) {
            item.addEventListener('mouseenter', () => {
                const hoverImgSrc = item.getAttribute('data-hover');
                if (hoverImgSrc) {
                    floatingImage.src = hoverImgSrc;
                    floatingContainer.classList.add('visible');
                }
            });

            item.addEventListener('mouseleave', () => {
                floatingContainer.classList.remove('visible');
            });

            item.addEventListener('mousemove', (e) => {
                floatingContainer.style.left = `${e.clientX}px`;
                floatingContainer.style.top = `${e.clientY}px`;
            });
        }

        item.addEventListener('click', (e) => {
            e.preventDefault(); 

            if(floatingContainer) floatingContainer.classList.remove('visible');

            const heroSrc = item.getAttribute('data-hero');
            const title = item.getAttribute('data-title');
            const author = item.getAttribute('data-author');
            const date = item.getAttribute('data-date');
            const text = item.getAttribute('data-text');

            if (modalHeroImg) modalHeroImg.src = heroSrc || '';
            if (modalTitle) modalTitle.innerHTML = title || '';
            if (modalAuthor) modalAuthor.textContent = author || '';
            if (modalDate) modalDate.textContent = date || '';
            if (modalText) modalText.textContent = text || '';

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; 
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ====================================================================
// Formulary Page
// ====================================================================
const initMultiStepForm = () => {
  const form = document.getElementById("multi-step-form");
  if (!form) return; 

  const steps = Array.from(form.querySelectorAll(".form-step"));
  const tabs = Array.from(document.querySelectorAll(".step-tab"));
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const footerNav = document.getElementById("wizard-footer-nav");
  const successScreen = document.getElementById("success-screen");
  let currentStepIndex = 0;

  function updateFormWizardView() {
    steps.forEach((step, idx) => step.classList.toggle("active", idx === currentStepIndex));
    tabs.forEach((tab, idx) => tab.classList.toggle("active", idx === currentStepIndex));
    
    if (currentStepIndex === 0) {
      prevBtn.classList.add("invisible");
    } else {
      prevBtn.classList.remove("invisible");
    }

    if (currentStepIndex === steps.length - 1) {
      nextBtn.textContent = "Enviar Formulario";
    } else {
      nextBtn.textContent = "Siguiente Paso ›";
    }
  }

  function validateCurrentStep() {
    const activeStep = steps[currentStepIndex];
    let isStepValid = true;

    const requiredInputs = activeStep.querySelectorAll("input[required], textarea[required]");
    requiredInputs.forEach(input => {
      if (input.closest(".hidden")) return;
      
      let isValidInput = true;
      
      if (input.id === "contact-phone") {
        if (input.value.trim().length < 7) {
          isValidInput = false;
        }
      } else if (!input.value.trim()) {
        isValidInput = false;
      }

      if (!isValidInput) {
        input.closest(".input-group").classList.add("invalid");
        isStepValid = false;
      } else {
        input.closest(".input-group").classList.remove("invalid");
      }
    });

    const emailInputs = activeStep.querySelectorAll("input[type='email']");
    emailInputs.forEach(email => {
      if (email.closest(".hidden")) return;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.closest(".input-group").classList.add("invalid");
        isStepValid = false;
      } else {
        email.closest(".input-group").classList.remove("invalid");
      }
    });

    return isStepValid;
  }

  form.addEventListener("input", (e) => {
    const group = e.target.closest(".input-group");
    if (group && group.classList.contains("invalid")) {
      group.classList.remove("invalid");
    }
  });

  nextBtn.addEventListener("click", () => {
    if (!validateCurrentStep()) return;

    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
      updateFormWizardView();
    } else {
      steps.forEach(step => step.classList.remove("active"));
      footerNav.classList.add("hidden");
      successScreen.classList.remove("hidden");
      
      form.reset();
      currentStepIndex = 0;
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      updateFormWizardView();
    }
  });

  const radioMethods = form.querySelectorAll('input[name="contact-method"]');
  const emailFieldGroup = document.getElementById("email-field-group");
  const phoneFieldGroup = document.getElementById("phone-field-group");
  const emailInput = document.getElementById("contact-email");
  const phoneInput = document.getElementById("contact-phone");

  radioMethods.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "email") {
        emailFieldGroup.classList.remove("hidden");
        phoneFieldGroup.classList.add("hidden");
        emailInput.setAttribute("required", "true");
        phoneInput.removeAttribute("required");
      } else {
        emailFieldGroup.classList.add("hidden");
        phoneFieldGroup.classList.remove("hidden");
        phoneInput.setAttribute("required", "true");
        emailInput.removeAttribute("required");
      }
    });
  });

  if (emailInput) emailInput.setAttribute("required", "true");

  const categoryButtons = form.querySelectorAll(".cat-btn");
  const hiddenCategoryInput = document.getElementById("selected-category");

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      if (hiddenCategoryInput) hiddenCategoryInput.value = button.getAttribute("data-category");
    });
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMultiStepForm);
} else {
  initMultiStepForm();
}

document.querySelectorAll('.lang-switch').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); 
        const selectedLang = this.getAttribute('data-lang'); 
        changeLanguage(selectedLang);
    });
});

function changeLanguage(lang) {
    const langDict = translations[lang];
    if (!langDict) return; 
    
    for (const id in langDict) {
        const element = document.getElementById(id);
        
        if (element) {
            const content = langDict[id];
            
            if (typeof content === 'string') {
                element.innerHTML = content;
            } else if (typeof content === 'object') {
                for (const attr in content) {
                    if (attr === 'innerHTML') {
                        element.innerHTML = content[attr];
                    } else if (attr === 'placeholder') {
                        element.placeholder = content[attr];
                    } else {
                        element.setAttribute(attr, content[attr]);
                    }
                }
            }
        }
    }
}

// =========================================================
// Products Page 3D Flip Card Animation - Maps Page
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
    const showcaseCard = document.getElementById("dynamic-showcase-card");
    const targetSlot = document.getElementById("grid-target-box");

    function animateShowcaseOnScroll() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        const startTop = viewportHeight * 0.65;
        const startLeft = window.innerWidth / 2;
        const startWidth = 280;
        const startHeight = 340;
        const startRotation = 0;

        const targetRect = targetSlot.getBoundingClientRect();
        
        const endTop = targetRect.top + (targetRect.height / 2) + scrollY;
        const endLeft = targetRect.left + (targetRect.width / 2);
        const endWidth = targetRect.width;
        const endHeight = targetRect.height;
        const endRotation = 180; 

        const animationStartScroll = 0;
        const animationEndScroll = viewportHeight * 0.85; 

        let progress = (scrollY - animationStartScroll) / (animationEndScroll - animationStartScroll);
        progress = Math.min(Math.max(progress, 0), 1);

        const lerp = (start, end, amt) => start + (end - start) * amt;

        const currentTop = lerp(startTop, endTop, progress);
        const currentLeft = lerp(startLeft, endLeft, progress);
        const currentWidth = lerp(startWidth, endWidth, progress);
        const currentHeight = lerp(startHeight, endHeight, progress);
        const currentRotation = lerp(startRotation, endRotation, progress);

        showcaseCard.style.setProperty("--img-top", `${currentTop - scrollY}px`); 
        showcaseCard.style.setProperty("--img-left", `${currentLeft}px`);
        showcaseCard.style.setProperty("--img-width", `${currentWidth}px`);
        showcaseCard.style.setProperty("--img-height", `${currentHeight}px`);
        showcaseCard.style.setProperty("--img-rotate", `${currentRotation}deg`);
    }

    window.addEventListener("scroll", animateShowcaseOnScroll);
    window.addEventListener("resize", animateShowcaseOnScroll);
    
    animateShowcaseOnScroll();
});

//=======================================================
// Animated Hero Section - Maps Page
//=======================================================
document.addEventListener("DOMContentLoaded", () => {
    const rCanvas = document.getElementById("goldRainCanvas");
    if (!rCanvas) return;

    const rCtx = rCanvas.getContext("2d");
    let rWidth = rCanvas.width = window.innerWidth;
    let rHeight = rCanvas.height = window.innerHeight;

    const particles = [];
    const maxParticles = 90; 

    const rMouse = {
        x: undefined,
        y: undefined,
        radius: 130,
        force: 0.08
    };

    window.addEventListener("mousemove", (e) => {
        rMouse.x = e.clientX;
        rMouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
        rMouse.x = undefined;
        rMouse.y = undefined;
    });

    window.addEventListener("resize", () => {
        rWidth = rCanvas.width = window.innerWidth;
        rHeight = rCanvas.height = window.innerHeight;
    });

    class GoldDrop {
        constructor() {
            this.reset();
            this.y = Math.random() * rHeight;
        }

        reset() {
            this.x = Math.random() * rWidth;
            this.y = -20;
            this.length = Math.random() * 15 + 10;
            this.speed = Math.random() * 2 + 1.5; 
            this.opacity = Math.random() * 0.3 + 0.15; 
            this.width = Math.random() * 1 + 0.6; 
            this.vx = 0;
        }

        update() {
            this.y += this.speed;

            this.vx *= 0.95; 
            this.x += this.vx;

            if (rMouse.x !== undefined && rMouse.y !== undefined) {
                const dx = this.x - rMouse.x;
                const dy = this.y - rMouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < rMouse.radius) {
                    const forceFactor = (rMouse.radius - distance) / rMouse.radius;
                    const direction = dx > 0 ? 1 : -1;
                    this.vx += direction * forceFactor * rMouse.force * 25;
                }
            }

            if (this.y > rHeight) {
                this.reset();
            }
        }

        draw() {
            rCtx.beginPath();
            rCtx.moveTo(this.x, this.y);
            rCtx.lineTo(this.x + this.vx, this.y + this.length);
            
            rCtx.strokeStyle = `rgba(184, 154, 90, ${this.opacity})`;
            rCtx.lineWidth = this.width;
            rCtx.stroke();
        }
    }

    for (let i = 0; i < maxParticles; i++) {
        particles.push(new GoldDrop());
    }

    function animateRain() {
        rCtx.clearRect(0, 0, rWidth, rHeight);

        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateRain);
    }

    animateRain();
});

// ===============================
// Hero animation - Tectonics page
// ===============================
    document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('threadsCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const linesCount = 18; 
    let step = 0;

    const mouse = {
        x: undefined,
        y: undefined,
        radius: 180,
        force: 0.12
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);

    function animate() {
        ctx.clearRect(0, 0, width, height);

        step += 0.005; 

        for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        
        const opacity = (1 - (i / linesCount)) * 0.22;
        ctx.strokeStyle = `rgba(184, 154, 90, ${opacity})`;
        ctx.lineWidth = 1.2;

        for (let x = 0; x < width; x += 10) {
            const baseSin = Math.sin(x * 0.002 + step + (i * 0.08));
            const secondaryCos = Math.cos(x * 0.001 - step * 0.5 + (i * 0.04));
            
            let targetY = (height / 2) + (baseSin * secondaryCos * (height * 0.28));

            if (mouse.x !== undefined && mouse.y !== undefined) {
            const dx = x - mouse.x;
            const dy = targetY - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const forceFactor = (mouse.radius - distance) / mouse.radius;
                
                targetY += (mouse.y - targetY) * forceFactor * mouse.force;
            }
            }

            if (x === 0) {
            ctx.moveTo(x, targetY);
            } else {
            ctx.lineTo(x, targetY);
            }
        }
        ctx.stroke();
        }

        requestAnimationFrame(animate);
    }

    animate();
    });

    document.addEventListener('click', (event) => {
        if (!searchBox.contains(event.target) && !searchTrigger.contains(event.target)) {
            searchBox.classList.remove('active');
        }
    });

// ================================
// Portfolio Section - Tectonics Page
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.panel');
    const body = document.body;

    // Variables for Article Overlay
    const overlay = document.getElementById('article-overlay');
    const closeBtns = document.querySelectorAll('.close-article-btn, .footer-close-btn');
    const openBtns = document.querySelectorAll('.open-article');
    const articleTitle = document.getElementById('article-title');
    const articleHero = document.getElementById('article-hero-img');
    const articleBody = document.getElementById('article-body'); 

    // 1. Accordion click handler
    panels.forEach(panel => {
        panel.addEventListener('click', (e) => {
            if (e.target.classList.contains('open-article')) return;

            if (!panel.classList.contains('active')) {
                panels.forEach(p => p.classList.remove('active'));
                panel.classList.add('active');
            }
        });
    });

    // 2. Open Article Overlay and Switch Content
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const title = btn.getAttribute('data-title');
            const imgSrc = btn.getAttribute('data-img');
            const targetId = btn.getAttribute('data-target'); 
            
            articleTitle.textContent = title;
            articleHero.src = imgSrc;

            const contentTemplate = document.getElementById(targetId);
            if (contentTemplate) {
                articleBody.innerHTML = contentTemplate.innerHTML;
            }
            
            overlay.classList.add('open');
            body.style.overflow = 'hidden'; 
        });
    });

    // 3. Close Article Overlay
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            overlay.classList.remove('open');
            body.style.overflow = ''; 
        });
    });
});


// ==============================================
// Language Switcher
// ==============================================
const translations = {
    en: {
        "nav-fundamentals": "MAPS",
        "nav-stats": "TECTONICS",
        "nav-real-cases": "EROSION",
        "nav-take-action": "OCEANS",
        "nav-donations": "CLIMATE",
        "nav-contact": "REFERENCES",
        
        "hero-title-1": "Experience Mexico’s breathtaking nature, rich geology, and stunning tectonic wonders!",
        "hero-title-2": "Bienvenido!",
        "hero-desc": "Welcome to our exploration of la tierra of Mexico! From its majestic mountains and active volcanes to its vibrant coastlines, Mexico is a country defined by extraordinary natural forces, rich history, and deep cultural roots. Whether you are curious about its powerful seismic activity, unique biomas, or historic trade routes, this site offers a complete guide to the dynamic earth processes that shape this incredible nación.",
        
        "stats-title": "Three Impactful Facts",
        "stat-1-label": "VIBRANT HUMAN LANDSCAPE",
        "stat-1-num": "129+ Million Citizens",
        "stat-2-label": "GLOBAL BIODIVERSITY HOTSPOT",
        "stat-2-num": "Over 200,000 Species",
        "stat-3-label": "INTANGIBLE CULTURAL TREASURE",
        "stat-3-num": "2010 UNESCO Landmark",
        
        "cases-subheading": "Forged Through Time: The Historical Evolution of Mexico",
        "cases-desc": "Mexico's history is written directly onto its rugged landscape. From the urban engineering of ancient Mesoamerican civilizations to colonial transformations, territorial struggles, and modern political reform, historical events have continuously redefined Mexico's physical boundaries, cultural identity, and societal framework.",
        
        "case-1-title": "The Foundation of Tenochtitlan", "case-1-cat": "Tenochtitlan", "case-1-year": "1325",
        "case-1": { "data-title": "The Foundation of Tenochtitlan", "data-text": "According to historical codices, the Mexica (Aztecs) founded their capital city after wandering for decades in search of a divine sign prophesied by Huitzilopochtli: an eagle perched on a nopal cactus devouring a snake. Finding this sign on a swampy island in Lake Texcoco, they engineered a city of canals, causeways, and raised agricultural fields (chinampas). Tenochtitlan grew into one of the largest and most sophisticated cities in the pre-Columbian world, establishing the Valley of Mexico as the nation's political and economic heartland." },
        
        "case-2-title": "The Fall of Tenochtitlan & Colonial Era Begins", "case-2-cat": "Tenochtitlan", "case-2-year": "1521",
        "case-2": { "data-title": "The Fall of Tenochtitlan & Colonial Era Begins", "data-text": "Following a multi-month siege, Spanish conquistador Hernán Cortés and his indigenous allies (primarily the Tlaxcalans) defeated Aztec forces led by Cuauhtémoc. The victory brought an end to the Aztec Empire and initiated three centuries of Spanish colonial rule under the Viceroyalty of New Spain (Nueva España). During this era, Spanish architects built modern Mexico City over the ruins of Tenochtitlan, introducing Catholicism, Spanish governance, and extensive silver mining networks that transformed global commerce." },
        
        "case-3-title": "The Mexican Cry for Independence (Grito de Dolores)", "case-3-cat": "Guanajuato", "case-3-year": "1810–1821",
        "case-3": { "data-title": "The Mexican Cry for Independence (Grito de Dolores)", "data-text": "Early on the morning of September 16, 1810, Roman Catholic priest Miguel Hidalgo y Costilla rang his church bell and issued a revolutionary call to arms against Spanish colonial oppression. The Grito de Dolores ignited an 11-year war for independence, uniting rural peasants, indigenous communities, and local leaders. After years of guerrilla warfare, Agustín de Iturbide and Vicente Guerrero formed the Army of the Three Guarantees, entering Mexico City in 1821 to secure official independence from the Spanish Crown." },
        
        "case-4-title": "The Treaty of Guadalupe Hidalgo", "case-4-cat": "Hidalgo", "case-4-year": "1848",
        "case-4": { "data-title": "The Treaty of Guadalupe Hidalgo", "data-text": "Concluding the two-year Mexican-American War, the Treaty of Guadalupe Hidalgo permanently reshaped the map of North America. Under its terms, a defeated Mexico ceded over 50 percent of its sovereign territorial landmass—spanning present-day California, Nevada, Utah, Arizona, and parts of Colorado, New Mexico, and Wyoming—to the United States in exchange for $15 million. This dramatic loss redefined Mexico's northern frontier, drastically altered regional trade dynamics, and left deep socio-political scars on national identity." },
        
        "case-5-title": "The Porfiriato & Modernization Phase", "case-5-cat": "Mexico City", "case-5-year": "1876–1911",
        "case-5": { "data-title": "The Porfiriato & Modernization Phase", "data-text": "General Porfirio Díaz ruled Mexico as president for over three decades, an era known as the Porfiriato. Díaz prioritized order and rapid economic growth, inviting foreign capital to construct thousands of miles of railroad tracks, modern telegraph systems, ports, and industrial facilities. While this period modernized Mexico's infrastructure and integrated its raw materials into global markets, it generated severe economic inequality, concentration of land ownership among elite haciendas, and social unrest among the working class." },
        
        "case-6-title": "The Mexican Revolution", "case-6-cat": "Mexico", "case-6-year": "1910–1920",
        "case-6": { "data-title": "The Mexican Revolution", "data-text": "Sparked by widespread opposition to Porfirio Díaz's authoritarian rule, the Mexican Revolution broke out as a complex social, agrarian, and political conflict led by figures like Francisco Madero, Emiliano Zapata, and Pancho Villa. The decade of conflict led to radical political restructuring and culminated in the ratification of the progressive 1917 Constitution of Mexico. This cornerstone document enshrined worker rights, nationalized subsoil mineral resources, and established sweeping agrarian reforms through the ejido land distribution system." },
        
        "case-7-title": "Modern Mexico: Democratic Transition & Contemporary Identity", "case-7-cat": "Mexico", "case-7-year": "2000–Present",
        "case-7": { "data-title": "Modern Mexico: Democratic Transition & Contemporary Identity", "data-text": "Today, Mexico stands as a federal constitutional republic of over 129 million people, shaped by its history of resilience and adaptation. The year 2000 marked a historical democratic milestone when opposition leadership ended 71 consecutive years of single-party rule. Modern Mexico functions as a major industrial powerhouse and international trade hub, holding crucial trade agreements like the USMCA. The nation reflects a distinct fusion of Mesoamerican indigenous traditions and Spanish colonial heritage, maintaining its position as Latin America's second-largest economy while continuously balancing urban industrial growth with cultural preservation." },

        "fund-main-title": "In order to grasp the fundamental aspects of Mexican culture and society,<br/><em>consider the following four questions:</em>",
        "fund-q1-title": "How do ancient Mesoamerican traditions and Spanish colonial influences coexist in daily life?",
        "fund-q1-desc": "Mexican society is defined by mestizaje—a rich synthesis of indigenous heritage and Spanish customs seen in architecture, language, community celebrations, and religious devotion.",
        "fund-q2-title": "What role does family (la familia) play in shaping community structure?",
        "fund-q2-desc": "Family serves as the primary social unit in Mexico, where multi-generational households, deep respect for elders, and close-knit community networks form the backbone of daily life.",
        "fund-q3-title": "How does geography influence cultural regionalism across the nation?",
        "fund-q3-desc": "Distinct landscapes have created diverse regional identities—from northern vaquero traditions in arid plains to rich indigenous traditions and colorful textiles in southern states like Oaxaca and Chiapas.",
        "fund-q4-title": "Why are national holidays and public gatherings central to Mexican social unity?",
        "fund-q4-desc": "Events such as Día de los Muertos and Día de la Independencia bring communities together to honor memory, shared heritage, and national pride through public arts, traditional music, and food.",
        
        "donations-title": "The Economic Architecture of Mexico",
        "donations-desc": "Mexico boasts the second-largest economy in Latin America and ranks among the world's major manufacturing hubs. Driven by international trade agreements, mineral wealth, and a dynamic workforce, Mexico plays a critical role in the global supply chain.",
        "don-irc-cat": "What are the main sources of national income for Mexico?",
        "don-irc-focus": "Answer:",
        "don-irc-desc": "Mexico's main income sources include advanced industrial manufacturing (automotive, electronics, and aerospace), crude oil exports, silver and mineral extraction, international tourism, and agricultural exports (avocados, berries, and tequila).",
        "don-pf-cat": "What is the current daily minimum wage in Mexico?",
        "don-pf-focus": "Answer:",
        "don-pf-desc": "As of recent economic updates, Mexico’s general daily minimum wage is approximately 278.80 MXN per day (and higher along the Northern Border Free Zone at roughly 419.88 MXN per day to match regional cost conditions).",
        "don-uni-cat": "How does the cost of living compare to other North American economies?",
        "don-uni-focus": "Answer:",
        "don-uni-desc": "While major metropolitan hubs like Mexico City, Guadalajara, and Monterrey feature rising housing costs, overall essential living costs (groceries, public transit, and health services) remain significantly lower than in the United States or Canada, supporting strong local purchasing power.",
        
        "divider-text": "Embark on a geographical journey beneath the surface to discover how tectonic energy, majestic mountain ranges, and active volcanoes continuously sculpt the vibrant nation of Mexico.",
        
        "action-title": "Explore Mexico's<br>Earth Processes",
        "action-1-title": "Maps",
        "action-1-desc": "Examine historical trade routes, continental positions, boundary changes, and famous cartographers who mapped New Spain and modern Mexico.",
        "action-2-title": "Tectonics",
        "action-2-desc": "Uncover the active plate boundaries, seismic hazard monitoring, major mountain systems, mineral wealth, and iconic volcanoes like Popocatépetl.",
        "action-3-title": "Erosion",
        "action-3-desc": "Discover physical and chemical weathering processes, the formation of Yucatán cenotes, major river basins, and desertification challenges.",
        "action-4-title": "Oceans",
        "action-4-desc": "Analyze coastal formations, ocean trade routes, hurricane patterns, regional islands, and maritime economic impacts.",
        "action-5-title": "Climate",
        "action-5-desc": "Investigate Köppen climate classifications across Mexico, global wind circulation patterns, diverse biomes, and unique native flora and fauna.",

        "close-modal": "← Back to Timeline",
        
        "tab-1-text": "Your Name", "tab-2-text": "Contact Method", "tab-3-text": "Note",
        "step-1-sub": "Step 1", "step-1-title": "Your Name", "step-1-desc": "Please enter your details so we know who we are communicating with.",
        "lbl-fname": "First Name<span class='required'>*</span>", "first-name": { placeholder: "Enter your first name" }, "err-fname": "First name is required.",
        "lbl-lname": "Last Name<span class='required'>*</span>", "last-name": { placeholder: "Enter your last name" }, "err-lname": "Last name is required.",
        "lbl-nick": "Nickname / What should we call you <span class='optional'>(Optional)</span>", "nickname": { placeholder: "What do you prefer us to call you?" },
        
        "step-2-sub": "Step 2", "step-2-title": "Contact Method", "step-2-desc": "Select how you prefer our team to contact you.",
        "pref-email": "Email Address", "pref-phone": "Phone / Mobile",
        "lbl-contact-email": "Email Address<span class='required'>*</span>", "contact-email": { placeholder: "example@email.com" }, "err-email": "Please enter a valid email address.",
        "lbl-contact-phone": "Phone Number<span class='required'>*</span>", "err-phone": "Please enter a valid phone number.",

        "step-3-sub": "Step 3", "step-3-title": "Note", "step-3-desc": "Help us categorize your request and leave your detailed comments below.",
        "lbl-category": "Select a Category<span class='required'>*</span>",
        "cat-btn-1": "Make A Suggestion", "cat-btn-2": "Concern", "cat-btn-3": "Keep in Touch", "cat-btn-4": "Other",
        "lbl-reason": "Reason for Contact<span class='required'>*</span>", "contact-reason": { placeholder: "Write your questions, concerns, or comments here..." }, "err-reason": "Please write the reason for your message.",
        
        "succ-title": "Form Submitted!", "succ-desc": "Your request has been processed successfully. We will contact you very soon.",
        "prev-btn": "‹ Back", "next-btn": "Next Step ›"
    },
    
    es: {
        "nav-fundamentals": "MAPAS",
        "nav-stats": "TECTÓNICA",
        "nav-real-cases": "EROSIÓN",
        "nav-take-action": "OCÉANOS",
        "nav-donations": "CLIMA",
        "nav-contact": "REFERENCIAS",
        
        "hero-title-1": "¡Experimenta la impresionante naturaleza, la rica geología y las asombrosas maravillas tectónicas de México!",
        "hero-title-2": "¡Bienvenido!",
        "hero-desc": "¡Bienvenido a nuestra exploración de la tierra de México! Desde sus majestuosas montañas y volcanes activos hasta sus vibrantes costas, México es un país definido por fuerzas naturales extraordinarias, una rica historia y profundas raíces culturales. Ya sea que tengas curiosidad por su poderosa actividad sísmica, biomas únicos o rutas comerciales históricas, este sitio ofrece una guía completa de los procesos terrestres dinámicos que dan forma a esta increíble nación.",
        
        "stats-title": "Tres Datos Impactantes",
        "stat-1-label": "PAISAJE HUMANO VIBRANTE",
        "stat-1-num": "Más de 129 Millones",
        "stat-2-label": "PUNTO CLAVE DE BIODIVERSIDAD",
        "stat-2-num": "Más de 200,000 Especies",
        "stat-3-label": "TESORO CULTURAL INTANGIBLE",
        "stat-3-num": "Patrimonio UNESCO 2010",
        
        "cases-subheading": "Forjado a Través del Tiempo: La Evolución Histórica de México",
        "cases-desc": "La historia de México está escrita directamente sobre su accidentado paisaje. Desde la ingeniería urbana de las antiguas civilizaciones mesoamericanas hasta las transformaciones coloniales, luchas territoriales y reformas políticas modernas, los eventos históricos han redefinido continuamente las fronteras físicas, la identidad cultural y el marco social de México.",
        
        "case-1-title": "La Fundación de Tenochtitlán", "case-1-cat": "Tenochtitlán", "case-1-year": "1325",
        "case-1": { "data-title": "La Fundación de Tenochtitlán", "data-text": "Según los códices históricos, los mexicas (aztecas) fundaron su capital después de vagar durante décadas en busca de una señal divina profetizada por Huitzilopochtli: un águila posada sobre un nopal devorando una serpiente. Al encontrar esta señal en una isla pantanosa del lago de Texcoco, diseñaron una ciudad de canales, calzadas y campos agrícolas elevados (chinampas). Tenochtitlán se convirtió en una de las ciudades más grandes y sofisticadas del mundo precolombino." },
        
        "case-2-title": "La Caída de Tenochtitlán y el Inicio de la Era Colonial", "case-2-cat": "Tenochtitlán", "case-2-year": "1521",
        "case-2": { "data-title": "La Caída de Tenochtitlán y el Inicio de la Era Colonial", "data-text": "Tras un asedio de varios meses, el conquistador español Hernán Cortés y sus aliados indígenas (principalmente tlaxcaltecas) derrotaron a las fuerzas aztecas lideradas por Cuauhtémoc. La victoria puso fin al Imperio Azteca e inició tres siglos de dominio colonial español bajo el Virreinato de la Nueva España. Durante esta época, los arquitectos españoles construyeron la moderna Ciudad de México sobre las ruinas de Tenochtitlán, introduciendo el catolicismo, el gobierno español y extensas redes de minería de plata." },
        
        "case-3-title": "El Grito de Independencia (Grito de Dolores)", "case-3-cat": "Guanajuato", "case-3-year": "1810–1821",
        "case-3": { "data-title": "El Grito de Independencia (Grito de Dolores)", "data-text": "En la madrugada del 16 de septiembre de 1810, el sacerdote católico Miguel Hidalgo y Costilla tocó la campana de su iglesia y emitió un llamado revolucionario a las armas contra la opresión colonial española. El Grito de Dolores encendió una guerra de independencia de 11 años, uniendo a campesinos rurales, comunidades indígenas y líderes locales. Años después, el Ejército Trigarante entró en la Ciudad de México en 1821 para asegurar la independencia oficial." },
        
        "case-4-title": "El Tratado de Guadalupe Hidalgo", "case-4-cat": "Hidalgo", "case-4-year": "1848",
        "case-4": { "data-title": "El Tratado de Guadalupe Hidalgo", "data-text": "Al concluir la Guerra México-Estadounidense de dos años, el Tratado de Guadalupe Hidalgo reformó permanentemente el mapa de América del Norte. Bajo sus términos, un México derrotado cedió más del 50 por ciento de su masa territorial soberana—que abarca los actuales California, Nevada, Utah, Arizona y partes de Colorado, Nuevo México y Wyoming—a los Estados Unidos a cambio de 15 millones de dólares." },
        
        "case-5-title": "El Porfiriato y la Fase de Modernización", "case-5-cat": "Ciudad de México", "case-5-year": "1876–1911",
        "case-5": { "data-title": "El Porfiriato y la Fase de Modernización", "data-text": "El general Porfirio Díaz gobernó México como presidente durante más de tres décadas, una era conocida como el Porfiriato. Díaz priorizó el orden y el rápido crecimiento económico, invitando al capital extranjero a construir miles de kilómetros de vías férreas, sistemas telegráficos modernos, puertos e instalaciones industriales. Si bien este período modernizó la infraestructura de México, generó una grave desigualdad económica." },
        
        "case-6-title": "La Revolución Mexicana", "case-6-cat": "México", "case-6-year": "1910–1920",
        "case-6": { "data-title": "La Revolución Mexicana", "data-text": "Desatada por la oposición generalizada al gobierno autoritario de Porfirio Díaz, la Revolución Mexicana estalló como un complejo conflicto social, agrario y político liderado por figuras como Francisco I. Madero, Emiliano Zapata y Pancho Villa. La década de conflicto condujo a una reestructuración política radical y culminó con la ratificación de la progresista Constitución de 1917, estableciendo amplias reformas agrarias a través del sistema de ejidos." },
        
        "case-7-title": "México Moderno: Transición Democrática e Identidad Contemporánea", "case-7-cat": "México", "case-7-year": "2000–Presente",
        "case-7": { "data-title": "México Moderno: Transición Democrática e Identidad Contemporánea", "data-text": "Hoy, México se erige como una república constitucional federal de más de 129 millones de personas. El año 2000 marcó un hito democrático histórico cuando el liderazgo de la oposición puso fin a 71 años consecutivos de gobierno de un solo partido. El México moderno funciona como una importante potencia industrial y un centro de comercio internacional, reflejando una fusión distinta de las tradiciones indígenas mesoamericanas y la herencia colonial española." },

        "fund-main-title": "Para comprender los aspectos fundamentales de la cultura y la sociedad mexicanas,<br/><em>considere las siguientes cuatro preguntas:</em>",
        "fund-q1-title": "¿Cómo coexisten las antiguas tradiciones mesoamericanas y las influencias coloniales españolas en la vida diaria?",
        "fund-q1-desc": "La sociedad mexicana se define por el mestizaje—una rica síntesis de herencia indígena y costumbres españolas que se ve en la arquitectura, el lenguaje, las celebraciones comunitarias y la devoción religiosa.",
        "fund-q2-title": "¿Qué papel juega la familia en la configuración de la estructura comunitaria?",
        "fund-q2-desc": "La familia sirve como la unidad social principal en México, donde los hogares multigeneracionales, el profundo respeto por los mayores y las redes comunitarias unidas forman la columna vertebral de la vida diaria.",
        "fund-q3-title": "¿Cómo influye la geografía en el regionalismo cultural a lo largo de la nación?",
        "fund-q3-desc": "Los distintos paisajes han creado diversas identidades regionales—desde las tradiciones vaqueras del norte en las llanuras áridas hasta las ricas tradiciones indígenas y textiles coloridos en estados del sur como Oaxaca y Chiapas.",
        "fund-q4-title": "¿Por qué las fiestas nacionales y las reuniones públicas son fundamentales para la unidad social mexicana?",
        "fund-q4-desc": "Eventos como el Día de los Muertos y el Día de la Independencia reúnen a las comunidades para honrar la memoria, la herencia compartida y el orgullo nacional a través de las artes públicas, la música tradicional y la comida.",
        
        "donations-title": "La Arquitectura Económica de México",
        "donations-desc": "México ostenta la segunda economía más grande de América Latina y se encuentra entre los principales centros de fabricación del mundo. Impulsado por acuerdos comerciales internacionales, la riqueza mineral y una fuerza laboral dinámica, México juega un papel fundamental en la cadena de suministro global.",
        "don-irc-cat": "¿Cuáles son las principales fuentes de ingresos nacionales de México?",
        "don-irc-focus": "Respuesta:",
        "don-irc-desc": "Las principales fuentes de ingresos de México incluyen la manufactura industrial avanzada (automotriz, electrónica y aeroespacial), exportaciones de petróleo crudo, extracción de plata y minerales, turismo internacional y exportaciones agrícolas (aguacates, bayas y tequila).",
        "don-pf-cat": "¿Cuál es el salario mínimo diario actual en México?",
        "don-pf-focus": "Respuesta:",
        "don-pf-desc": "A partir de las actualizaciones económicas recientes, el salario mínimo diario general de México es de aproximadamente 278.80 MXN por día (y más alto en la Zona Libre de la Frontera Norte a aproximadamente 419.88 MXN por día para igualar las condiciones de costos regionales).",
        "don-uni-cat": "¿Cómo se compara el costo de vida con el de otras economías de América del Norte?",
        "don-uni-focus": "Respuesta:",
        "don-uni-desc": "Si bien los principales centros metropolitanos como la Ciudad de México, Guadalajara y Monterrey presentan costos de vivienda en aumento, los costos de vida esenciales en general siguen siendo significativamente más bajos que en los Estados Unidos o Canadá, respaldando un fuerte poder adquisitivo local.",
        
        "divider-text": "Embárcate en un viaje geográfico debajo de la superficie para descubrir cómo la energía tectónica, las majestuosas cadenas montañosas y los volcanes activos esculpen continuamente la vibrante nación de México.",
        
        "action-title": "Explora los Procesos Terrestres<br>de México",
        "action-1-title": "Mapas",
        "action-1-desc": "Examina rutas comerciales históricas, posiciones continentales, cambios de límites y cartógrafos famosos que mapearon la Nueva España y el México moderno.",
        "action-2-title": "Tectónica",
        "action-2-desc": "Descubre los límites de placas activos, el monitoreo de peligros sísmicos, los principales sistemas montañosos, la riqueza mineral y volcanes icónicos como el Popocatépetl.",
        "action-3-title": "Erosión",
        "action-3-desc": "Descubre los procesos de meteorización física y química, la formación de cenotes en Yucatán, las principales cuencas fluviales y los desafíos de la desertificación.",
        "action-4-title": "Océanos",
        "action-4-desc": "Analiza las formaciones costeras, las rutas comerciales oceánicas, los patrones de huracanes, las islas regionales y los impactos económicos marítimos.",
        "action-5-title": "Clima",
        "action-5-desc": "Investiga las clasificaciones climáticas de Köppen en todo México, los patrones de circulación global del viento, biomas diversos y la flora y fauna nativas únicas.",

        "close-modal": "← Volver a la Línea de Tiempo",
        
        "tab-1-text": "Tu Nombre", "tab-2-text": "Método de Contacto", "tab-3-text": "Nota",
        "step-1-sub": "Paso 1", "step-1-title": "Tu Nombre", "step-1-desc": "Por favor, ingresa tus datos para que sepamos con quién nos comunicamos.",
        "lbl-fname": "Nombre<span class='required'>*</span>", "first-name": { placeholder: "Ingresa tu nombre" }, "err-fname": "El nombre es obligatorio.",
        "lbl-lname": "Apellido<span class='required'>*</span>", "last-name": { placeholder: "Ingresa tu apellido" }, "err-lname": "El apellido es obligatorio.",
        "lbl-nick": "Apodo / Cómo deberíamos llamarte <span class='optional'>(Opcional)</span>", "nickname": { placeholder: "¿Cómo prefieres que te llamemos?" },
        
        "step-2-sub": "Paso 2", "step-2-title": "Método de Contacto", "step-2-desc": "Selecciona cómo prefieres que nuestro equipo te contacte.",
        "pref-email": "Correo Electrónico", "pref-phone": "Teléfono / Móvil",
        "lbl-contact-email": "Correo Electrónico<span class='required'>*</span>", "contact-email": { placeholder: "ejemplo@correo.com" }, "err-email": "Por favor, ingresa un correo válido.",
        "lbl-contact-phone": "Número de Teléfono<span class='required'>*</span>", "err-phone": "Por favor, ingresa un teléfono válido.",

        "step-3-sub": "Paso 3", "step-3-title": "Nota", "step-3-desc": "Ayúdanos a categorizar tu solicitud y deja tus comentarios detallados a continuación.",
        "lbl-category": "Selecciona una Categoría<span class='required'>*</span>",
        "cat-btn-1": "Hacer una Sugerencia", "cat-btn-2": "Inquietud", "cat-btn-3": "Mantenerse en Contacto", "cat-btn-4": "Otro",
        "lbl-reason": "Motivo del Contacto<span class='required'>*</span>", "contact-reason": { placeholder: "Escribe tus preguntas, inquietudes o comentarios aquí..." }, "err-reason": "Por favor, escribe el motivo de tu mensaje.",
        
        "succ-title": "¡Formulario Enviado!", "succ-desc": "Tu solicitud ha sido procesada con éxito. Nos pondremos en contacto contigo muy pronto.",
        "prev-btn": "‹ Volver", "next-btn": "Siguiente Paso ›"
    },

    fr: {
        "nav-fundamentals": "CARTES",
        "nav-stats": "TECTONIQUE",
        "nav-real-cases": "ÉROSION",
        "nav-take-action": "OCÉANS",
        "nav-donations": "CLIMAT",
        "nav-contact": "RÉFÉRENCES",
        
        "hero-title-1": "Découvrez la nature époustouflante, la géologie riche et les merveilles tectoniques du Mexique !",
        "hero-title-2": "Bienvenue !",
        "hero-desc": "Bienvenue dans notre exploration de la terre du Mexique ! De ses montagnes majestueuses et volcans actifs à ses côtes dynamiques, le Mexique est un pays défini par des forces naturelles extraordinaires, une histoire riche et de profondes racines culturelles. Que vous soyez curieux de sa puissante activité sismique, de ses biomes uniques ou de ses routes commerciales historiques, ce site offre un guide complet des processus terrestres dynamiques qui façonnent cette incroyable nation.",
        
        "stats-title": "Trois Faits Marquants",
        "stat-1-label": "PAYSAGE HUMAIN DYNAMIQUE",
        "stat-1-num": "Plus de 129 Millions",
        "stat-2-label": "POINT CHAUD DE LA BIODIVERSITÉ",
        "stat-2-num": "Plus de 200 000 Espèces",
        "stat-3-label": "TRÉSOR CULTUREL IMMATÉRIEL",
        "stat-3-num": "Site UNESCO 2010",
        
        "cases-subheading": "Forgé à Travers le Temps : L'Évolution Historique du Mexique",
        "cases-desc": "L'histoire du Mexique est directement inscrite sur son paysage accidenté. De l'ingénierie urbaine des anciennes civilisations mésoaméricaines aux transformations coloniales, luttes territoriales et réformes politiques modernes, les événements historiques ont continuellement redéfini les frontières physiques, l'identité culturelle et le cadre sociétal du Mexique.",
        
        "case-1-title": "La Fondation de Tenochtitlan", "case-1-cat": "Tenochtitlan", "case-1-year": "1325",
        "case-1": { "data-title": "La Fondation de Tenochtitlan", "data-text": "Selon les codex historiques, les Mexicas (Aztèques) ont fondé leur capitale après avoir erré pendant des décennies à la recherche d'un signe divin prophétisé par Huitzilopochtli : un aigle perché sur un cactus nopal dévorant un serpent. En trouvant ce signe sur une île marécageuse du lac Texcoco, ils ont conçu une ville de canaux, de chaussées et de champs agricoles surélevés (chinampas)." },
        
        "case-2-title": "La Chute de Tenochtitlan et le Début de l'Ère Coloniale", "case-2-cat": "Tenochtitlan", "case-2-year": "1521",
        "case-2": { "data-title": "La Chute de Tenochtitlan et le Début de l'Ère Coloniale", "data-text": "Après un siège de plusieurs mois, le conquistador espagnol Hernán Cortés et ses alliés indigènes (principalement les Tlaxcaltèques) ont vaincu les forces aztèques dirigées par Cuauhtémoc. Cette victoire a mis fin à l'Empire aztèque et initié trois siècles de domination coloniale espagnole sous la vice-royauté de la Nouvelle-Espagne." },
        
        "case-3-title": "Le Cri d'Indépendance Mexicain (Grito de Dolores)", "case-3-cat": "Guanajuato", "case-3-year": "1810–1821",
        "case-3": { "data-title": "Le Cri d'Indépendance Mexicain (Grito de Dolores)", "data-text": "Tôt le matin du 16 septembre 1810, le prêtre catholique Miguel Hidalgo y Costilla a sonné la cloche de son église et a lancé un appel révolutionnaire aux armes contre l'oppression coloniale espagnole. Le Grito de Dolores a déclenché une guerre d'indépendance de 11 ans." },
        
        "case-4-title": "Le Traité de Guadalupe Hidalgo", "case-4-cat": "Hidalgo", "case-4-year": "1848",
        "case-4": { "data-title": "Le Traité de Guadalupe Hidalgo", "data-text": "Concluant la guerre américano-mexicaine de deux ans, le traité de Guadalupe Hidalgo a remodelé de façon permanente la carte de l'Amérique du Nord. En vertu de ses termes, un Mexique vaincu a cédé plus de 50 pour cent de sa masse terrestre souveraine aux États-Unis en échange de 15 millions de dollars." },
        
        "case-5-title": "Le Porfiriato et la Phase de Modernisation", "case-5-cat": "Mexico", "case-5-year": "1876–1911",
        "case-5": { "data-title": "Le Porfiriato et la Phase de Modernisation", "data-text": "Le général Porfirio Díaz a dirigé le Mexique en tant que président pendant plus de trois décennies, une époque connue sous le nom de Porfiriato. Díaz a donné la priorité à l'ordre et à une croissance économique rapide, invitant des capitaux étrangers pour construire des milliers de kilomètres de voies ferrées." },
        
        "case-6-title": "La Révolution Mexicaine", "case-6-cat": "Mexique", "case-6-year": "1910–1920",
        "case-6": { "data-title": "La Révolution Mexicaine", "data-text": "Déclenchée par une opposition généralisée au régime autoritaire de Porfirio Díaz, la Révolution mexicaine a éclaté comme un conflit social, agraire et politique complexe dirigé par des personnalités telles que Francisco Madero, Emiliano Zapata et Pancho Villa." },
        
        "case-7-title": "Mexique Moderne : Transition Démocratique et Identité Contemporaine", "case-7-cat": "Mexique", "case-7-year": "2000–Présent",
        "case-7": { "data-title": "Mexique Moderne : Transition Démocratique et Identité Contemporaine", "data-text": "Aujourd'hui, le Mexique est une république constitutionnelle fédérale de plus de 129 millions d'habitants. L'an 2000 a marqué une étape démocratique historique lorsque l'opposition a mis fin à 71 années consécutives de règne d'un parti unique. La nation reflète une fusion distincte des traditions indigènes et de l'héritage colonial espagnol." },

        "fund-main-title": "Afin de saisir les aspects fondamentaux de la culture et de la société mexicaines,<br/><em>considérez les quatre questions suivantes :</em>",
        "fund-q1-title": "Comment les anciennes traditions mésoaméricaines et les influences coloniales espagnoles coexistent-elles dans la vie quotidienne ?",
        "fund-q1-desc": "La société mexicaine est définie par le mestizaje — une riche synthèse de l'héritage indigène et des coutumes espagnoles observée dans l'architecture, la langue, les célébrations communautaires et la dévotion religieuse.",
        "fund-q2-title": "Quel rôle la famille (la familia) joue-t-elle dans la structure communautaire ?",
        "fund-q2-desc": "La famille sert d'unité sociale principale au Mexique, où les foyers multigénérationnels, le profond respect pour les aînés et les réseaux communautaires soudés forment l'épine dorsale de la vie quotidienne.",
        "fund-q3-title": "Comment la géographie influence-t-elle le régionalisme culturel à travers le pays ?",
        "fund-q3-desc": "Des paysages distincts ont créé diverses identités régionales — des traditions vaquero du nord dans les plaines arides aux riches traditions indigènes et aux textiles colorés dans les États du sud comme Oaxaca et Chiapas.",
        "fund-q4-title": "Pourquoi les fêtes nationales et les rassemblements publics sont-ils essentiels à l'unité sociale mexicaine ?",
        "fund-q4-desc": "Des événements tels que le Día de los Muertos et le Día de la Independencia rassemblent les communautés pour honorer la mémoire, l'héritage partagé et la fierté nationale à travers les arts publics, la musique traditionnelle et la nourriture.",
        
        "donations-title": "L'Architecture Économique du Mexique",
        "donations-desc": "Le Mexique possède la deuxième plus grande économie d'Amérique latine et se classe parmi les principaux centres manufacturiers du monde. Stimulé par des accords commerciaux internationaux, la richesse minérale et une main-d'œuvre dynamique, le Mexique joue un rôle essentiel dans la chaîne d'approvisionnement mondiale.",
        "don-irc-cat": "Quelles sont les principales sources de revenus nationaux pour le Mexique ?",
        "don-irc-focus": "Réponse :",
        "don-irc-desc": "Les principales sources de revenus du Mexique comprennent la fabrication industrielle avancée (automobile, électronique et aérospatiale), les exportations de pétrole brut, l'extraction d'argent et de minéraux, le tourisme international et les exportations agricoles (avocats, baies et tequila).",
        "don-pf-cat": "Quel est le salaire minimum journalier actuel au Mexique ?",
        "don-pf-focus": "Réponse :",
        "don-pf-desc": "D'après les récentes mises à jour économiques, le salaire minimum journalier général du Mexique est d'environ 278,80 MXN (et plus élevé dans la zone libre de la frontière nord, à environ 419,88 MXN pour correspondre aux conditions de coût régionales).",
        "don-uni-cat": "Comment le coût de la vie se compare-t-il à celui des autres économies nord-américaines ?",
        "don-uni-focus": "Réponse :",
        "don-uni-desc": "Alors que les grands pôles métropolitains comme Mexico, Guadalajara et Monterrey connaissent une hausse des coûts du logement, les coûts de la vie essentiels (épicerie, transports publics, services de santé) restent globalement nettement inférieurs à ceux des États-Unis ou du Canada.",
        
        "divider-text": "Embarquez pour un voyage géographique sous la surface pour découvrir comment l'énergie tectonique, les chaînes de montagnes majestueuses et les volcans actifs sculptent continuellement la vibrante nation du Mexique.",
        
        "action-title": "Explorez les Processus Terrestres<br>du Mexique",
        "action-1-title": "Cartes",
        "action-1-desc": "Examinez les routes commerciales historiques, les positions continentales, les changements de frontières et les célèbres cartographes qui ont cartographié la Nouvelle-Espagne et le Mexique moderne.",
        "action-2-title": "Tectonique",
        "action-2-desc": "Découvrez les limites des plaques actives, la surveillance des risques sismiques, les principaux systèmes montagneux, la richesse minérale et des volcans emblématiques comme le Popocatépetl.",
        "action-3-title": "Érosion",
        "action-3-desc": "Découvrez les processus d'altération physique et chimique, la formation des cénotes du Yucatán, les grands bassins fluviaux et les défis de la désertification.",
        "action-4-title": "Océans",
        "action-4-desc": "Analysez les formations côtières, les routes commerciales océaniques, les régimes des ouragans, les îles régionales et les impacts économiques maritimes.",
        "action-5-title": "Climat",
        "action-5-desc": "Étudiez les classifications climatiques de Köppen à travers le Mexique, les modèles de circulation globale des vents, les divers biomes, ainsi que la flore et la faune indigènes uniques.",

        "close-modal": "← Retour à la Chronologie",
        
        "tab-1-text": "Votre Nom", "tab-2-text": "Méthode de Contact", "tab-3-text": "Note",
        "step-1-sub": "Étape 1", "step-1-title": "Votre Nom", "step-1-desc": "Veuillez saisir vos coordonnées pour que nous sachions avec qui nous communiquons.",
        "lbl-fname": "Prénom<span class='required'>*</span>", "first-name": { placeholder: "Entrez votre prénom" }, "err-fname": "Le prénom est requis.",
        "lbl-lname": "Nom de famille<span class='required'>*</span>", "last-name": { placeholder: "Entrez votre nom" }, "err-lname": "Le nom est requis.",
        "lbl-nick": "Surnom / Comment devrions-nous vous appeler <span class='optional'>(Facultatif)</span>", "nickname": { placeholder: "Comment préférez-vous qu'on vous appelle ?" },
        
        "step-2-sub": "Étape 2", "step-2-title": "Méthode de Contact", "step-2-desc": "Sélectionnez comment vous préférez que notre équipe vous contacte.",
        "pref-email": "Adresse E-mail", "pref-phone": "Téléphone / Mobile",
        "lbl-contact-email": "Adresse E-mail<span class='required'>*</span>", "contact-email": { placeholder: "exemple@email.com" }, "err-email": "Veuillez entrer une adresse e-mail valide.",
        "lbl-contact-phone": "Numéro de Téléphone<span class='required'>*</span>", "err-phone": "Veuillez entrer un numéro valide.",

        "step-3-sub": "Étape 3", "step-3-title": "Note", "step-3-desc": "Aidez-nous à catégoriser votre demande et laissez vos commentaires détaillés ci-dessous.",
        "lbl-category": "Sélectionnez une Catégorie<span class='required'>*</span>",
        "cat-btn-1": "Faire une Suggestion", "cat-btn-2": "Inquiétude", "cat-btn-3": "Garder le Contact", "cat-btn-4": "Autre",
        "lbl-reason": "Raison du Contact<span class='required'>*</span>", "contact-reason": { placeholder: "Écrivez vos questions, inquiétudes ou commentaires ici..." }, "err-reason": "Veuillez écrire la raison de votre message.",
        
        "succ-title": "Formulaire Soumis !", "succ-desc": "Votre demande a été traitée avec succès. Nous vous contacterons très bientôt.",
        "prev-btn": "‹ Retour", "next-btn": "Étape Suivante ›"
    },

    pt: {
        "nav-fundamentals": "MAPAS",
        "nav-stats": "TECTÔNICA",
        "nav-real-cases": "EROSÃO",
        "nav-take-action": "OCEANOS",
        "nav-donations": "CLIMA",
        "nav-contact": "REFERÊNCIAS",
        
        "hero-title-1": "Experimente a natureza deslumbrante, a rica geologia e as maravilhas tectônicas do México!",
        "hero-title-2": "Bem-vindo!",
        "hero-desc": "Bem-vindo à nossa exploração da terra do México! Desde suas majestosas montanhas e vulcões ativos até suas costas vibrantes, o México é um país definido por forças naturais extraordinárias, uma rica história e profundas raízes culturais. Se você tem curiosidade sobre sua poderosa atividade sísmica, biomas únicos ou rotas comerciais históricas, este site oferece um guia completo dos processos dinâmicos da terra que moldam esta incrível nação.",
        
        "stats-title": "Três Fatos Impactantes",
        "stat-1-label": "PAISAGEM HUMANA VIBRANTE",
        "stat-1-num": "Mais de 129 Milhões",
        "stat-2-label": "PONTO DE BIODIVERSIDADE GLOBAL",
        "stat-2-num": "Mais de 200.000 Espécies",
        "stat-3-label": "TESOURO CULTURAL INTANGÍVEL",
        "stat-3-num": "Patrimônio UNESCO 2010",
        
        "cases-subheading": "Forjado Através do Tempo: A Evolução Histórica do México",
        "cases-desc": "A história do México está escrita diretamente em sua paisagem acidentada. Desde a engenharia urbana das antigas civilizações mesoamericanas até as transformações coloniais, lutas territoriais e reformas políticas modernas, eventos históricos têm redefinido continuamente as fronteiras físicas, a identidade cultural e a estrutura social do México.",
        
        "case-1-title": "A Fundação de Tenochtitlan", "case-1-cat": "Tenochtitlan", "case-1-year": "1325",
        "case-1": { "data-title": "A Fundação de Tenochtitlan", "data-text": "Segundo códices históricos, os mexicas (astecas) fundaram sua capital após vagarem por décadas em busca de um sinal divino profetizado por Huitzilopochtli: uma águia empoleirada em um cacto nopal devorando uma serpente. Encontrando este sinal em uma ilha pantanosa no Lago Texcoco, eles construíram uma cidade de canais, calçadas e campos agrícolas elevados (chinampas)." },
        
        "case-2-title": "A Queda de Tenochtitlan e o Início da Era Colonial", "case-2-cat": "Tenochtitlan", "case-2-year": "1521",
        "case-2": { "data-title": "A Queda de Tenochtitlan e o Início da Era Colonial", "data-text": "Após um cerco de vários meses, o conquistador espanhol Hernán Cortés e seus aliados indígenas derrotaram as forças astecas lideradas por Cuauhtémoc. A vitória pôs fim ao Império Asteca e iniciou três séculos de domínio colonial espanhol sob o Vice-Reino da Nova Espanha. Durante esta era, arquitetos espanhóis construíram a moderna Cidade do México sobre as ruínas de Tenochtitlan." },
        
        "case-3-title": "O Grito de Independência Mexicano (Grito de Dolores)", "case-3-cat": "Guanajuato", "case-3-year": "1810–1821",
        "case-3": { "data-title": "O Grito de Independência Mexicano (Grito de Dolores)", "data-text": "Na madrugada de 16 de setembro de 1810, o padre católico Miguel Hidalgo y Costilla tocou o sino de sua igreja e fez um chamado revolucionário às armas contra a opressão colonial espanhola. O Grito de Dolores acendeu uma guerra de independência de 11 anos, unindo camponeses, comunidades indígenas e líderes locais." },
        
        "case-4-title": "O Tratado de Guadalupe Hidalgo", "case-4-cat": "Hidalgo", "case-4-year": "1848",
        "case-4": { "data-title": "O Tratado de Guadalupe Hidalgo", "data-text": "Concluindo a Guerra Mexicano-Americana de dois anos, o Tratado de Guadalupe Hidalgo remodelou permanentemente o mapa da América do Norte. Sob seus termos, um México derrotado cedeu mais de 50 por cento de sua massa territorial soberana aos Estados Unidos em troca de 15 milhões de dólares." },
        
        "case-5-title": "O Porfiriato e a Fase de Modernização", "case-5-cat": "Cidade do México", "case-5-year": "1876–1911",
        "case-5": { "data-title": "O Porfiriato e a Fase de Modernização", "data-text": "O General Porfirio Díaz governou o México como presidente por mais de três décadas, uma era conhecida como o Porfiriato. Díaz priorizou a ordem e o rápido crescimento econômico, convidando capital estrangeiro para construir milhares de quilômetros de ferrovias, sistemas de telégrafo modernos, portos e instalações industriais." },
        
        "case-6-title": "A Revolução Mexicana", "case-6-cat": "México", "case-6-year": "1910–1920",
        "case-6": { "data-title": "A Revolução Mexicana", "data-text": "Desencadeada pela ampla oposição ao regime autoritário de Porfirio Díaz, a Revolução Mexicana eclodiu como um complexo conflito social, agrário e político liderado por figuras como Francisco Madero, Emiliano Zapata e Pancho Villa. A década de conflito levou a uma reestruturação política radical e culminou na ratificação da progressiva Constituição de 1917." },
        
        "case-7-title": "México Moderno: Transição Democrática e Identidade Contemporânea", "case-7-cat": "México", "case-7-year": "2000–Presente",
        "case-7": { "data-title": "México Moderno: Transição Democrática e Identidade Contemporânea", "data-text": "Hoje, o México se destaca como uma república constitucional federal de mais de 129 milhões de pessoas, moldada por sua história de resiliência e adaptação. O ano 2000 marcou um marco democrático histórico quando a liderança da oposição encerrou 71 anos consecutivos de governo de partido único. A nação reflete uma fusão distinta de tradições indígenas mesoamericanas e herança colonial espanhola." },

        "fund-main-title": "Para compreender os aspectos fundamentais da cultura e sociedade mexicanas,<br/><em>considere as seguintes quatro perguntas:</em>",
        "fund-q1-title": "Como as antigas tradições mesoamericanas e as influências coloniais espanholas coexistem na vida diária?",
        "fund-q1-desc": "A sociedade mexicana é definida pelo mestizaje — uma rica síntese de herança indígena e costumes espanhóis vistos na arquitetura, língua, celebrações comunitárias e devoção religiosa.",
        "fund-q2-title": "Qual o papel da família (la familia) na formação da estrutura comunitária?",
        "fund-q2-desc": "A família atua como a unidade social primária no México, onde lares multigeracionais, profundo respeito pelos idosos e redes comunitárias unidas formam a espinha dorsal da vida diária.",
        "fund-q3-title": "Como a geografia influencia o regionalismo cultural em toda a nação?",
        "fund-q3-desc": "Paisagens distintas criaram diversas identidades regionais — desde as tradições vaqueiras do norte em planícies áridas até as ricas tradições indígenas e tecidos coloridos em estados do sul, como Oaxaca e Chiapas.",
        "fund-q4-title": "Por que os feriados nacionais e as reuniões públicas são centrais para a unidade social mexicana?",
        "fund-q4-desc": "Eventos como o Dia dos Mortos e o Dia da Independência reúnem as comunidades para honrar a memória, a herança compartilhada e o orgulho nacional por meio das artes públicas, música tradicional e comida.",
        
        "donations-title": "A Arquitetura Econômica do México",
        "donations-desc": "O México possui a segunda maior economia da América Latina e figura entre os principais centros de manufatura do mundo. Impulsionado por acordos comerciais internacionais, riqueza mineral e uma força de trabalho dinâmica, o México desempenha um papel crítico na cadeia de abastecimento global.",
        "don-irc-cat": "Quais são as principais fontes de renda nacional do México?",
        "don-irc-focus": "Resposta:",
        "don-irc-desc": "As principais fontes de renda do México incluem a manufatura industrial avançada (automotiva, eletrônica e aeroespacial), exportações de petróleo bruto, extração de prata e minerais, turismo internacional e exportações agrícolas (abacates, frutas vermelhas e tequila).",
        "don-pf-cat": "Qual é o salário mínimo diário atual no México?",
        "don-pf-focus": "Resposta:",
        "don-pf-desc": "De acordo com atualizações econômicas recentes, o salário mínimo diário geral do México é de aproximadamente 278,80 MXN (e mais alto na Zona Franca da Fronteira Norte, em cerca de 419,88 MXN, para corresponder às condições de custo regionais).",
        "don-uni-cat": "Como o custo de vida se compara a outras economias norte-americanas?",
        "don-uni-focus": "Resposta:",
        "don-uni-desc": "Embora grandes centros metropolitanos como Cidade do México, Guadalajara e Monterrey apresentem custos crescentes de moradia, os custos de vida essenciais (mantimentos, transporte público e serviços de saúde) permanecem significativamente mais baixos do que nos Estados Unidos ou Canadá.",
        
        "divider-text": "Embarque em uma jornada geográfica sob a superfície para descobrir como a energia tectônica, as majestosas cadeias de montanhas e os vulcões ativos esculpem continuamente a vibrante nação do México.",
        
        "action-title": "Explore os Processos Terrestres<br>do México",
        "action-1-title": "Mapas",
        "action-1-desc": "Examine rotas de comércio históricas, posições continentais, mudanças de fronteiras e cartógrafos famosos que mapearam a Nova Espanha e o México moderno.",
        "action-2-title": "Tectônica",
        "action-2-desc": "Descubra as fronteiras de placas ativas, monitoramento de riscos sísmicos, grandes sistemas montanhosos, riqueza mineral e vulcões icônicos como o Popocatépetl.",
        "action-3-title": "Erosão",
        "action-3-desc": "Descubra os processos de intemperismo físico e químico, a formação dos cenotes em Yucatán, as principais bacias hidrográficas e os desafios da desertificação.",
        "action-4-title": "Oceanos",
        "action-4-desc": "Analise as formações costeiras, rotas de comércio oceânicas, padrões de furacões, ilhas regionais e impactos econômicos marítimos.",
        "action-5-title": "Clima",
        "action-5-desc": "Investigue as classificações climáticas de Köppen em todo o México, os padrões globais de circulação do vento, biomas diversos e a flora e fauna nativas únicas.",

        "close-modal": "← Voltar para a Linha do Tempo",
        
        "tab-1-text": "Seu Nome", "tab-2-text": "Método de Contato", "tab-3-text": "Nota",
        "step-1-sub": "Passo 1", "step-1-title": "Seu Nome", "step-1-desc": "Por favor, insira seus dados para sabermos com quem estamos nos comunicando.",
        "lbl-fname": "Primeiro Nome<span class='required'>*</span>", "first-name": { placeholder: "Digite seu primeiro nome" }, "err-fname": "O nome é obrigatório.",
        "lbl-lname": "Sobrenome<span class='required'>*</span>", "last-name": { placeholder: "Digite seu sobrenome" }, "err-lname": "O sobrenome é obrigatório.",
        "lbl-nick": "Apelido / Como devemos chamá-lo <span class='optional'>(Opcional)</span>", "nickname": { placeholder: "Como você prefere que o chamemos?" },
        
        "step-2-sub": "Passo 2", "step-2-title": "Método de Contato", "step-2-desc": "Selecione como você prefere que nossa equipe entre em contato com você.",
        "pref-email": "Endereço de E-mail", "pref-phone": "Telefone / Celular",
        "lbl-contact-email": "Endereço de E-mail<span class='required'>*</span>", "contact-email": { placeholder: "exemplo@email.com" }, "err-email": "Por favor, insira um e-mail válido.",
        "lbl-contact-phone": "Número de Telefone<span class='required'>*</span>", "err-phone": "Por favor, insira um número de telefone válido.",

        "step-3-sub": "Passo 3", "step-3-title": "Nota", "step-3-desc": "Ajude-nos a categorizar sua solicitação e deixe seus comentários detalhados abaixo.",
        "lbl-category": "Selecione uma Categoria<span class='required'>*</span>",
        "cat-btn-1": "Fazer uma Sugestão", "cat-btn-2": "Preocupação", "cat-btn-3": "Manter Contato", "cat-btn-4": "Outro",
        "lbl-reason": "Motivo do Contato<span class='required'>*</span>", "contact-reason": { placeholder: "Escreva suas perguntas, preocupações ou comentários aqui..." }, "err-reason": "Por favor, escreva o motivo da sua mensagem.",
        
        "succ-title": "Formulário Enviado!", "succ-desc": "Sua solicitação foi processada com sucesso. Entraremos em contato muito em breve.",
        "prev-btn": "‹ Voltar", "next-btn": "Próximo Passo ›"
    },

    // Maps Page Translations
    en: {
        "nav-logo": "BIENVENIDO A MEXICO",
        "nav-fundamentals": "MAPS",
        "nav-stats": "TECTONICS",
        "nav-real-cases": "EROSION",
        "nav-about": "ABOUT",
        "nav-take-action": "OCEANS",
        "nav-donations": "CLIMATE",
        "nav-contact": "REFERENCES",

        "hero-title-part1": "<em>Charting Mexico: </em>",
        "hero-title-part2": "Ancient Trails and",
        "hero-title-part3": "Modern Maps",

        "geo-overview-title": "Geographic and Historical Location Overview",
        "geo-overview-p1": "<strong>Continental Position and Area:</strong> Mexico is situated on the North American continent, occupying the southern portion of the landmass and serving as a geographic bridge connecting North and Central America. It is bounded by the United States to the north, the Gulf of Mexico and the Caribbean Sea to the east, the Pacific Ocean to the west and south, and Guatemala and Belize to the southeast.",
        "geo-overview-p2": "<strong>Latitudinal Range:</strong> The country spans a latitudinal range from approximately 14°32' N at its southernmost border along the Suchiate River to 32°43' N at its northernmost boundary in Baja California.",
        "geo-overview-p3": "<strong>Historical Existence and Timeline:</strong> As an independent sovereign nation, Mexico has existed from 1821 to the present, building upon thousands of years of pre-Columbian indigenous civilizations and the 300-year colonial period of the Viceroyalty of New Spain (1521–1821). Today, it operates as a federal constitutional republic supporting over 129 million citizens.",

        "map1-badge-title": "The Foundation of Tenochtitlan (Codex Mendoza)",
        "map1-badge-sub": "1541–1542 (Depicting events from 1325)",
        "map1-label": "MAP 01",
        "map1-title": "Ancient Pre-Columbian Cartography",
        "map1-desc": "This indigenous pictorial document maps the foundational layout, canal systems, and territorial conquests of the Aztec capital of Tenochtitlan. It provides crucial insight into pre-Hispanic urban planning and spatial organization before European contact.",
        "map1-tag1": "Aztec Codex",
        "map1-tag2": "Tenochtitlan",
        "map1-tag3": "Urban Planning",

        "map2-badge-title": "Carta Geográfica de la República Mexicana (Pre-1848 Extent)",
        "map2-badge-sub": "1847",
        "map2-label": "MAP 02",
        "map2-title": "Historical Boundary Changes",
        "map2-desc": "This historical map illustrates Mexico's expansive mid-19th-century borders prior to the Mexican-American War and the Treaty of Guadalupe Hidalgo. It outlines the vast northern territories that historically encompassed modern-day California, Nevada, Utah, Arizona, New Mexico, and parts of Colorado and Wyoming.",
        "map2-tag1": "Boundary Changes",
        "map2-tag2": "Treaty of Guadalupe Hidalgo",
        "map2-tag3": "Northern Frontier",

        "map3-badge-title": "Camino Real",
        "map3-badge-sub": "16TH–19TH CENTURY",
        "map3-label": "MAP 03",
        "map3-title": "Colonial Trade & Maritime Routes",
        "map3-desc": "This archival route map highlights the interior royal roads (<em>Camino Real</em>) and critical transoceanic sea voyage routes established during the Spanish colonial era. It traces the historic flow of global commerce linking the Atlantic port of Veracruz to the Pacific port of Acapulco.",
        "map3-tag1": "Veracruz",
        "map3-tag2": "Acapulco",
        "map3-tag3": "Maritime Trade",

        "map4-badge-title": "Polyconic Projection",
        "map4-badge-sub": "31 STATES + CDMX",
        "map4-label": "MAP 04",
        "map4-title": "Modern Topographic & Political Map",
        "map4-desc": "Utilizing a standard conformal Polyconic projection, this modern map details Mexico's contemporary political boundaries across 31 states and Mexico City. It illustrates major elevation profiles, mountain ranges, and national transportation networks to serve as an accurate baseline for spatial analysis.",
        "map4-tag1": "Topography",
        "map4-tag2": "Polyconic Grid",
        "map4-tag3": "31 States",

        "cart-badge-title": "Antonio García Cubas",
        "cart-badge-sub": "1832–1912",
        "cart-label": "Prominent Influence",
        "cart-title": "Antonio García Cubas",
        "cart-bio": "Antonio García Cubas (1832–1912) was Mexico's preeminent 19th-century geographer, historian, and cartographer. Born in Mexico City, he overcame early childhood orphanhood to study geography at the Colegio de San Gregorio and the College of Engineers, graduating with honors as a professional geographer. He became a foundational member of the Mexican Society of Geography and Statistics and revolutionized Latin American mapmaking by introducing rigorous scientific surveying data and advanced chromolithography printing.",
        "cart-acc-title": "Biggest Cartographic Accomplishments:",
        "cart-acc-1": "<strong>Atlas Geográfico, Estadístico e Histórico de la República Mexicana (1858):</strong> A groundbreaking national atlas that merged detailed state maps with comprehensive statistical and historical data, establishing a unified cartographic identity for the young republic.",
        "cart-acc-2": "<strong>Carta General de la República Mexicana (1863):</strong> A comprehensive general map of the country that corrected widespread topographical inaccuracies found in earlier colonial and foreign maps.",
        "cart-acc-3": "<strong>Atlas Pintoresco e Histórico de los Estados Unidos Mexicanos (1885):</strong> An acclaimed chromolithographic masterwork featuring vibrant cultural, historical, and topographical maps that earned widespread acclaim from international geographical societies."
    },

    es: {
        "nav-logo": "BIENVENIDO A MEXICO",
        "nav-fundamentals": "MAPAS",
        "nav-stats": "TECTÓNICA",
        "nav-real-cases": "EROSIÓN",
        "nav-about": "ACERCA DE",
        "nav-take-action": "OCÉANOS",
        "nav-donations": "CLIMA",
        "nav-contact": "REFERENCIAS",

        "hero-title-part1": "<em>Mapeando México: </em>",
        "hero-title-part2": "Senderos Antiguos y",
        "hero-title-part3": "Mapas Modernos",

        "geo-overview-title": "Resumen de Ubicación Geográfica e Histórica",
        "geo-overview-p1": "<strong>Posición Continental y Área:</strong> México se encuentra situado en el continente norteamericano, ocupando la porción sur de la masa terrestre y sirviendo como puente geográfico entre América del Norte y América Central. Limita con los Estados Unidos al norte, el Golfo de México y el Mar Caribe al este, el Océano Pacífico al oeste y sur, y Guatemala y Belice al sureste.",
        "geo-overview-p2": "<strong>Rango Latitudinal:</strong> El país abarca un rango latitudinal desde aproximadamente 14°32' N en su frontera más meridional a lo largo del Río Suchiate hasta 32°43' N en su límite más septentrional en Baja California.",
        "geo-overview-p3": "<strong>Existencia Histórica y Cronología:</strong> Como nación soberana independiente, México ha existido desde 1821 hasta el presente, construyendo sobre miles de años de civilizaciones indígenas precolombinas y el período colonial de 300 años del Virreinato de la Nueva España (1521–1821). Hoy opera como una república constitucional federal que alberga a más de 129 millones de ciudadanos.",

        "map1-badge-title": "La Fundación de Tenochtitlan (Códice Mendoza)",
        "map1-badge-sub": "1541–1542 (Representando eventos de 1325)",
        "map1-label": "MAPA 01",
        "map1-title": "Cartografía Precolombina Antigua",
        "map1-desc": "Este documento pictórico indígena cartografía la distribución fundacional, los sistemas de canales y las conquistas territoriales de la capital azteca de Tenochtitlan. Proporciona información crucial sobre la planificación urbana prehispánica y la organización espacial antes del contacto europeo.",
        "map1-tag1": "Códice Azteca",
        "map1-tag2": "Tenochtitlan",
        "map1-tag3": "Planificación Urbana",

        "map2-badge-title": "Carta Geográfica de la República Mexicana (Extensión pre-1848)",
        "map2-badge-sub": "1847",
        "map2-label": "MAPA 02",
        "map2-title": "Cambios de Límites Históricos",
        "map2-desc": "Este mapa histórico ilustra las expansivas fronteras de México a mediados del siglo XIX antes de la Intervención Estadounidense y el Tratado de Guadalupe Hidalgo. Describe los vastos territorios del norte que históricamente abarcaban los actuales estados de California, Nevada, Utah, Arizona, Nuevo México y partes de Colorado y Wyoming.",
        "map2-tag1": "Cambios Fronterizos",
        "map2-tag2": "Tratado de Guadalupe Hidalgo",
        "map2-tag3": "Frontera Norte",

        "map3-badge-title": "Camino Real",
        "map3-badge-sub": "SIGLOS XVI–XIX",
        "map3-label": "MAPA 03",
        "map3-title": "Rutas Marítimas y Comerciales Coloniales",
        "map3-desc": "Este mapa de rutas de archivo destaca los caminos reales interiores (<em>Camino Real</em>) y las rutas de viajes marítimos transoceánicos fundamentales establecidas durante la época colonial española. Rastrea el flujo histórico del comercio global que unía el puerto atlántico de Veracruz con el puerto pacífico de Acapulco.",
        "map3-tag1": "Veracruz",
        "map3-tag2": "Acapulco",
        "map3-tag3": "Comercio Marítimo",

        "map4-badge-title": "Proyección Policónica",
        "map4-badge-sub": "31 ESTADOS + CDMX",
        "map4-label": "MAPA 04",
        "map4-title": "Mapa Topográfico y Político Moderno",
        "map4-desc": "Utilizando una proyección Policónica conforme estándar, este mapa moderno detalla los límites políticos contemporáneos de México a lo largo de 31 estados y la Ciudad de México. Ilustra los principales perfiles de elevación, cadenas montañosas y redes de transporte nacional para servir como base precisa en el análisis espacial.",
        "map4-tag1": "Topografía",
        "map4-tag2": "Red Policónica",
        "map4-tag3": "31 Estados",

        "cart-badge-title": "Antonio García Cubas",
        "cart-badge-sub": "1832–1912",
        "cart-label": "Influencia Prominente",
        "cart-title": "Antonio García Cubas",
        "cart-bio": "Antonio García Cubas (1832–1912) fue el geógrafo, historiador y cartógrafo más relevante del siglo XIX en México. Nacido en la Ciudad de México, superó la orfandad a temprana edad para estudiar geografía en el Colegio de San Gregorio y el Colegio de Minería, graduándose con honores como geógrafo profesional. Se convirtió en miembro fundador de la Sociedad Mexicana de Geografía y Estadística y revolucionó la cartografía latinoamericana al introducir datos topográficos científicos rigurosos e impresión cromolitográfica avanzada.",
        "cart-acc-title": "Mayores Logros Cartográficos:",
        "cart-acc-1": "<strong>Atlas Geográfico, Estadístico e Histórico de la República Mexicana (1858):</strong> Un atlas nacional innovador que fusionó mapas estatales detallados con datos estadísticos e históricos integrales, estableciendo una identidad cartográfica unificada para la joven república.",
        "cart-acc-2": "<strong>Carta General de la República Mexicana (1863):</strong> Un mapa general exhaustivo del país que corrigió imprecisiones topográficas generalizadas presentes en mapas coloniales y extranjeros anteriores.",
        "cart-acc-3": "<strong>Atlas Pintoresco e Histórico de los Estados Unidos Mexicanos (1885):</strong> Una aclamada obra maestra cromolitográfica con vibrantes mapas culturales, históricos y topográficos que obtuvo un reconocimiento generalizado por parte de sociedades geográficas internacionales."
    },

    fr: {
        "nav-logo": "BIENVENIDO A MEXICO",
        "nav-fundamentals": "CARTES",
        "nav-stats": "TECTONIQUE",
        "nav-real-cases": "ÉROSION",
        "nav-about": "À PROPOS",
        "nav-take-action": "OCÉANS",
        "nav-donations": "CLIMAT",
        "nav-contact": "RÉFÉRENCES",

        "hero-title-part1": "<em>Cartographier le Mexique : </em>",
        "hero-title-part2": "Sentiers Anciens et",
        "hero-title-part3": "Cartes Modernes",

        "geo-overview-title": "Aperçu de la Situation Géographique et Historique",
        "geo-overview-p1": "<strong>Position Continentale et Superficie :</strong> Le Mexique est situé sur le continent nord-américain, occupant la partie sud de la masse terrestre et servant de pont géographique reliant l'Amérique du Nord et l'Amérique centrale. Il est bordé par les États-Unis au nord, le golfe du Mexique et la mer des Caraïbes à l'est, l'océan Pacifique à l'ouest et au sud, ainsi que le Guatemala et le Belize au sud-est.",
        "geo-overview-p2": "<strong>Étendue Latitudinale :</strong> Le pays s'étend sur une plage latitudinale allant d'environ 14°32' N à sa frontière la plus méridionale le long du fleuve Suchiate jusqu'à 32°43' N à sa frontière la plus septentrionale en Basse-Californie.",
        "geo-overview-p3": "<strong>Existence Historique et Chronologie :</strong> En tant que nation souveraine indépendante, le Mexique existe de 1821 à nos jours, s'appuyant sur des milliers d'années de civilisations indigènes précolombiennes et sur la période coloniale de 300 ans de la vice-royauté de Nouvelle-Espagne (1521-1821). Aujourd'hui, il fonctionne comme une république constitutionnelle fédérale abritant plus de 129 millions de citoyens.",

        "map1-badge-title": "La Fondation de Tenochtitlan (Codex Mendoza)",
        "map1-badge-sub": "1541–1542 (Représentant des événements de 1325)",
        "map1-label": "CARTE 01",
        "map1-title": "Cartographie Ancienne Précolombienne",
        "map1-desc": "Ce document pictural indigène cartographie l'aménagement fondateur, les systèmes de canaux et les conquêtes territoriales de la capitale aztèque de Tenochtitlan. Il offre un aperçu essentiel de l'urbanisme et de l'organisation spatiale préhispaniques avant le contact européen.",
        "map1-tag1": "Codex Aztèque",
        "map1-tag2": "Tenochtitlan",
        "map1-tag3": "Urbanisme",

        "map2-badge-title": "Carta Geográfica de la República Mexicana (Extension pré-1848)",
        "map2-badge-sub": "1847",
        "map2-label": "CARTE 02",
        "map2-title": "Évolution des Frontières Historiques",
        "map2-desc": "Cette carte historique illustre les vastes frontières du Mexique au milieu du XIXe siècle avant la guerre américain-mexicaine et le traité de Guadalupe Hidalgo. Elle décrit les immenses territoires du nord qui englobaient historiquement la Californie, le Nevada, l'Utah, l'Arizona, le Nouveau-Mexique modernes ainsi que des parties du Colorado et du Wyoming.",
        "map2-tag1": "Évolution des Frontières",
        "map2-tag2": "Traité de Guadalupe Hidalgo",
        "map2-tag3": "Frontière du Nord",

        "map3-badge-title": "Camino Real",
        "map3-badge-sub": "XVIe–XIXe SIÈCLE",
        "map3-label": "CARTE 03",
        "map3-title": "Routes Commerciales et Maritimes Coloniales",
        "map3-desc": "Cette carte routière d'archives met en évidence les chemins royaux intérieurs (<em>Camino Real</em>) et les routes de voyages maritimes transocéaniques essentielles établies à l'époque coloniale espagnole. Elle retrace le flux historique du commerce mondial reliant le port atlantique de Veracruz au port pacifique d'Acapulco.",
        "map3-tag1": "Veracruz",
        "map3-tag2": "Acapulco",
        "map3-tag3": "Commerce Maritime",

        "map4-badge-title": "Projection Polyconique",
        "map4-badge-sub": "31 ÉTATS + CDMX",
        "map4-label": "CARTE 04",
        "map4-title": "Carte Topographique et Politique Moderne",
        "map4-desc": "Utilisant une projection polyconique conforme standard, cette carte moderne détaille les limites politiques contemporaines du Mexique à travers 31 États et la ville de Mexico. Elle illustre les principaux profils d'altitude, les chaînes de montagnes et les réseaux de transport nationaux afin de servir de base précise pour l'analyse spatiale.",
        "map4-tag1": "Topographie",
        "map4-tag2": "Grille Polyconique",
        "map4-tag3": "31 États",

        "cart-badge-title": "Antonio García Cubas",
        "cart-badge-sub": "1832–1912",
        "cart-label": "Influence Majeure",
        "cart-title": "Antonio García Cubas",
        "cart-bio": "Antonio García Cubas (1832–1912) était le géographe, historien et cartographe mexicain le plus éminent du XIXe siècle. Né à Mexico, il a surmonté son orphelinat précoce pour étudier la géographie au Colegio de San Gregorio et au Collège des Ingénieurs, obtenant son diplôme avec honneurs en tant que géographe professionnel. Il est devenu un membre fondateur de la Société mexicaine de géographie et de statistique et a révolutionné la cartographie sud-américaine en introduisant des données de levé scientifique rigoureuses et l'impression chromolithographique avancée.",
        "cart-acc-title": "Plus Grandes Réalisations Cartographiques :",
        "cart-acc-1": "<strong>Atlas Geográfico, Estadístico e Histórico de la República Mexicana (1858) :</strong> Un atlas national novateur qui combinait des cartes d'États détaillées avec des données statistiques et historiques complètes, établissant une identité cartographique unifiée pour la jeune république.",
        "cart-acc-2": "<strong>Carta General de la República Mexicana (1863) :</strong> Une carte générale complète du pays qui a corrigé les inexactitudes topographiques fréquentes dans les cartes coloniales et étrangères antérieures.",
        "cart-acc-3": "<strong>Atlas Pintoresco e Histórico de los Estados Unidos Mexicanos (1885) :</strong> Chef-d'œuvre chromolithographique salué proposant des cartes culturelles, historiques et topographiques vibrantes qui lui ont valu une reconnaissance internationale auprès des sociétés de géographie."
    },

    pt: {
        "nav-logo": "BIENVENIDO A MEXICO",
        "nav-fundamentals": "MAPAS",
        "nav-stats": "TECTÔNICA",
        "nav-real-cases": "EROSÃO",
        "nav-about": "SOBRE",
        "nav-take-action": "OCEANOS",
        "nav-donations": "CLIMA",
        "nav-contact": "REFERÊNCIAS",

        "hero-title-part1": "<em>Mapeando o México: </em>",
        "hero-title-part2": "Trilhas Antigas e",
        "hero-title-part3": "Mapas Modernos",

        "geo-overview-title": "Visão Geral da Localização Geográfica e Histórica",
        "geo-overview-p1": "<strong>Posição Continental e Área:</strong> O México está situado no continente norte-americano, ocupando a porção sul da massa terrestre e servindo como uma ponte geográfica que conecta a América do Norte e a América Central. É limitado pelos Estados Unidos ao norte, pelo Golfo do México e pelo Mar do Caribe a leste, pelo Oceano Pacífico a oeste e ao sul, e pela Guatemala e Belize ao sudeste.",
        "geo-overview-p2": "<strong>Alcance Latitudinal:</strong> O país abrange uma faixa latitudinal que vai de aproximadamente 14°32' N em sua fronteira mais ao sul ao longo do Rio Suchiate até 32°43' N em seu limite mais ao norte na Baixa Califórnia.",
        "geo-overview-p3": "<strong>Existência Histórica e Cronologia:</strong> Como uma nação soberana independente, o México existe de 1821 até o presente, desenvolvendo-se sobre milhares de anos de civilizações indígenas pré-colombianas e o período colonial de 300 anos do Vice-Reino da Nova Espanha (1521–1821). Hoje, opera como uma república constitucional federal com mais de 129 milhões de cidadãos.",

        "map1-badge-title": "A Fundação de Tenochtitlan (Códice Mendoza)",
        "map1-badge-sub": "1541–1542 (Retratando eventos de 1325)",
        "map1-label": "MAPA 01",
        "map1-title": "Cartografia Antiga Pré-Colombiana",
        "map1-desc": "Este documento pictórico indígena mapeia o layout fundador, os sistemas de canais e as conquistas territoriais da capital asteca de Tenochtitlan. Ele fornece informações cruciais sobre o planejamento urbano pré-hispânico e a organização espacial antes do contato europeu.",
        "map1-tag1": "Códice Asteca",
        "map1-tag2": "Tenochtitlan",
        "map1-tag3": "Planejamento Urbano",

        "map2-badge-title": "Carta Geográfica de la República Mexicana (Extensão pré-1848)",
        "map2-badge-sub": "1847",
        "map2-label": "MAPA 02",
        "map2-title": "Mudanças nas Fronteiras Históricas",
        "map2-desc": "Este mapa histórico ilustra as expansivas fronteiras do México em meados do século XIX, antes da Guerra Mexicano-Americana e do Tratado de Guadalupe Hidalgo. Ele descreve os vastos territórios do norte que historicamente abrangiam os atuais estados de Califórnia, Nevada, Utah, Arizona, Novo México e partes do Colorado e Wyoming.",
        "map2-tag1": "Mudanças de Fronteira",
        "map2-tag2": "Tratado de Guadalupe Hidalgo",
        "map2-tag3": "Fronteira Norte",

        "map3-badge-title": "Camino Real",
        "map3-badge-sub": "SÉCULOS XVI–XIX",
        "map3-label": "MAPA 03",
        "map3-title": "Rotas Comerciais e Marítimas Coloniais",
        "map3-desc": "Este mapa de rotas de arquivo destaca as estradas reais interiores (<em>Camino Real</em>) e as rotas de viagens marítimas transoceânicas essenciais estabelecidas durante a era colonial espanhola. Ele traça o fluxo histórico do comércio global ligando o porto atlântico de Veracruz ao porto pacífico de Acapulco.",
        "map3-tag1": "Veracruz",
        "map3-tag2": "Acapulco",
        "map3-tag3": "Comércio Marítimo",

        "map4-badge-title": "Projeção Policônica",
        "map4-badge-sub": "31 ESTADOS + CDMX",
        "map4-label": "MAPA 04",
        "map4-title": "Mapa Topográfico e Político Moderno",
        "map4-desc": "Utilizando uma projeção Policônica conforme padrão, este mapa moderno detalha as fronteiras políticas contemporâneas do México em 31 estados e na Cidade do México. Ele ilustra os principais perfis de elevação, cadeias de montanhas e redes de transporte nacional para servir como uma base precisa para análise espacial.",
        "map4-tag1": "Topografia",
        "map4-tag2": "Grade Policônica",
        "map4-tag3": "31 Estados",

        "cart-badge-title": "Antonio García Cubas",
        "cart-badge-sub": "1832–1912",
        "cart-label": "Influência Proeminente",
        "cart-title": "Antonio García Cubas",
        "cart-bio": "Antonio García Cubas (1832–1912) foi o geógrafo, historiador e cartógrafo mais proeminente do México no século XIX. Nascido na Cidade do México, ele superou a orfandade precoce para estudar geografia no Colegio de San Gregorio e na Escola de Engenheiros, graduando-se com honras como geógrafo profissional. Tornou-se membro fundador da Sociedade Mexicana de Geografia e Estatística e revolucionou a cartografia latino-americana ao introduzir dados rigorosos de levantamento científico e impressão cromolitográfica avançada.",
        "cart-acc-title": "Maiores Realizações Cartográficas:",
        "cart-acc-1": "<strong>Atlas Geográfico, Estadístico e Histórico de la República Mexicana (1858):</strong> Um atlas nacional inovador que fundiu mapas estaduais detalhados com dados estatísticos e históricos abrangentes, estabelecendo uma identidade cartográfica unificada para a jovem república.",
        "cart-acc-2": "<strong>Carta General de la República Mexicana (1863):</strong> Um mapa geral abrangente do país que corrigiu imprecisões topográficas amplamente difundidas encontradas em mapas coloniais e estrangeiros anteriores.",
        "cart-acc-3": "<strong>Atlas Pintoresco e Histórico de los Estados Unidos Mexicanos (1885):</strong> Uma aclamada obra-prima cromolitográfica apresentando mapas culturais, históricos e topográficos vibrantes que conquistaram amplo reconhecimento de sociedades geográficas internacionais."
    }
};
