import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router";
import Collapse from "./Collapse";

export default function LogementBody() {
  const { id } = useParams();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        const logement = data.find((item) => item.id === id);
        setSelectedLocation(logement || false);
        setCurrentIndex(0);
      })
      .catch(() => setSelectedLocation(false));
  }, [id]);

  if (selectedLocation === null) {
    return <div>Chargement...</div>;
  }

  if (selectedLocation === false) {
    return <Navigate to="/error" replace />;
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % selectedLocation.pictures.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? selectedLocation.pictures.length - 1 : prev - 1
    );
  };

  return (
    <div className="logement-body">
      {/* ===== Galerie ===== */}
      <div className="gallery">
        {selectedLocation.pictures.length > 1 && (
          <>
            <img
              src="/src/assets/arrow-glr.png"
              className="arrow-c left-arrow"
              onClick={handlePrev}
              alt="précédent"
            />
            <img
              className="gallery-img"
              src={selectedLocation.pictures[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
            />
            <div className="image-number">
              {currentIndex + 1}/{selectedLocation.pictures.length}
            </div>
            <img
              src="/src/assets/arrow-glr.png"
              className="arrow-c right-arrow"
              onClick={handleNext}
              alt="suivant"
            />
          </>
        )}
        {selectedLocation.pictures.length === 1 && (
          <img
            className="gallery-img"
            src={selectedLocation.pictures[0]}
            alt="Image unique"
          />
        )}
      </div>

      {/* ===== Infos logement ===== */}
      <div className="logement-grp">
        <div className="logement-text">
          <div className="logement-situation">
            <div className="logement-title">{selectedLocation.title}</div>
            <div className="city">{selectedLocation.location}</div>
            <div className="tags">
              {selectedLocation.tags.map((tag, index) => (
                <div key={index} className="tag">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="logement-info">
          <div className="author-card">
            <div className="author">{selectedLocation.host.name}</div>
            <img
              src={selectedLocation.host.picture}
              className="author-img"
              alt="Hôte"
            />
          </div>
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`fa-solid fa-star ${
                  index < selectedLocation.rating ? "rated" : ""
                }`}
              ></i>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Description & Equipements ===== */}
      <div className="fiche-content">
        <div className="fiche-desc">
          <Collapse title="Description">
            <div className="fiche-texts">{selectedLocation.description}</div>
          </Collapse>
        </div>

        <div className="fiche-equip">
          <Collapse title="Équipements">
            <ul className="equipments-list">
              {selectedLocation.equipments.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Collapse>
        </div>
      </div>
    </div>
  );
}