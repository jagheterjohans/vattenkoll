fetch("kommuner.json")
  .then(response => response.json())
  .then(kommuner => {

    const lista = document.getElementById("kommunlista");

    kommuner.forEach(kommun => {

      const div = document.createElement("div");

      div.innerHTML = `
        <h2>${kommun.namn}</h2>
        <button onclick="visaKommun('${kommun.id}')">
          Visa vattenprofil
        </button>
      `;

      lista.appendChild(div);

    });

  });


function visaKommun(id){

    fetch(`${id}.json`)
      .then(response => response.json())
      .then(data => {

          alert(
`${data.kommun}

Vattenverk: ${data.vattenverk}

Hårdhet: ${data.hårdhet} °dH

Kalcium: ${data.kalcium} mg/L

Magnesium: ${data.magnesium} mg/L

Klor: ${data.klor ? "Ja" : "Nej"}

PFAS: ${data.pfas}

☕ Kaffe: ${data.kaffe.betyg}/10
${data.kaffe.kommentar}

🍵 Te: ${data.te.betyg}/10`
          );

      })
      .catch(error => {
          console.error("Kunde inte läsa vattenprofil:", error);
          alert("Kunde inte hitta vattenprofilen.");
      });

}
