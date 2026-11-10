const produkter = JSON.parse(localStorage.getItem("produkter")) || [
    {
        id: 1,
        navn: "PlayStation 5 - Slim (Disc)",
        pris: 5600,
        bilde: "img/ps5.jpg",
        antall: 0
    },
    {
        id: 2,
        navn: "PlayStation 5 - Slim (Digital)",
        pris: 4800,
        bilde: "img/ps5_no_disc.jpeg",
        antall: 0
    },
    {
        id: 3,
        navn: "Nintendo Switch 2",
        pris: 6000,
        bilde: "img/switch_2.jpeg",
        antall: 0
    },
    {
        id: 4,
        navn: "Nintendo Switch Oled",
        pris: 3790,
        bilde: "img/switch_oled.jpeg",
        antall: 0
    },
    {
        id: 5,
        navn: "Nintendo Switch LCD",
        pris: 2090,
        bilde: "img/switch_lcd.jpeg",
        antall: 0
    },
    {
        id: 6,
        navn: "Xbox Series X",
        pris: 3999,
        bilde: "",
        antall: 0
    }
];

function endreAntall(id, endring) {
    let produkt = produkter.find(p => p.id === id);

    produkt.antall = produkt.antall + endring;

    if (produkt.antall < 0) {
        produkt.antall = 0;
    }

    oppdaterAlt();
}

function fjernVare(id) {
    let produkt = produkter.find(p => p.id === id);

    produkt.antall = 0;

    oppdaterAlt();
}

function oppdaterAlt() {
    localStorage.setItem("produkter", JSON.stringify(produkter));
    oppdaterAntall();

    if (document.getElementById("kurvListe")) {
        visHandlekurv();
    }
}

function oppdaterAntall() {
    const antallKurv = document.getElementById("antallKurv");

    if (antallKurv) {
        let antall = 0;

        for (let produkt of produkter) {
            antall = antall + produkt.antall;
        }

        antallKurv.textContent = antall;
    }
}

function visHandlekurv() {
    const liste = document.getElementById("kurvListe");
    liste.innerHTML = "";

    let total = 0;

    for (let produkt of produkter) {
        if (produkt.antall > 0) {
            liste.innerHTML += `
                <div>
                    <img src="${produkt.bilde}" alt="${produkt.navn}" width="100">
                    <h3>${produkt.navn}</h3>
                    <p>${produkt.pris} kr per stk</p>
                    <button onclick="endreAntall(${produkt.id}, -1)">-</button>
                    <span>Antall: ${produkt.antall}</span>
                    <button onclick="endreAntall(${produkt.id}, 1)">+</button>
                    <p>Sum: ${produkt.pris * produkt.antall} kr</p>
                    <button onclick="fjernVare(${produkt.id})">Fjern</button>
                </div>
            `;
            total = total + produkt.pris * produkt.antall;
        }
    }

    if (total === 0) {
        liste.innerHTML = "<p>Handlekurven er tom.</p>";
        document.getElementById("totalPris").textContent = "";
    } else {
        document.getElementById("totalPris").textContent =
            "Totalt: " + total + " kr";
    }
}

document.querySelectorAll(".kjopKnapp").forEach(knapp => {
    knapp.addEventListener("click", () => {
        endreAntall(Number(knapp.dataset.id), 1);
    });
});

oppdaterAlt();