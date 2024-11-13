const shipsWrapper = document.getElementById("ships-wrapper");

const getAllShips = async () => {
  const response = await fetch("http://localhost:3000/ships");
  const data = await response.json();
  return data.ships;
};

const getShipClass = (year) => {
  if (year < 2000) {
    return "old-ship";
  }
  return "new-ship";
};
const buildShips = (ships) => {
  [...ships]
    .sort((a, b) => {
      a.name.localeCompare(b.name);
    })
    .forEach((ship) => {
      const shipName = document.createElement("h3");
      const shipType = document.createElement("p");
      const shipYear = document.createElement("p");
      const shipMass = document.createElement("p");
      const shipImg = document.createElement("img");
      const shipCard = document.createElement("div");

      shipName.innerText = ship.name;
      shipType.innerText = "Type: " + ship.type;
      shipYear.innerText = "Year built: " + ship.year_built;
      shipMass.innerText =
        "Mass, kg: " + Intl.NumberFormat().format(ship.mass_kg);

      if (ship.image) {
        shipImg.src = ship.image;
        shipCard.setAttribute("class", `ship ${getShipClass(ship.year_built)}`);
        shipCard.append(shipName, shipType, shipYear, shipMass, shipImg);
        shipsWrapper.append(shipCard);
      }
      shipCard.addEventListener("click", () => {
        console.log(ship.name);
      });
    });
};

const startApp = async () => {
  const ships = await getAllShips();

  buildShips(ships);
};

startApp();
