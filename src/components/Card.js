import React from 'react';
import {Button} from '@material-ui/core';
import './card.css';
import './card-component.css';



function Cardc(props) {

    return (
        <div>
                <div className='card-component'>
                    <Button>
                        <img
                            className="playlist-image"
                            src={props.image}
                            alt={props.name} />
                    </Button>
                </div>
        </div>

    )
}
export default Cardc;