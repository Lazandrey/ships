const shipsWrapper = document.getElementById("ships-wrapper");
const params = new URLSearchParams(document.location.search);
let qty = params.get("qty");
let type = params.get("type");
let sort = params.get("sort");
if (!qty) {
  qty = "";
}
if (!type) {
  type = "";
}
if (!sort) {
  sort = "";
}

const getAllSh = async () => {
  const response = await fetch("https://api.spacexdata.com/v4/ships");
  const data = await response.json();
  return data;
};

const copyShip = async () => {
  const ships = await getAllSh();
  ships.forEach(async (ship) => {
    const result = await fetch("http://localhost:3000/ship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: ship.id,
        name: ship.name,
        type: ship.type,
        home_port: ship.home_port,
        image: ship.image,
        roles: ship.roles,
        year_built: ship.year_built,
        mass_kg: ship.mass_kg,
      }),
    });
    const data = await result.json();
    console.log(data.response);
  });
};

const getAllShips = async () => {
  const response = await fetch(
    `http://localhost:3000/ships?qty=${qty}&type=${type}&sort=${sort}`
  );
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
      } else {
        shipImg.src =
          "https://banner2.cleanpng.com/20180823/fwt/kisspng-clip-art-ferry-boat-desktop-wallpaper-ship-uladzimer-1713950577462.webp";
      }
      shipCard.setAttribute("class", `ship ${getShipClass(ship.year_built)}`);
      shipCard.append(shipName, shipType, shipYear, shipMass, shipImg);
      shipsWrapper.append(shipCard);
      shipCard.addEventListener("click", () => {
        console.log(ship.name);
      });
    });
};

const startApp = async () => {
  const ships = await getAllShips();
  // copyShip();

  buildShips(ships);
};

startApp();
