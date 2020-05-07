import * as React from 'react'

const DisplayItem = (
    props: {
        item: string
    }
) => {
    return (
        <div className='items__item items__item--display'>
            <p className='items__item-label'>{props.item}</p>
            
            {/* TODO image */}
            <img className='items__item-image' src='' />
            
        </div>
    )
}

export default DisplayItem
