import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";

export default function LogementBody() {
  const [selectedLocation, setData] = useState([]);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [isEquipOpen, setIsEquipOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(false);

  const location = useLocation();

  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => {
        const selectedLocation = data.find(
          (dataSelected) => dataSelected.id === location.state.appartementId
        );
        setData(selectedLocation);
      })
      .catch((error) => console.error('Erreur lors du chargement du JSON:', error));
  }, []);

  // Fonction pour gérer les changements d'images
  const handleNext = () => {
    setTransition(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedLocation.pictures.length);
  };

  const handlePrev = () => {
    setTransition(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? selectedLocation.pictures.length - 1 : prevIndex - 1
    );
  };

  // Gestion des menus déroulants
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
        {selectedLocation.pictures && selectedLocation.pictures.length > 1 && (
          <>
            <button className="arrow-c left-arrow" onClick={handlePrev}>{"<"}</button>
           
              <img
                className="gallery-img"
                src={selectedLocation.pictures[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
              />
              {/* Numérotation des images */}
              <div className="image-number">
                {currentIndex + 1}/{selectedLocation.pictures.length}
              </div>
           
            <button className="arrow-c right-arrow" onClick={handleNext}>{">"}</button>
          </>
        )}

        {selectedLocation.pictures && selectedLocation.pictures.length === 1 && (
          <div className="image-container">
            <img
              className="gallery-img"
              src={selectedLocation.pictures[0]}
              alt={`Image unique`}
            />
          </div>
        )}
      </div>

      <div className='logement-grp'>
        <div className='logement-text'>
          <div className='logement-situation'>
            <div className='logement-title'>{selectedLocation.title}</div>
            <div className='city'>{selectedLocation.location}</div>
            <div className='tags'>
              {selectedLocation.tags?.map((tag, index) => (
                <div key={index} className="tag">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='logement-info'>
          <div className='author-card'>
            <div className='author'>{selectedLocation.host?.name || "Nom inconnu"}</div>
            <img
              src={selectedLocation.host?.picture || "default.jpg"}
              className='author-img'
              alt="Hôte"
            />
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
          {isDescOpen && (
            <div className="menu-deroulant open">
              <div className="fiche-texts">{selectedLocation.description}</div>
            </div>
          )}
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
          {isEquipOpen && (
            <div className="menu-deroulant open">
              <ul className="equipments-list">
                {selectedLocation.equipments?.map((item, index) => (
                  <li key={index} className="equipment-item">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
