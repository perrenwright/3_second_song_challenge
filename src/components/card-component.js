import React from 'react';
import {Button} from '@material-ui/core';

function CardComponent(props) {

    return ( 
        <div>
            <Button><img src={props.image} alt={props.name} /></Button>
            <h3>{props.name}</h3>
            <h4>Created by {props.creator}</h4>
        </div>

    )
}
export default CardComponent;