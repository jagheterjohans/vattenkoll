console.log("Vattenkoll startad!");

fetch("kommuner.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
