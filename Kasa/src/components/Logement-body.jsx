import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";

export default function LogementBody() {
  const [selectedLocation, setData] = useState([]);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [isEquipOpen, setIsEquipOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => {
        const selectedLocation = data.find((dataSelected) => dataSelected.id === location.state.appartementId);
        setData(selectedLocation);
      })
      .catch((error) => console.error('Error loading JSON:', error));
  }, []);

  // Fonction pour basculer l'affichage des menus déroulants
  const toggleMenu = (menu) => {
    if (menu === "desc") {
      setIsDescOpen(!isDescOpen);
    } else if (menu === "equip") {
      setIsEquipOpen(!isEquipOpen);
    }
  };

  return (
    <div className='logement-body'>
      <div className="gallery">
        <img className='gallery-img' src={selectedLocation.cover} alt="Logement" />
      </div>
      <div className='logement-text'>
        <div className='logement-situation'>
          <div className='logement-title'>{selectedLocation.title}</div>
          <div className='city'>{selectedLocation.location}</div>
        </div>
        <div className='author-card'>
          <div className='author'>{selectedLocation.host?.name || "Nom inconnu"}</div>
          <img src={selectedLocation.host?.picture || "default.jpg"} className='author-img' alt="Hôte" />
        </div>
      </div>
      <div className='logement-info'>
        <div className='tags'>
          {selectedLocation.tags?.map((tag, index) => (
            <div key={index} className="tag">
              {tag}
            </div>
          ))}
        </div>
        <div className='stars'>
          {[...Array(5)].map((_, index) => (
            <i
              key={index}
              className={`fa-solid fa-star ${index < selectedLocation.rating ? "rated" : ""}`}
            ></i>
          ))}
        </div>
      </div>

      <div className="fiche-content">


        <div className='fiche-desc'>
          <div className="fiche-menu" onClick={() => toggleMenu("desc")}>
            <p>Description</p>
            <img
              src="./src/assets/arrow.png"
              className={`arrow ${isDescOpen ? "rotate" : ""}`}
              alt="toggle"
            />
          </div>
          <div className={`menu-deroulant ${isDescOpen ? "open" : ""}`}>
            <div className="fiche-texts">{selectedLocation.description}</div>
          </div>
        </div>

        <div className='fiche-equip'>
          <div className="fiche-menu" onClick={() => toggleMenu("equip")}>
            <p>Équipements</p>
            <img
              src="./src/assets/arrow.png"
              className={`arrow ${isEquipOpen ? "rotate" : ""}`}
              alt="toggle"
            />
          </div>
          <div className={`menu-deroulant ${isEquipOpen ? "open" : ""}`}>
            <div className="fiche-texts">
              <ul className="equipments-list">
                {selectedLocation.equipments?.map((item, index) => (
                  <li key={index} className="equipment-item">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}