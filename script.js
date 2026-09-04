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
    gsap.registerPlugin(ScrollTrigger);

    const heroTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-scroll-section",
            start: "top top",      
            end: "+=150%",         
            scrub: 1,              
            pin: true,             
        }
    });

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
});


document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const path = document.querySelector('#scroll-line');
    
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
});

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const statsContent = document.querySelector('.stats-content');

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
});

// ==========================================================================
// MOTOR DINÁMICO DE SCROLL Y PINNING / Filosofia - Main Page
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const spacers = document.querySelectorAll('.pin-spacer');
    const track = document.querySelector('.vo-stack-track');

    if (spacers.length === 0 || !track) return;

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

// ==============================================
// Language Switcher
// ==============================================
const translations = {
    en: {
        "nav-fundamentals": "FUNDAMENTALS",
        "nav-stats": "STATS",
        "nav-real-cases": "REAL CASES",
        "nav-take-action": "TAKE ACTION",
        "nav-donations": "TRUSTED FOUNDATIONS",
        "nav-contact": "SUGGESTIONS",
        
        "hero-title-1": "Understanding the Crisis,<br>Inspiring Action",
        "hero-title-2": "What is our<br>Goal?",
        "hero-desc": "To make a difference in the world, we must first understand the challenges faced by those in need. This page aims to shed light on the key issues affecting vulnerable communities and encourage meaningful action.",
        
        "fund-main-title": "In order to grasp the fundamental aspects of this issue, <br/><em>consider the following four questions:</em>",
        "fund-q1-title": "What are the primary challenges faced by these communities?",
        "fund-q1-desc": "The primary challenge is survival within a conflict zone—a geographical area experiencing ongoing violence, armed conflict, civil unrest, or severe political instability. Within these zones, populations face severe human rights violations...",
        "fund-q2-title": "Why are these challenges significant at a global level?",
        "fund-q2-desc": "Conflict does not stay contained. When law and order break down, it creates conditions for systemic abuse that ripple across borders. By 2025, an estimated 117.8 million people have been displaced globally...",
        "fund-q3-title": "Who is most affected by these challenges?",
        "fund-q3-desc": "Civilians bear the heaviest burden. Children are left unable to attend school and are uniquely vulnerable during conflicts. Women, minority groups, and the elderly are disproportionately affected by the denial of basic needs...",
        "fund-q4-title": "What are some possible solutions to address these issues?",
        "fund-q4-desc": "Solutions require a multi-tiered approach: immediate humanitarian aid (food, water, medical care), international pressure to uphold human rights laws, establishing safe havens for civilians, and Unarmed Civilian Protection (UCP) strategies...",
        
        "divider-text": "RECOGNIZING THE PATTERN IS THE FIRST STEP TOWARD CHANGE.<br>SO TAKE THAT FIRST STEP.",
        
        "stats-title": "The Global Toll<br>of Conflict",
        "stat-1-label": "FORCIBLY DISPLACED",
        "stat-1-num": "120+ Million",
        "stat-2-label": "CHILDREN IN CONFLICT ZONES",
        "stat-2-num": "468 Million",
        "stat-2-sub": "YEARS",
        "stat-3-label": "REQUIRING HUMANITARIAN AID",
        "stat-3-num": "300+ Million",
        
        "cases-subheading": "The Reality on the Ground",
        "cases-desc": "Behind every staggering statistic is a human life affected by violence. To grasp the impact of global conflicts, we must hear from those who experienced them. These ten case studies highlight communities facing adversity, showcasing that even in darkness, courage, solidarity, and hope endure.",
        
        "case-1-title": 'The "Train of Death" Migration Crisis', "case-1-cat": "Mexico", "case-1-year": "1995–Present",
        "case-1": { "data-title": 'The "Train of Death" Migration Crisis', "data-text": "Migrants from Central America ride dangerous freight trains north, facing starvation, extortion, and extreme violence along the journey. In response, a group of women known as Las Patronas prepare and throw bags of food and water to the moving trains..." },
        
        "case-2-title": "The Rise of Unarmed Civilian Protection", "case-2-cat": "Global", "case-2-year": "2002-Present",
        "case-2": { "data-title": "The Rise of Unarmed Civilian Protection", "data-text": "Civilians caught in the crossfire of armed conflicts frequently lack physical protection from traditional security forces or armed peacekeepers. To address this, trained civilians enter conflict zones unarmed..." },

        "case-3-title": "The Cherán Indigenous Uprising", "case-3-cat": "Mexico", "case-3-year": "2011",
        "case-3": { "data-title": "The Cherán Indigenous Uprising", "data-text": "Indigenous communities in Cherán faced rampant illegal logging, extortion, and violence from cartels while local authorities turned a blind eye. Refusing to settle for government corruption, the women and community members blockaded the loggers..." },
        
        "case-4-title": "The Syrian Civil War and Refugee Crisis", "case-4-cat": "Syria", "case-4-year": "2011–Present",
        "case-4": { "data-title": "The Syrian Civil War and Refugee Crisis", "data-text": "Over a decade of severe conflict in Syria has resulted in massive displacement, with almost half of Syrian refugee children displaying symptoms of posttraumatic stress disorder (PTSD)..." },
        
        "case-5-title": "Civil War and the Protection of Civilians (POC) Sites", "case-5-cat": "South Sudan", "case-5-year": "2013–Present",
        "case-5": { "data-title": "Civil War and the Protection of Civilians (POC) Sites", "data-text": "A brutal civil war in South Sudan led to widespread ethnic violence, forcing hundreds of thousands of civilians to flee their burning villages. To protect those most at risk, the UN opened its peacekeeping bases to fleeing civilians..." },
        
        "case-6-title": "The Military Coup and Civilian Resistance", "case-6-cat": "Myanmar", "case-6-year": "2021–Present",
        "case-6": { "data-title": "The Military Coup and Civilian Resistance", "data-text": "Following a military coup on February 1, 2021, civilians in Myanmar faced arbitrary arrests, excessive force, and targeted attacks by security forces on communities, including raids on hospitals and medical professionals..." },
        
        "case-7-title": "The Fall of Kabul and Erasure of Women's Rights", "case-7-cat": "Afghanistan", "case-7-year": "2021–Present",
        "case-7": { "data-title": "The Fall of Kabul and Erasure of Women's Rights", "data-text": "The return of the Taliban to power in Afghanistan has led to the systematic stripping of fundamental human rights, particularly barring women and girls from secondary and higher education..." },

        "case-8-title": "The Full-Scale Invasion and Infrastructure Crisis", "case-8-cat": "Ukraine", "case-8-year": "2022–Present",
        "case-8": { "data-title": "The Full-Scale Invasion and Infrastructure Crisis", "data-text": "Massive destruction of civilian infrastructure across Ukraine has resulted in targeted strikes on hospitals, power grids, and schools. With millions of children having their education disrupted by the conflict..." },
        
        "case-9-title": "The Armed Conflict and Displacement Crisis", "case-9-cat": "Sudan", "case-9-year": "2023–Present",
        "case-9": { "data-title": "The Armed Conflict and Displacement Crisis", "data-text": "A violent power struggle starting in April 2023 triggered one of the fastest-growing displacement crises in the world, accompanied by severe humanitarian access restrictions and fighting between armed forces..." },
        
        "case-10-title": "The Humanitarian and Healthcare Crisis", "case-10-cat": "Gaza", "case-10-year": "2023–Present",
        "case-10": { "data-title": "The Humanitarian and Healthcare Crisis", "data-text": "The Gaza Strip is facing critical shortages of food, clean water, and functioning healthcare facilities amidst intense and ongoing bombardment, resulting in a staggering number of child casualties..." },

        "close-modal": "&larr; Back",
        "modal-link": "Visit site &#8599;",
        
        "action-title": "Take Meaningful<br>Actions",
        "action-1-title": "Amplify Frontline Voices",
        "action-1-desc": "Share these documented stories and raise awareness about grassroots civilian protection. Keeping global attention on active conflict zones helps protect local advocates and drives international accountability.",
        "action-2-title": "Engage with Local Networks",
        "action-2-desc": "Connect with community-led peacebuilding organizations and nonviolent response teams. Offer your time, skills, or platform to back the grassroots networks fighting for human rights on the ground.",
        "action-3-title": "Fund Direct Relief",
        "action-3-desc": "Your donations directly support trusted foundations delivering emergency healthcare, food aid, and nonviolent civilian protection to vulnerable families trapped in extreme conflict.",
        
        "donations-label": "Donations",
        "donations-title": "Trusted Foundations for Direct Support",
        "donations-desc": "Every contribution directly empowers grassroots movements, emergency responders, and human rights advocates operating on the frontlines of global crises. By supporting trusted foundations, your generosity provides immediate food aid, emergency healthcare, and nonviolent civilian protection where it is needed most. Together, we can restore dignity, foster long-term community resilience, and build a safer future for vulnerable lives facing extreme adversity.",
        "don-irc-cat": "International Rescue Committee (IRC)", "don-irc-focus": "Focus:", "don-irc-desc": "Responds to the world's worst humanitarian crises, helping to restore health, safety, education, economic wellbeing, and power to people devastated by conflict and disaster.",
        "don-pf-cat": "Peaceforce", "don-pf-focus": "Focus:", "don-pf-desc": "Protects civilians in violent conflicts through unarmed strategies, builds peace side-by-side with local communities, and advocates for the wider adoption of these nonviolent approaches.",
        "don-uni-cat": "UNICEF (United Nations Children's Fund)", "don-uni-focus": "Focus:", "don-uni-desc": "Works in the world's toughest places to reach the most disadvantaged children and adolescents, protecting their rights to survive, thrive, and fulfill their potential.",

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
        "nav-fundamentals": "FUNDAMENTOS",
        "nav-stats": "ESTADÍSTICAS",
        "nav-real-cases": "CASOS REALES",
        "nav-take-action": "ACTUAR",
        "nav-donations": "FUNDACIONES CONFIABLES",
        "nav-contact": "SUGERENCIAS",
        
        "hero-title-1": "Comprender la Crisis,<br>Inspirar Acción",
        "hero-title-2": "¿Cuál es nuestro<br>Objetivo?",
        "hero-desc": "Para marcar la diferencia en el mundo, primero debemos comprender los desafíos que enfrentan los necesitados. Esta página busca arrojar luz sobre los problemas clave que afectan a las comunidades vulnerables y fomentar una acción significativa.",
        
        "fund-main-title": "Para comprender los aspectos fundamentales de este problema, <br/><em>considere las siguientes cuatro preguntas:</em>",
        "fund-q1-title": "¿Cuáles son los principales desafíos que enfrentan estas comunidades?",
        "fund-q1-desc": "El principal desafío es la supervivencia dentro de una zona de conflicto: un área geográfica que experimenta violencia continua, conflictos armados, disturbios civiles o inestabilidad política severa. Dentro de estas zonas, las poblaciones enfrentan graves violaciones a los derechos humanos...",
        "fund-q2-title": "¿Por qué estos desafíos son significativos a nivel global?",
        "fund-q2-desc": "El conflicto no se mantiene contenido. Cuando se rompen la ley y el orden, se crean condiciones para abusos sistémicos que cruzan fronteras. Para 2025, se estima que 117.8 millones de personas han sido desplazadas a nivel mundial...",
        "fund-q3-title": "¿Quiénes son los más afectados por estos desafíos?",
        "fund-q3-desc": "Los civiles llevan la carga más pesada. Los niños no pueden asistir a la escuela y son especialmente vulnerables. Las mujeres, los grupos minoritarios y los ancianos se ven desproporcionadamente afectados por la negación de necesidades básicas...",
        "fund-q4-title": "¿Cuáles son algunas posibles soluciones para abordar estos problemas?",
        "fund-q4-desc": "Las soluciones requieren un enfoque de múltiples niveles: ayuda humanitaria inmediata (alimentos, agua, atención médica), presión internacional para defender las leyes de derechos humanos, establecer refugios seguros para civiles y estrategias de Protección Civil No Armada (UCP)...",
        
        "divider-text": "RECONOCER EL PATRÓN ES EL PRIMER PASO HACIA EL CAMBIO.<br>ASÍ QUE DA ESE PRIMER PASO.",
        
        "stats-title": "El Costo Global<br>del Conflicto",
        "stat-1-label": "DESPLAZADOS POR LA FUERZA", 
        "stat-1-num": "120+ Millones",
        "stat-2-label": "NIÑOS EN ZONAS DE CONFLICTO",
        "stat-2-num": "468 Millones",
        "stat-2-sub": "AÑOS",
        "stat-3-label": "NECESITAN AYUDA HUMANITARIA",
        "stat-3-num": "300+ Millones",
        
        "cases-subheading": "La Realidad en el Terreno",
        "cases-desc": "Detrás de cada estadística asombrosa hay una vida humana afectada por la violencia. Para comprender el impacto de los conflictos globales, debemos escuchar a quienes los experimentaron. Estos diez estudios de caso destacan comunidades que enfrentan la adversidad...",
        
        "case-1-title": 'La Crisis Migratoria del "Tren de la Muerte"', "case-1-cat": "México", "case-1-year": "1995–Presente",
        "case-1": { "data-title": 'La Crisis Migratoria del "Tren de la Muerte"', "data-text": "Migrantes de Centroamérica viajan en peligrosos trenes de carga hacia el norte, enfrentando hambruna, extorsión y violencia extrema a lo largo del viaje. En respuesta, un grupo de mujeres conocidas como Las Patronas preparan y arrojan bolsas de comida y agua a los trenes en movimiento..." },
        
        "case-2-title": "El Auge de la Protección Civil No Armada", "case-2-cat": "Global", "case-2-year": "2002-Presente",
        "case-2": { "data-title": "El Auge de la Protección Civil No Armada", "data-text": "Los civiles atrapados en el fuego cruzado de los conflictos armados con frecuencia carecen de protección física de las fuerzas de seguridad tradicionales o fuerzas de paz armadas. Para abordar esto, civiles entrenados ingresan a zonas de conflicto desarmados..." },

        "case-3-title": "El Levantamiento Indígena de Cherán", "case-3-cat": "México", "case-3-year": "2011",
        "case-3": { "data-title": "El Levantamiento Indígena de Cherán", "data-text": "Las comunidades indígenas en Cherán enfrentaron la tala ilegal desenfrenada, extorsión y violencia de los cárteles mientras las autoridades locales hacían la vista gorda. Negándose a conformarse con la corrupción gubernamental, las mujeres y los miembros de la comunidad bloquearon a los madereros..." },
        
        "case-4-title": "La Guerra Civil Siria y la Crisis de Refugiados", "case-4-cat": "Siria", "case-4-year": "2011–Presente",
        "case-4": { "data-title": "La Guerra Civil Siria y la Crisis de Refugiados", "data-text": "Más de una década de conflicto severo en Siria ha resultado en un desplazamiento masivo, con casi la mitad de los niños refugiados sirios mostrando síntomas de trastorno de estrés postraumático (TEPT)..." },
        
        "case-5-title": "Guerra Civil y los Sitios de Protección de Civiles (POC)", "case-5-cat": "Sudán del Sur", "case-5-year": "2013–Presente",
        "case-5": { "data-title": "Guerra Civil y los Sitios de Protección de Civiles (POC)", "data-text": "Una brutal guerra civil en Sudán del Sur provocó violencia étnica generalizada, obligando a cientos de miles de civiles a huir de sus aldeas en llamas. Para proteger a los que están en mayor riesgo, la ONU abrió sus bases de mantenimiento de paz..." },
        
        "case-6-title": "El Golpe Militar y la Resistencia Civil", "case-6-cat": "Myanmar", "case-6-year": "2021–Presente",
        "case-6": { "data-title": "El Golpe Militar y la Resistencia Civil", "data-text": "Tras un golpe militar el 1 de febrero de 2021, los civiles en Myanmar enfrentaron arrestos arbitrarios, fuerza excesiva y ataques selectivos de las fuerzas de seguridad contra comunidades, incluidas redadas en hospitales y profesionales médicos..." },
        
        "case-7-title": "La Caída de Kabul y la Eliminación de los Derechos de las Mujeres", "case-7-cat": "Afganistán", "case-7-year": "2021–Presente",
        "case-7": { "data-title": "La Caída de Kabul y la Eliminación de los Derechos de las Mujeres", "data-text": "El regreso de los talibanes al poder en Afganistán ha llevado a la eliminación sistemática de los derechos humanos fundamentales, en particular prohibiendo a mujeres y niñas la educación secundaria y superior..." },

        "case-8-title": "La Invasión a Gran Escala y la Crisis de Infraestructura", "case-8-cat": "Ucrania", "case-8-year": "2022–Presente",
        "case-8": { "data-title": "La Invasión a Gran Escala y la Crisis de Infraestructura", "data-text": "La destrucción masiva de la infraestructura civil en toda Ucrania ha resultado en ataques dirigidos contra hospitales, redes eléctricas y escuelas. Con millones de niños sufriendo la interrupción de su educación por el conflicto..." },
        
        "case-9-title": "El Conflicto Armado y la Crisis de Desplazamiento", "case-9-cat": "Sudán", "case-9-year": "2023–Presente",
        "case-9": { "data-title": "El Conflicto Armado y la Crisis de Desplazamiento", "data-text": "Una violenta lucha por el poder que comenzó en abril de 2023 provocó una de las crisis de desplazamiento de más rápido crecimiento en el mundo, acompañada de severas restricciones de acceso humanitario y combates entre fuerzas armadas..." },
        
        "case-10-title": "La Crisis Humanitaria y de Atención Médica", "case-10-cat": "Gaza", "case-10-year": "2023–Presente",
        "case-10": { "data-title": "La Crisis Humanitaria y de Atención Médica", "data-text": "La Franja de Gaza se enfrenta a una escasez crítica de alimentos, agua potable e instalaciones sanitarias en funcionamiento en medio de intensos y continuos bombardeos, lo que resulta en un asombroso número de víctimas infantiles..." },

        "close-modal": "&larr; Volver",
        "modal-link": "Visitar sitio &#8599;",
        
        "action-title": "Toma Acciones<br>Significativas",
        "action-1-title": "Amplifica las Voces del Frente",
        "action-1-desc": "Comparte estas historias documentadas y crea conciencia sobre la protección civil comunitaria. Mantener la atención global sobre las zonas de conflicto activas ayuda a proteger a los defensores locales y promueve la responsabilidad internacional.",
        "action-2-title": "Involúcrate con Redes Locales",
        "action-2-desc": "Conéctate con organizaciones locales de consolidación de la paz y equipos de respuesta no violenta. Ofrece tu tiempo, habilidades o plataforma para respaldar a las redes comunitarias que luchan por los derechos humanos sobre el terreno.",
        "action-3-title": "Financia el Alivio Directo",
        "action-3-desc": "Tus donaciones apoyan directamente a fundaciones confiables que brindan atención médica de emergencia, ayuda alimentaria y protección civil no violenta a familias vulnerables atrapadas en conflictos extremos.",
        
        "donations-label": "Donaciones",
        "donations-title": "Fundaciones Confiables para Apoyo Directo",
        "donations-desc": "Cada contribución fortalece directamente a los movimientos de base, a los equipos de respuesta ante emergencias y a los defensores de los derechos humanos que operan en la primera línea de las crisis globales. Al apoyar a fundaciones de confianza, tu generosidad proporciona ayuda alimentaria inmediata, atención médica de emergencia y protección civil no violenta donde más se necesita. Juntos, podemos restaurar la dignidad, fomentar la resiliencia comunitaria a largo plazo y construir un futuro más seguro para las personas vulnerables que se enfrentan a una extrema adversidad.",
        "don-irc-cat": "Comité Internacional de Rescate (IRC)", "don-irc-focus": "Enfoque:", "don-irc-desc": "Responde a las peores crisis humanitarias del mundo, ayudando a restaurar la salud, la seguridad, la educación, el bienestar económico y el poder de las personas devastadas por conflictos y desastres.",
        "don-pf-cat": "Peaceforce", "don-pf-focus": "Enfoque:", "don-pf-desc": "Protege a los civiles en conflictos violentos mediante estrategias desarmadas, construye la paz codo a codo con las comunidades locales y aboga por una adopción más amplia de estos enfoques no violentos.",
        "don-uni-cat": "UNICEF (Fondo de las Naciones Unidas para la Infancia)", "don-uni-focus": "Enfoque:", "don-uni-desc": "Trabaja en los lugares más difíciles del mundo para llegar a los niños y adolescentes más desfavorecidos, protegiendo sus derechos a sobrevivir, prosperar y alcanzar su potencial.",

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
        "nav-fundamentals": "FONDAMENTAUX",
        "nav-stats": "STATISTIQUES",
        "nav-real-cases": "CAS RÉELS",
        "nav-take-action": "AGIR",
        "nav-donations": "FONDATIONS DE CONFIANCE",
        "nav-contact": "SUGGESTIONS",
        
        "hero-title-1": "Comprendre la Crise,<br>Inspirer l'Action",
        "hero-title-2": "Quel est notre<br>Objectif ?",
        "hero-desc": "Pour faire une différence dans le monde, nous devons d'abord comprendre les défis auxquels sont confrontées les personnes dans le besoin. Cette page vise à mettre en lumière les principaux problèmes affectant les communautés vulnérables et à encourager une action significative.",
        
        "fund-main-title": "Afin de saisir les aspects fondamentaux de ce problème, <br/><em>considérez les quatre questions suivantes :</em>",
        "fund-q1-title": "Quels sont les principaux défis rencontrés par ces communautés ?",
        "fund-q1-desc": "Le principal défi est la survie au sein d'une zone de conflit : une zone géographique connaissant des violences continues, des conflits armés, des troubles civils ou une grave instabilité politique. Dans ces zones, les populations font face à de graves violations des droits de l'homme...",
        "fund-q2-title": "Pourquoi ces défis sont-ils significatifs au niveau mondial ?",
        "fund-q2-desc": "Les conflits ne restent pas circonscrits. Lorsque l'ordre public s'effondre, il crée les conditions d'abus systémiques qui se répercutent au-delà des frontières. D'ici 2025, on estime à 117,8 millions le nombre de personnes déplacées dans le monde...",
        "fund-q3-title": "Qui est le plus touché par ces défis ?",
        "fund-q3-desc": "Les civils portent le fardeau le plus lourd. Les enfants ne peuvent plus aller à l'école et sont particulièrement vulnérables. Les femmes, les groupes minoritaires et les personnes âgées sont touchés de manière disproportionnée par le refus des besoins fondamentaux...",
        "fund-q4-title": "Quelles sont les solutions possibles pour résoudre ces problèmes ?",
        "fund-q4-desc": "Les solutions nécessitent une approche à plusieurs niveaux : aide humanitaire immédiate (nourriture, eau, soins médicaux), pression internationale pour faire respecter les lois sur les droits de l'homme, établissement de refuges pour les civils, et stratégies de Protection Civile Non Armée (UCP)...",
        
        "divider-text": "RECONNAÎTRE LE SCHÉMA EST LA PREMIÈRE ÉTAPE VERS LE CHANGEMENT.<br>ALORS FAITES CE PREMIER PAS.",
        
        "stats-title": "Le Bilan Mondial<br>des Conflits",
        "stat-1-label": "DÉPLACÉS DE FORCE", 
        "stat-1-num": "120+ Millions",
        "stat-2-label": "ENFANTS EN ZONES DE CONFLIT",
        "stat-2-num": "468 Millions",
        "stat-2-sub": "ANS",
        "stat-3-label": "EN BESOIN D'AIDE HUMANITAIRE",
        "stat-3-num": "300+ Millions",
        
        "cases-subheading": "La Réalité sur le Terrain",
        "cases-desc": "Derrière chaque statistique vertigineuse se cache une vie humaine touchée par la violence. Pour saisir l'impact des conflits mondiaux, nous devons écouter ceux qui les ont vécus. Ces dix études de cas mettent en lumière des communautés confrontées à l'adversité...",
        
        "case-1-title": 'La Crise Migratoire du "Train de la Mort"', "case-1-cat": "Mexique", "case-1-year": "1995–Présent",
        "case-1": { "data-title": 'La Crise Migratoire du "Train de la Mort"', "data-text": "Les migrants d'Amérique centrale voyagent à bord de dangereux trains de marchandises vers le nord, affrontant la famine, l'extorsion et la violence extrême tout au long du voyage. En réponse, un groupe de femmes connues sous le nom de Las Patronas préparent et jettent des sacs de nourriture et d'eau aux trains en marche..." },
        
        "case-2-title": "L'essor de la Protection Civile Non Armée", "case-2-cat": "Mondial", "case-2-year": "2002-Présent",
        "case-2": { "data-title": "L'essor de la Protection Civile Non Armée", "data-text": "Les civils pris entre deux feux dans les conflits armés manquent souvent de protection physique de la part des forces de sécurité traditionnelles ou des casques bleus armés. Pour remédier à cela, des civils formés entrent dans les zones de conflit sans armes..." },

        "case-3-title": "Le Soulèvement Indigène de Cherán", "case-3-cat": "Mexique", "case-3-year": "2011",
        "case-3": { "data-title": "Le Soulèvement Indigène de Cherán", "data-text": "Les communautés indigènes de Cherán ont fait face à une exploitation forestière illégale endémique, à l'extorsion et à la violence des cartels tandis que les autorités locales fermaient les yeux. Refusant de se contenter de la corruption gouvernementale, les femmes et les membres de la communauté ont bloqué les bûcherons..." },
        
        "case-4-title": "La Guerre Civile Syrienne et la Crise des Réfugiés", "case-4-cat": "Syrie", "case-4-year": "2011–Présent",
        "case-4": { "data-title": "La Guerre Civile Syrienne et la Crise des Réfugiés", "data-text": "Plus d'une décennie de conflit sévère en Syrie a entraîné un déplacement massif, avec près de la moitié des enfants réfugiés syriens présentant des symptômes de trouble de stress post-traumatique (TSPT)..." },
        
        "case-5-title": "Guerre Civile et Sites de Protection des Civils (POC)", "case-5-cat": "Soudan du Sud", "case-5-year": "2013–Présent",
        "case-5": { "data-title": "Guerre Civile et Sites de Protection des Civils (POC)", "data-text": "Une guerre civile brutale au Soudan du Sud a entraîné des violences ethniques généralisées, forçant des centaines de milliers de civils à fuir leurs villages en flammes. Pour protéger les personnes les plus à risque, l'ONU a ouvert ses bases de maintien de la paix..." },
        
        "case-6-title": "Le Coup d'État Militaire et la Résistance Civile", "case-6-cat": "Myanmar", "case-6-year": "2021–Présent",
        "case-6": { "data-title": "Le Coup d'État Militaire et la Résistance Civile", "data-text": "Suite à un coup d'État militaire le 1er février 2021, les civils au Myanmar ont fait face à des arrestations arbitraires, à un usage excessif de la force et à des attaques ciblées des forces de sécurité contre les communautés, y compris des raids sur les hôpitaux..." },
        
        "case-7-title": "La Chute de Kaboul et l'Effacement des Droits des Femmes", "case-7-cat": "Afghanistan", "case-7-year": "2021–Présent",
        "case-7": { "data-title": "La Chute de Kaboul et l'Effacement des Droits des Femmes", "data-text": "Le retour des talibans au pouvoir en Afghanistan a conduit à la suppression systématique des droits de l'homme fondamentaux, interdisant notamment aux femmes et aux filles l'enseignement secondaire et supérieur..." },

        "case-8-title": "L'Invasion à Grande Échelle et la Crise des Infrastructures", "case-8-cat": "Ukraine", "case-8-year": "2022–Présent",
        "case-8": { "data-title": "L'Invasion à Grande Échelle et la Crise des Infrastructures", "data-text": "La destruction massive des infrastructures civiles à travers l'Ukraine a entraîné des frappes ciblées sur les hôpitaux, les réseaux électriques et les écoles. Alors que des millions d'enfants voient leur éducation perturbée par le conflit..." },
        
        "case-9-title": "Le Conflit Armé et la Crise des Déplacements", "case-9-cat": "Soudan", "case-9-year": "2023–Présent",
        "case-9": { "data-title": "Le Conflit Armé et la Crise des Déplacements", "data-text": "Une violente lutte pour le pouvoir qui a commencé en avril 2023 a déclenché l'une des crises de déplacement à la croissance la plus rapide au monde, accompagnée de sévères restrictions d'accès humanitaire et de combats entre les forces armées..." },
        
        "case-10-title": "La Crise Humanitaire et de Santé", "case-10-cat": "Gaza", "case-10-year": "2023–Présent",
        "case-10": { "data-title": "La Crise Humanitaire et de Santé", "data-text": "La bande de Gaza fait face à de graves pénuries de nourriture, d'eau potable et d'infrastructures de santé fonctionnelles au milieu de bombardements intenses et continus, entraînant un nombre effroyable de victimes infantiles..." },

        "close-modal": "&larr; Retour",
        "modal-link": "Visiter le site &#8599;",
        
        "action-title": "Prenez des Mesures<br>Significatives",
        "action-1-title": "Amplifier les Voix de Première Ligne",
        "action-1-desc": "Partagez ces histoires documentées et sensibilisez à la protection civile de base. Maintenir l'attention mondiale sur les zones de conflit actives aide à protéger les défenseurs locaux et favorise la responsabilité internationale.",
        "action-2-title": "S'engager avec les Réseaux Locaux",
        "action-2-desc": "Connectez-vous avec des organisations locales de consolidation de la paix et des équipes d'intervention non violentes. Offrez votre temps, vos compétences ou votre plateforme pour soutenir les réseaux de base qui luttent pour les droits de l'homme sur le terrain.",
        "action-3-title": "Financer les Secours Directs",
        "action-3-desc": "Vos dons soutiennent directement des fondations de confiance qui fournissent des soins de santé d'urgence, une aide alimentaire et une protection civile non violente aux familles vulnérables piégées dans des conflits extrêmes.",
        
        "donations-label": "Dons",
        "donations-title": "Fondations de Confiance pour un Soutien Direct",
        "donations-desc": "Chaque contribution renforce directement les mouvements de base, les intervenants d'urgence et les défenseurs des droits humains qui agissent en première ligne des crises mondiales. En soutenant des fondations de confiance, votre générosité fournit une aide alimentaire immédiate, des soins de santé d'urgence et une protection civile non violente là où le besoin est le plus grand. Ensemble, nous pouvons restaurer la dignité, favoriser la résilience communautaire à long terme et bâtir un avenir plus sûr pour les populations vulnérables confrontées à une extrême adversité.",
        "don-irc-cat": "International Rescue Committee (IRC)", "don-irc-focus": "Objectif :", "don-irc-desc": "Répond aux pires crises humanitaires du monde, aidant à restaurer la santé, la sécurité, l'éducation, le bien-être économique et le pouvoir aux personnes dévastées par les conflits et les catastrophes.",
        "don-pf-cat": "Peaceforce", "don-pf-focus": "Objectif :", "don-pf-desc": "Protège les civils dans les conflits violents grâce à des stratégies non armées, construit la paix aux côtés des communautés locales et plaide pour l'adoption plus large de ces approches non violentes.",
        "don-uni-cat": "UNICEF (Fonds des Nations Unies pour l'Enfance)", "don-uni-focus": "Objectif :", "don-uni-desc": "Travaille dans les endroits les plus difficiles du monde pour atteindre les enfants et adolescents les plus défavorisés, en protégeant leurs droits de survivre, de s'épanouir et de réaliser leur potentiel.",

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
    }
};

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