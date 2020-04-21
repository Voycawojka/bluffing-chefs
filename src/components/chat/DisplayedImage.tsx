import * as React from 'react'

const DisplayedImage = (
    props: {
        name: string
    }
) => {

    return (
        <img 
            className="displayed-image" 
            src="https://preview.pixlr.com/images/800wm/100/1/1001468329.jpg" 
            alt={props.name}
            title={props.name}
        />
    )
}

export default DisplayedImage
