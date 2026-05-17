// --- MENU MOBILNE ---
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu"); // To ID zostało takie samo

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Zamykanie menu po kliknięciu w link (teraz celuje w .nav-links-v2)
document.querySelectorAll(".nav-links-v2 a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Obsługa Slidera Dotacji (tylko mobile)
const dotacjeTrack = document.getElementById('dotacjeTrack');
const prevBtn = document.getElementById('prevDotacja');
const nextBtn = document.getElementById('nextDotacja');

if (dotacjeTrack && prevBtn && nextBtn) {
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.slider-item').length;

    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = totalSlides - 1; // Zapętlenie na koniec
        } else if (slideIndex >= totalSlides) {
            currentSlide = 0; // Zapętlenie na początek
        } else {
            currentSlide = slideIndex;
        }

        // Przesunięcie tracka (każdy slide ma 100% szerokości viewportu + gap 20px)
        const offset = -(currentSlide * (100 + 20)); // Przesuwamy w lewo
        // Uwzględniamy padding slider-viewport (40px z każdej strony)
        // const offset = - (currentSlide * (dotacjeTrack.parentElement.clientWidth - 80)); 
        // Lepsza logika z CSS grid/flex:
        dotacjeTrack.style.transform = `translateX(calc(${currentSlide * -100}% - ${currentSlide * 20}px))`;
    }

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    // Prosta obsługa przesuwania palcem (swipe)
    let startX;
    dotacjeTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    dotacjeTrack.addEventListener('touchend', (e) => {
        if (!startX) return;
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (diffX > 50) { // Swipe w lewo
            goToSlide(currentSlide + 1);
        } else if (diffX < -50) { // Swipe w prawo
            goToSlide(currentSlide - 1);
        }
        startX = null; // Reset
    });
}