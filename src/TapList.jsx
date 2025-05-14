import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import "./assets/css/TapList.css";

const beers = [
  {
    name: "TERCER OJO",
    style: "Mexican Lager",
    description: "Maíz morado + cacahuazintle. Colaboración con Thirdeye.",
    ibu: 30,
    abv: "4.5%",
    half: "$50",
    pint: "$80",
  },
  {
    name: "TEZONTLE",
    style: "American Pale Ale",
    description: "Ámbar pálido, maltosa, caramelo suave.",
    ibu: 40,
    abv: "5.4%",
    half: "$50",
    pint: "$80",
  },
  {
    name: "ARCILLA",
    style: "Amber Ale",
    description: "Caramelo marcado, frutos secos, rojiza.",
    ibu: 45,
    abv: "5.0%",
    half: "$60",
    pint: "$90",
  },
  {
    name: "KAKAPO",
    style: "New Zealand Pilsner",
    description: "Lúpulos cítricos tropicales: lima, toronja.",
    ibu: 40,
    abv: "5.4%",
    half: "$60",
    pint: "$80",
  },
  {
    name: "CALIZA",
    style: "Hazy IPA",
    description: "Turbia, frutal, premiada en Cocepa 2025.",
    ibu: 55,
    abv: "5.8%",
    half: "$70",
    pint: "$120",
  },
  {
    name: "CHULA VISTA",
    style: "West Coast IPA",
    description: "Guayaba, melón. Oro Cocepa 2025.",
    ibu: 60,
    abv: "6.8%",
    half: "$70",
    pint: "$120",
  },
  {
    name: "PARTENOPE",
    style: "Triple IPA",
    description: "Resinosa, floral, retrogusto dulce.",
    ibu: 90,
    abv: "10.2%",
    half: "$70",
    pint: "$120",
  },
  {
    name: "SAN MATEO VIII",
    style: "Belgian Trippel",
    description: "Plátano y chicle. Oro en Cocepa 2025.",
    ibu: 25,
    abv: "7.5%",
    half: "$70",
    pint: "$120",
  },
];

const TapList = () => {
  return (
    <div className="taplist-page">
      <Navbar />
      <div className="taplist-container">
        <h1 className="title">🍺 CERVEZAS — EL CARACOL TAPROOM</h1>
        <div className="table-wrapper">
          <table className="beer-table">
            <thead>
              <tr>
                <th>#</th>
                <th>🍺 Cerveza</th>
                <th>🏷️ Estilo</th>
                <th>📝 Descripción</th>
                <th>🌿 IBU</th>
                <th>💥 ABV</th>
                <th>🧉 ½ Pinta</th>
                <th>🍻 Pinta</th>
              </tr>
            </thead>
            <tbody>
              {beers.map((beer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{beer.name}</td>
                  <td>{beer.style}</td>
                  <td>{beer.description}</td>
                  <td>{beer.ibu}</td>
                  <td>{beer.abv}</td>
                  <td>{beer.half}</td>
                  <td>{beer.pint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TapList;
