document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        if(mobileMenu) mobileMenu.classList.remove('active');
        if(navMenu) navMenu.classList.remove('active');
    }));

    // Scroll Animation (Fade In)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to sections and elements
    const animatedElements = document.querySelectorAll('.section-header, .card, .service-item, .hero-content, .hero-image');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // --- Testimonial Slider Logic ---
    const testimonials = [
        {
            text: "Gracias a ESCADE, nuestra estrategia de comunicación política dio un giro de 180 grados. Altamente recomendados.",
            author: "Lic. Roberto Mendoza",
            role: "Diputado Federal"
        },
        {
            text: "Encontrar capacitadores de este nivel solía ser una pesadilla. ESCADE lo hizo simple y el resultado superó expectativas.",
            author: "Elena Torres",
            role: "CEO, InnovaTech"
        },
        {
            text: "La capacitación para nuestra ONG fortaleció nuestro impacto en la comunidad. Profesionales comprometidos y expertos.",
            author: "Carla Rivas",
            role: "Directora, Fundación Vida"
        }
    ];

    const sliderContainer = document.getElementById('testimonial-slider');
    const dotsContainer = document.getElementById('slider-controls');
    let currentSlide = 0;

    if (sliderContainer && dotsContainer) {
        // Init Slides
        testimonials.forEach((t, index) => {
            const slide = document.createElement('div');
            slide.className = `testimonial-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `
                <div class="testimonial-content">
                    <p class="testimonial-text">"${t.text}"</p>
                    <div class="testimonial-author">
                        <div class="author-info">
                            <h4>${t.author}</h4>
                            <span>${t.role}</span>
                        </div>
                    </div>
                </div>
            `;
            sliderContainer.appendChild(slide);

            const dot = document.createElement('div');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(n) {
            const slides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.slider-dot');
            
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = n;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // Auto play
        setInterval(() => {
            let next = (currentSlide + 1) % testimonials.length;
            goToSlide(next);
        }, 5000);
    }

    // --- Wizard Logic ---
    const wizard = document.getElementById('wizard');
    if (wizard) {
        let currentStep = 1;
        const totalSteps = 3;
        
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const submitBtn = document.getElementById('submit-btn');
        const form = document.getElementById('wizard-form');

        function updateWizard() {
            // Update active step display
            document.querySelectorAll('.wizard-step').forEach(s => {
                s.classList.remove('active');
                if(s.dataset.step == currentStep) s.classList.add('active');
            });

            // Update success screen logic
            if (currentStep > totalSteps) {
                document.getElementById('wizard-success').classList.add('active');
                document.getElementById('wizard-footer').style.display = 'none';
                return;
            }

            // Update Progress Bar
            document.querySelectorAll('.progress-step').forEach((p, idx) => {
                if (idx + 1 === currentStep) p.classList.add('active');
                else p.classList.remove('active');
            });

            // Buttons State
            prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
            
            if (currentStep === totalSteps) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else {
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            }
        }

        nextBtn.addEventListener('click', () => {
            // Simple validation simulation
            const currentStepEl = document.querySelector(`.wizard-step[data-step="${currentStep}"]`);
            const requiredInputs = currentStepEl.querySelectorAll('input[required]');
            
            let valid = true;
            requiredInputs.forEach(input => {
                if (input.type === 'radio' && !currentStepEl.querySelector(`input[name="${input.name}"]:checked`)) {
                    valid = false;
                }
                if ((input.type === 'text' || input.type === 'email') && !input.value) {
                    valid = false;
                }
            });

            if (!valid) {
                // Shake animation or alert could go here
                alert("Por favor completa los campos requeridos.");
                return;
            }

            if (currentStep < totalSteps) {
                currentStep++;
                updateWizard();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateWizard();
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate API call
            const btnText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            setTimeout(() => {
                currentStep++; // Move to success 'step'
                updateWizard();
            }, 1000);
        });
    }
});
