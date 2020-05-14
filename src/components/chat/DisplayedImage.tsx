import * as React from 'react'

const DisplayedImage = (
    props: {
        name: string
    }
) => {

    return (
        <img 
            className="displayed-image" 
            src={`./assets/items/${props.name}.png`}
            alt={props.name}
            title={props.name}
        />
    )
}

export default DisplayedImage
