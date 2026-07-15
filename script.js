// Skapa stjärnor från betyg 1-10
function betyg(värde) {
  return `${värde}/10`;
}


// Läser in kommunlistan
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

  })
  .catch(error => {
    console.error("Kunde inte läsa kommuner:", error);
  });



// Visar vald kommun
function visaKommun(id) {

  fetch(`${id}.json`)
    .then(response => {

      if (!response.ok) {
        throw new Error("Kunde inte hitta " + id + ".json");
      }

      return response.json();

    })
    .then(data => {


      const profil = document.getElementById("vattenprofil");


      profil.innerHTML = `

      <h2>${data.kommun}</h2>

      <p><strong>Vattenverk:</strong> ${data.vattenverk}</p>


      <div class="kort">

        <h3>Dricksvatten</h3>

        <p class="betyg">
  ${betyg(data.bedömning.dricksvatten.betyg)}
</p>

        <p>
          ${data.bedömning.dricksvatten.kommentar}
        </p>

      </div>



      <div class="kort">

        <h3>Filtrering</h3>

        <p>
        ${data.bedömning.filtrering.motivering}
        </p>

        <ul>
          <li>
          Hälsoskäl:
          ${data.bedömning.filtrering.hälsoskäl ? "Ja" : "Nej"}
          </li>

          <li>
          Smak:
          ${data.bedömning.filtrering.smak ? "Kan förbättras" : "Ingen större skillnad"}
          </li>

          <li>
          Kaffe:
          ${data.bedömning.filtrering.kaffe ? "Rekommenderas" : "Inte nödvändigt"}
          </li>
        </ul>

      </div>



      <div class="kort">

        <h3>Kaffe</h3>

        <p class="betyg">
${betyg(data.bedömning.kaffe.betyg)}
</p>

        <p>
        ${data.bedömning.kaffe.kommentar}
        </p>

      </div>



      <div class="kort">

        <h3>Te</h3>

       <p class="betyg">
${betyg(data.bedömning.te.betyg)}
</p>

        <p>
        ${data.bedömning.te.kommentar}
        </p>

      </div>

<div class="kort">

<h3>Hem och hushåll</h3>

<p>
<strong>Kalknivå:</strong>
${data.hem.kalk.klass}
</p>

<p>
${data.hem.kalk.kommentar}
</p>

<h4>Avkalkning</h4>

<p>
${data.hem.avkalkning.kaffebryggare}
</p>

<p>
${data.hem.avkalkning.övrigt}
</p>


<h4>Tvätt</h4>

<p>
${data.hem.tvätt.kommentar}
</p>


<h4>Diskmaskin</h4>

<p>
${data.hem.diskmaskin.kommentar}
</p>

</div>

      <details>

        <summary>Tekniska analysvärden</summary>

        <ul>

          <li>
          Hårdhet:
          ${data.vattenvärden.hårdhet} °dH
          </li>

          <li>
          Kalcium:
          ${data.vattenvärden.kalcium} mg/L
          </li>

          <li>
          Magnesium:
          ${data.vattenvärden.magnesium} mg/L
          </li>

          <li>
          Klor:
          ${data.vattenvärden.klor ? "Ja" : "Nej"}
          </li>

          <li>
          PFAS:
          ${data.vattenvärden.pfas}
          </li>

        </ul>

      </details>



      <p class="uppdaterad">

      Källa: ${data.källa}<br>
      Rapport: ${data.rapport_datum}<br>
      Senast uppdaterad: ${data.senast_uppdaterad}

      </p>


      `;


    })
    .catch(error => {

      console.error(error);

      document.getElementById("vattenprofil").innerHTML =
      "<p>Vattenprofil finns inte.</p>";

    });

}
