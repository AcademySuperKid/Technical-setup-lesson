let currentSlide = 1;
const totalSlides = 12;

function openGates() {
    const intro = document.getElementById('slide-intro');
    if (!intro) return; 
    
    const introText = intro.querySelector('.intro-text');
    const academyBG = document.getElementById('academy-bg-layer');

    if (academyBG) {
        academyBG.classList.add('final-zoom');
    }
    
    if (introText) {
        introText.style.opacity = '0';
    }
    
    setTimeout(() => {
        intro.style.display = 'none';
        
        const slide1 = document.getElementById('slide-1');
        if (slide1) {
            slide1.classList.add('active');
        }
        
        const navControls = document.getElementById('nav-controls');
        if (navControls) {
            navControls.style.display = 'flex';
        }
        
        updateNavButtons(); 
    }, 1500); 
}

function updateNavButtons() {
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const mascot = document.getElementById('global-mascot');
    const academyBG = document.getElementById('academy-bg-layer');
    
    if (btnPrev) btnPrev.style.visibility = currentSlide === 1 ? 'hidden' : 'visible';
    if (btnNext) btnNext.style.visibility = currentSlide === totalSlides ? 'hidden' : 'visible';

    // Фоксик появляется со 2 слайда
    if (currentSlide === 1) {
        if (mascot) mascot.style.display = 'none';
        if (academyBG) {
            academyBG.classList.add('final-zoom');
            academyBG.style.opacity = '1';
        }
    } else {
        if (mascot) mascot.style.display = 'block';
        if (academyBG) {
            academyBG.classList.remove('final-zoom');
            academyBG.style.opacity = '0';
        }
    }

    const slideCounter = document.getElementById('slide-counter');
    if (slideCounter) {
        slideCounter.innerText = `${currentSlide} / ${totalSlides}`;
    }
}

function updateSlides() {
    document.querySelectorAll('.slide').forEach((slide, index) => {
        slide.classList.remove('active');
        if (index + 1 === currentSlide) {
            slide.classList.add('active');
        }
    });
    updateNavButtons();
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlides();
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlides();
    }
}

function toggleZoom(imgElement) {
    if (imgElement) {
        imgElement.classList.toggle('fullscreen-zoomed');
    }
}

const questions = [
    "Какая твоя самая любимая видеоигра и почему?",
    "Если бы у тебя была суперсила, то какая?",
    "Любимое хобби помимо компьютеров?",
    "Что вкуснее: пицца или сладости?",
    "Кем хочешь стать, когда вырастешь?",
    "Твой любимый цвет и почему?",
    "Какого питомца ты бы хотел завести?",
    "Какое время года тебе больше нравится?",
    "Какой твой самый любимый мультфильм?",
    "Рисовать или собирать Лего?"
];

let currentRotation = 0;
let isSpinning = false;

function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;

    const wheel = document.getElementById('wheel');
    const display = document.getElementById('question-display');
    const qBox = document.getElementById('q-box');
    
    if (qBox) qBox.classList.remove('highlight');
    if (display) {
        display.innerText = "Узнаём вопрос... 🌀";
        display.style.opacity = '0.5';
    }

    const randomDegree = Math.floor(Math.random() * 360);
    const extraSpins = 1800; 
    currentRotation += extraSpins + randomDegree;

    if (wheel) wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        if (display) display.style.opacity = '0';
        
        setTimeout(() => {
            if (display) {
                display.innerText = randomQuestion;
                display.style.opacity = '1';
            }
            if (qBox) qBox.classList.add('highlight');
            fireConfetti();
            isSpinning = false;
        }, 300);

    }, 4000); 
}

function fireConfetti() {
    const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#9c88ff'];
    for (let i = 0; i < 60; i++) {
        let conf = document.createElement('div');
        conf.classList.add('confetti');
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.top = '-20px';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        if (Math.random() > 0.5) conf.style.borderRadius = '50%';
        conf.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 4000);
    }
}