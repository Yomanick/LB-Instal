/**
 * 1. DANE LOKALIZACJI
 */
const citiesData = {
    lubelskie: [
        "Lublin", "Zamość", "Chełm", "Biała Podlaska", "Puławy", "Świdnik", "Kraśnik", "Łuków", 
        "Biłgoraj", "Lubartów", "Tomaszów Lubelski", "Łęczna", "Krasnystaw", "Hrubieszów", 
        "Międzyrzec Podlaski", "Dęblin", "Radzyń Podlaski", "Włodawa", "Janów Lubelski", 
        "Parczew", "Ryki", "Poniatowa", "Bełżyce", "Opole Lubelskie", "Terespol", "Bychawa", 
        "Szczebrzeszyn", "Rejowiec Fabryczny", "Nałęczów", "Tarnogród", "Kock", "Zwierzyniec", 
        "Krasnobród", "Kazimierz Dolny", "Piaski", "Stoczek Łukowski", "Annopol", "Józefów", 
        "Lubycza Królewska", "Łaszczów", "Ostrów Lubelski", "Tyszowce", "Frampol", "Siedliszcze", 
        "Urzędów", "Modliborzyce", "Gorce", "Izbica", "Piszczac"
    ],
    podkarpackie: [
        "Rzeszów", "Przemyśl", "Stalowa Wola", "Mielec", "Tarnobrzeg", "Krosno", "Dębica", 
        "Jarosław", "Sanok", "Jasło", "Łańcut", "Przeworsk", "Nisko", "Ropczyce", "Leżajsk", 
        "Lubaczów", "Nowa Dęba", "Kolbuszowa", "Ustrzyki Dolne", "Strzyżów", "Brzozów", 
        "Sędziszów Małopolski", "Rudnik nad Sanem", "Dynów", "Nowa Sarzyna", "Boguchwała", 
        "Jedlicze", "Lesko", "Radymno", "Głogów Małopolski", "Zagórz", "Piliszno", "Dukla", 
        "Narol", "Sieniawa", "Cieszanów", "Iwonicz-Zdrój", "Przecław", "Baranów Sandomierski", 
        "Ulanów", "Oleszyce", "Pruchnik", "Błażowa", "Zaklików", "Kańczuga"
    ],
    swietokrzyskie: [
        "Sandomierz", "Ostrowiec Świętokrzyski", "Starachowice", "Skarżysko-Kamienna", 
        "Opatów", "Staszów", "Połaniec", "Zawichost", "Koprzywnica", "Ćmielów", "Kunów", 
        "Annopol", "Ożarów", "Osiek", "Klimontów", "Iwaniska"
    ]
};

/**
 * 2. FUNKCJA ZMIANY WOJEWÓDZTWA
 */
function changeProvince(btn) {
    const cloud = document.getElementById('cities-list');
    const scrollContainer = document.querySelector('.cities-scroll-container');
    const province = btn.getAttribute('data-province');
    const allButtons = document.querySelectorAll('.prov-btn');

    if (!cloud || !province || !citiesData[province]) return;

    allButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    cloud.style.opacity = '0';
    
    setTimeout(() => {
        const cities = citiesData[province];
        const fragment = document.createDocumentFragment();
        
        cities.forEach(city => {
            const span = document.createElement('span');
            span.className = 'city-tag';
            span.textContent = city;
            fragment.appendChild(span);
        });

        requestAnimationFrame(() => {
            cloud.innerHTML = '';
            cloud.appendChild(fragment);
            
            if(scrollContainer) scrollContainer.scrollTop = 0;

            requestAnimationFrame(() => {
                cloud.style.opacity = '1';
            });
        });
    }, 200);
}

/**
 * 3. LOGIKA GŁÓWNA
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicjalizacja AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Inicjalizacja listy miast
    const cloud = document.getElementById('cities-list');
    if (cloud) {
        cloud.innerHTML = citiesData.lubelskie.map(city => `<span class="city-tag">${city}</span>`).join('');
    }

    // Menu Mobilne
    const hamburger = document.querySelector("#hamburger");
    const navMenu = document.querySelector("#nav-menu");
    const navLinks = document.querySelectorAll(".nav-links-v2 a");

    if (hamburger && navMenu) {
        const toggleMenu = (show) => {
            hamburger.classList.toggle("active", show);
            navMenu.classList.toggle("active", show);
            // Używamy "" zamiast "auto", żeby przywrócić stan z CSS
            document.body.style.overflow = show ? "hidden" : "";
        };

        hamburger.addEventListener("click", () => {
            const isOpen = navMenu.classList.contains("active");
            toggleMenu(!isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => toggleMenu(false));
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Odświeżenie AOS po pełnym załadowaniu obrazków
window.addEventListener('load', () => {
    AOS.refresh();
});