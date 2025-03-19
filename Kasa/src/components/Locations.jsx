import React, { useState, useEffect } from 'react';
import { Link } from "react-router";

export default function Locations(item) {
    const [data, setData] = useState([]);

    useEffect(() => {
      // Charger le fichier JSON à partir du dossier public
      fetch('/db.json')
        .then((response) => response.json())
        .then((data) => {
          // Vérifier les données récupérées dans la console
          console.log(data); // Vérification dans la console
          setData(data);
        })
        .catch((error) => console.error('Error loading JSON:', error));
    }, []); // [] pour que l'effet se déclenche une seule fois au chargement
  

    // Afficher les titres pour chaque appartement
    return (
        <div className="location-1">
        {data.length > 0 ? (
          data.map((item) => (
            <Link to="/logement" state={{appartementId : item.id}}>
            <div key={item.id} id={item.id} className="loc">
              <div className="gradient"></div>
              <img className="img-loc" src={item.cover} alt={item.title} />
              <div className="titre">{item.title}</div>
            </div>
            </Link>
          ))
        ) : (
          <div className="titre">Chargement des données...</div>
        )}
      </div>
    );
  }

