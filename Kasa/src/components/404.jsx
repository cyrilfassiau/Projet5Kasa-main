import { NavLink } from "react-router";
export default function ErrorContent () {

return (

    <section>
    <div className="error-block">
    <div className="error-404">
        404
    </div>
    </div>
    <div className="oups">Oups! La page que vous demandez n'existe pas.</div>
<div className="back"><NavLink
              to="/"
              
              
            >
              Retourner sur la page d'accueil
            </NavLink></div>
    </section>



)


}