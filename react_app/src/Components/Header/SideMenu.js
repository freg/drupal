import React from 'react'
import Drawer from "@material-ui/core/Drawer"

const SideMenu = (props) => {
    /*if (props.show) {
        return (

            ReactDOM.createPortal(
                <React.Fragment>
                    <div className="modal-overlay" onClick={props.toggle}/>
                    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                        <div className="headerSideMenu grid">
                            <div className="modal-header">
                                <button type="button" className="modal-close-button" data-dismiss="modal"
                                        aria-label="Close" onClick={props.toggle}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {props.content(props.toggle)}
                        </div>
                    </div>
                </React.Fragment>, document.body)
          )
    } else {
        return null;
    }*/
    return (
    <Drawer anchor={"left"} open={props.show} onClose={props.toggle}>
      <>
        {props.content(props.toggle)}
      </>
    </Drawer>)
};

export default SideMenu;
