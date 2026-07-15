fetch("kommuner.json")
  .then(response => response.json())
  .then(kommuner => {

    const lista = document.getElementById("kommunlista");

    kommuner.forEach(kommun => {

      const knapp = document.createElement("button");

      knapp.textContent = kommun.namn;

      knapp.onclick = () => visaKommun(kommun.id);

      lista.appendChild(knapp);

    });

  });


function visaKommun(id){

    fetch(`${id}.json`)
      .then(response => response.json())
      .then(data => {

        const profil = document.getElementById("vattenprofil");

        profil.innerHTML = `

        <h2>${data.kommun}</h2>

        <h3>Vattenverk</h3>
        <p>${data.vattenverk}</p>

        <h3>🧪 Vattenvärden</h3>

        <ul>
          <li>Hårdhet: ${data.hårdhet} °dH</li>
          <li>Kalcium: ${data.kalcium} mg/L</li>
          <li>Magnesium: ${data.magnesium} mg/L</li>
          <li>Klor: ${data.klor ? "Ja" : "Nej"}</li>
          <li>PFAS: ${data.pfas}</li>
        </ul>

        <h3>☕ Kaffe</h3>

        <p>
        Betyg: ${data.kaffe.betyg}/10
        </p>

        <p>
        ${data.kaffe.kommentar}
        </p>

        <h3>🍵 Te</h3>

        <p>
        Betyg: ${data.te.betyg}/10
        </p>

        `;

      });

}
