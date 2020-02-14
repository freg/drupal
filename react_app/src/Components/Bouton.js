import React from 'react'
import {FaArrowRight} from 'react-icons/fa'


const Bouton = (props) => {
  var classeBouton = "";
  var click = null
  if (props.arrow) {
    classeBouton += " effect effect-1 "
  }
  if (props.type === "main") {
    classeBouton += " boutonActionPrincipal "
  }
  if (props.onClick) {
    click = props.onClick
  }
  var theme = {
    marginTop: props.marge,
    marginBottom: props.marge
  }
  if (props.modal) {
    theme.backgroundColor = "#0B1D51"
  }

  return (
    <button style={theme} className={classeBouton + "inBetween"} id={props.id} onClick={click}>
      {props.contenu}
      <div className={"arrowIcon"}><FaArrowRight/></div>
    </button>);


}
export default Bouton
