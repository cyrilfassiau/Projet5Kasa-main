import { useState } from "react";

export default function AboutContent() {
    const [openMenus, setOpenMenus] = useState({}); // Stocke l'état de chaque menu

    function toggleMenu(index) {
        setOpenMenus(function(prevState) {
            return {
                ...prevState,
                [index]: !prevState[index] // Inverse l'état du menu cliqué
            };
        });
    }

    const menus = [
        {
            title: "Fiabilité",
            content: "Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées par nos équipes."
        },
        {
            title: "Respect",
            content: "La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme."
        },
        {
            title: "Service",
            content: "Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous contacter si vous avez la moindre question."
        },
        {
            title: "Sécurité",
            content: "La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes."
        }
    ];

    return (
        <div className="propos-content">
            {menus.map((menu, index) => (
                <div key={index}>
                    <div className="propos-menu" onClick={() => toggleMenu(index)}>
                        <p>{menu.title}</p>
                        <img 
                            src="./src/assets/arrow.png" 
                            className={openMenus[index] ? "arrow rotate" : "arrow"} 
                            alt="toggle"
                        />
                    </div>
                    <div className={`menu-deroulant ${openMenus[index] ? "open" : "closed"}`}>
                        <div className="propos-texts">{menu.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
