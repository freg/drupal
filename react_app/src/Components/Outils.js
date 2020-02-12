import React from 'react'
import {Link} from "react-router-dom";

/**TODO: Faire passer l'id de la node à "Outils", et renvoyer vers "Présentation" si l'utilisateur clique.
 *
 *
 *
 * */
const Outil = (props) => {
    return (
      <Link className={"outil whiteText"} to={'/outil?id=' + props.id + '&type=' + props.type}>
            <div className={"outilImageTitre"}>
                <img src={"http://localhost:8900" + props.urlImage}/>
                {/*
                <div className={"outilImageContainer whiteText"}>

                    <IconContext.Provider value={{className: "outilIcone"}}>
                        <div>
                            <AiOutlineUser/>
                        </div>
                    </IconContext.Provider>

                </div>
                */}
                <div className={"outilTitre"}>
                    <h3 className={"bold majuscule"}> {props.titre}</h3>
                </div>
            </div>
            <div className={"outilDescription lessImportantText"}>
                <p>{props.description}</p>
            </div>

        </Link>
    );
}

export default Outil
