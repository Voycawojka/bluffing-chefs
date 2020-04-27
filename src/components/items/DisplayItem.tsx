import * as React from 'react'

const DisplayItem = (
    props: {
        item: string
    }
) => {


    return (
        //to be image and text display
        <p>
            { props.item }
        </p>
    )
}

export default DisplayItem
