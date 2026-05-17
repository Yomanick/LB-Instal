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


// --- LOGIKA MIAST I LOKALIZACJI ---
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

const buttons = document.querySelectorAll('.prov-btn');
const cloud = document.getElementById('cities-list');

if (buttons.length > 0 && cloud) {
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const prov = btn.getAttribute('data-province');
            const cities = citiesData[prov];
            
            cloud.style.opacity = 0;
            setTimeout(() => {
                cloud.innerHTML = cities.map(city => `<span class="city-tag">${city}</span>`).join('');
                cloud.style.opacity = 1;
            }, 200);
        });
    });
}