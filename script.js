// handlekurv

    const container  = document.getElementById("produktContainer");
    const kurvPopup  = document.getElementById("kurvPopup");
    const kurvKnapp  = document.getElementById("kurvKnapp");
    const lukkKurv   = document.getElementById("lukkKurv");
    const tomKnapp   = document.getElementById("tomKurv");

    document.querySelectorAll(".kjopKnapp").forEach(knapp => {
        knapp.addEventListener("click", () => {
        let id = Number(knapp.dataset.id);
        let valgtProdukt = produkter.find(produkt => produkt.id === id);

        let ibkurv = handlekurv.find(vare => vare.id === id);
        if (ibkurv) {
            ibkurv.antall++;
        } else {
            handlekurv.push({ ...valgtProdukt, antall: 1 });
        }
    
        oppdaterAntall();
        });
    });

    function oppdaterAntall() {
        let antall = 0;
        for (let vare of handlekurv) {
            antall = antall + vare.antall;
        }
        document.getElementById("antallKurv").textContent = antall;
    }

    

    let handlekurv = []

    const produkter = [

        {
        id: 1, 
        navn: "PlayStation 5 - Slim (Disc)", 
        pris: 5600, 
        bilde: "img/ps5.jpg"
        },

        // kun midlertidig kommentar for test

        // {
        // id: 2,
        // navn: "Mus",
        // pris: 299,
        // bilde: "Bilder/mus.jpg"
        // },

        // {
        // id: 3,
        // navn: "Skjerm",
        // pris: 2499,
        // bilde: "Bilder/skjerm.jpg"
        // }

    ];
