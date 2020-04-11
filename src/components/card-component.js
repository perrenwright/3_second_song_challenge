import React from 'react';
import {Button} from '@material-ui/core';
import './card-component.css';
function CardComponent(props) {

    return ( 
        <div className='card-component'>
            <Button>
                <img 
                    className="playlist-image"
                    src={props.image} 
                    alt={props.name} />
            </Button>
            <h3 className='playlist-title'>{props.name}</h3>
            <h4 className='playlist-creator-text'>Created by {props.creator}</h4>
        </div>

    )
}
export default CardComponent;