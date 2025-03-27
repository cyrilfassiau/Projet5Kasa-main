import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";

export default function LogementBody() {
  const [selectedLocation, setData] = useState([]);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [isEquipOpen, setIsEquipOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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


  const toggleMenu = (menu) => {
    if (menu === "desc") {
      setIsDescOpen(!isDescOpen);
    } else if (menu === "equip") {
      setIsEquipOpen(!isEquipOpen);
    }
  };


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedLocation.pictures.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? selectedLocation.pictures.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='logement-body'>
       <div className="gallery">
        {selectedLocation.pictures && selectedLocation.pictures.length > 1 && (
          <>
            <img src='./src/assets/arrow-glr.png' className="arrow-c left-arrow" onClick={handlePrev} /> 
            
              <img
                className="gallery-img"
                src={selectedLocation.pictures[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
              />
             
              <div className="image-number">
                {currentIndex + 1}/{selectedLocation.pictures.length}
              </div>
            
            <img src='./src/assets/arrow-glr.png' className="arrow-c right-arrow" onClick={handleNext} /> 
          </>
        )}

        {selectedLocation.pictures && selectedLocation.pictures.length === 1 && (
        
            <img
              className="gallery-img"
              src={selectedLocation.pictures[0]}
              alt={`Image unique`}
            />
        
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
            <ul className="equipments-list">
              {selectedLocation.equipments?.map((item, index) => (
                <li key={index} className="equipment-item">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
