import { useState } from "react";

export default function Collapse({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="fiche-menu" onClick={() => setIsOpen(!isOpen)}>
        <p>{title}</p>
        <img
          src="/src/assets/arrow.png"
          className={`arrow ${isOpen ? "rotate" : ""}`}
          alt="toggle"
        />
      </div>

      <div className={`menu-deroulant ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
}