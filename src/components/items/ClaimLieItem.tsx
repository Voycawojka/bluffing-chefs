import * as React from 'react'

const ClaimLieItem = (
    props: {
        item: string
        claimHandler: () => void
    }
) => {
    return (
        <div className='items__item items__item--display'>
            <p className='items__item-label'>{props.item}</p>
            <img className='items__item-image' src={`./assets/items/${props.item}.png`} />
            <button className='items__item-button' onClick={props.claimHandler}>lie</button>
        </div>
    )
}

export default ClaimLieItem
