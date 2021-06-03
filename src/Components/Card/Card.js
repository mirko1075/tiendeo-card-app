import React from 'react';

export default function Card(props) {

    return (
        <div>
            <>
            <div>{props.title}</div>
            <div>{props.description}</div>
            </>
        </div>
    )
}
