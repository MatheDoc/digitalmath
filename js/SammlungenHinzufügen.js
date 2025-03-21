const aufgabenKategorien = {
    Analysis: [
        { text: "Lineare Funktionen - Basics", url: "https://www.mathechecks.de/index?config=%5B%2211%22%2C%2212%22%2C%2213%22%5D" },
        { text: "Lineare Funktionen - Ökonomisch", url: "https://www.mathechecks.de/index?config=%5B%2245%22%2C%2246%22%2C%2247%22%2C%2248%22%2C%2249%22%2C%2250%22%5D" },
        { text: "Quadratische Funktionen - Basics", url: "https://www.mathechecks.de/index?config=%5B%2214%22%2C%2215%22%2C%2216%22%2C%2217%22%2C%2218%22%5D" },
        { text: "Quadratische Funktionen - Ökonomisch", url: "https://www.mathechecks.de/index?config=%5B%2251%22%2C%2252%22%2C%2253%22%2C%2254%22%2C%2255%22%2C%2256%22%5D" },
        { text: "Kubische Funktionen - Basics", url: "https://www.mathechecks.de/index?config=%5B%226%22%2C%227%22%2C%228%22%2C%229%22%2C%2210%22%5D" },
        { text: "Kubische Funktionen - Ökonomisch", url: "https://www.mathechecks.de/index?config=%5B%2232%22%2C%2233%22%2C%2234%22%2C%2235%22%2C%2236%22%2C%2237%22%2C%2238%22%2C%2239%22%2C%2240%22%2C%2241%22%2C%2242%22%2C%2243%22%2C%2244%22%5D" },
        { text: "Marktgleichgewicht", url: "https://www.mathechecks.de/index?config=%5B%2221%22%2C%2245%22%2C%2251%22%2C%2257%22%2C%2258%22%2C%2259%22%5D" },
        { text: "Produktlebenszyklus", url: "https://www.mathechecks.de/index?config=%5B%2222%22%2C%2223%22%2C%2224%22%2C%2225%22%2C%2226%22%2C%2227%22%2C%2228%22%2C%2229%22%2C%2230%22%2C%2231%22%5D" }
    ],
    Stochastik: [
        { text: "Baumdiagramme", url: "https://www.mathechecks.de/index?config=%5B%22111%22%2C%22112%22%2C%22113%22%2C%22114%22%2C%22115%22%2C%22116%22%2C%22117%22%2C%22118%22%5D" },
        { text: "Vierfeldertafeln", url: "https://www.mathechecks.de/index?config=%5B%22125%22%2C%22126%22%2C%22127%22%2C%22128%22%2C%22129%22%2C%22130%22%2C%22131%22%2C%22132%22%5D" },
        { text: "Hypothesentests", url: "https://www.mathechecks.de/index?config=%5B%2290%22%2C%2291%22%2C%2292%22%2C%2293%22%2C%2294%22%2C%2295%22%5D" },
        { text: "Binomialverteilung", url: "https://www.mathechecks.de/index?config=%5B%2296%22%2C%2297%22%2C%2298%22%2C%2299%22%2C%22100%22%2C%22101%22%2C%22102%22%2C%22103%22%2C%22104%22%2C%22105%22%2C%22106%22%2C%22107%22%2C%22108%22%2C%22109%22%2C%22110%22%5D" },
        { text: "Interpretation von Wahrscheinlichkeiten", url: "https://www.mathechecks.de/index?config=%5B%22122%22%2C%22123%22%5D" }
    ],
    LineareAlgebra: [
        { text: "Matrizenrechnung", url: "https://www.mathechecks.de/index?config=%5B%2274%22%2C%2275%22%2C%2276%22%5D" },
        { text: "Gleichungssysteme", url: "https://www.mathechecks.de/index?config=%5B%2271%22%2C%2272%2C%2273%22%5D" },
        { text: "Mehrstufige Produktionsprozesse", url: "https://www.mathechecks.de/index?config=%5B%2279%22%2C%2280%22%2C%2281%22%2C%2282%22%2C%2283%22%2C%2284%22%2C%2285%22%2C%2286%22%2C%2287%22%2C%2288%22%2C%2289%22%5D" },
        { text: "Markov-Ketten", url: "https://www.mathechecks.de/index?config=%5B%2277%22%2C%2278%22%5D" }
    ],
    Weiteres: [
        { text: "Prozentrechnung - Basics", url: "https://www.mathechecks.de/index?config=%5B%22138%22%2C%22139%22%2C%22140%22%5D" },
        { text: "Prozentrechnung - Verm. Grundwert", url: "https://www.mathechecks.de/index?config=%5B%22141%22%2C%22142%22%2C%22143%22%2C%22144%22%2C%22145%22%2C%22146%22%5D" },
        { text: "Einheiten", url: "https://www.mathechecks.de/index?config=%5B%22147%22%2C%22148%22%2C%22149%22%2C%22150%22%2C%22151%22%2C%22152%22%2C%22153%22%2C%22154%22%2C%22155%22%2C%22156%22%2C%22157%22%2C%22158%22%2C%22159%22%2C%22160%22%5D" },
        { text: "Dreisatz", url: "https://www.mathechecks.de/index?config=%5B%22161%22%2C%22162%22%2C%22163%22%2C%22164%22%5D" }
    ],
    Finanzmathe: [
        { text: "Zinseszinsrechnung", url: "" },
        { text: "Rentenrechnung", url: "https://www.mathechecks.de/index?config=%5B%2266%22%2C%2267%22%2C%2268%22%2C%2269%22%5D" },
        { text: "Kapitalaufbau und -abbau", url: "https://www.mathechecks.de/index?config=%5B%2262%22%2C%2263%22%2C%2264%22%2C%2265%22%5D" }
    ]
};



function SammlungenHinzufügen (){
    const container = document.getElementById("Aufgabensammlung");

    Object.keys(aufgabenKategorien).forEach(kategorie => {
        aufgabenKategorien[kategorie].forEach(aufgabe => {
            const button = document.createElement("button");
            button.textContent = aufgabe.text;
            button.onclick = () => window.location.href = aufgabe.url;
    
            // Dynamisches Hinzufügen der CSS-Klasse basierend auf der Kategorie
            button.classList.add(kategorie.toLowerCase()); // z.B. "analysis" oder "stochastik"
            
            container.appendChild(button);
        });
    });    
}





