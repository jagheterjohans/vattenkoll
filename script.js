fetch("data/kommuner.json")
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

    fetch(`data/${id}.json`)
      .then(response => response.json())
      .then(data => {

          alert(
            `${data.kommun}\n\nKaffe: ${data.kaffe}/10\nSmak: ${data.smak}/10`
          );

      });

}
Nu händer följande:
