import * as React from 'react'
import { UnknownItem } from '../../shared/model/item'

const UnknownItem = (
    props: {
        item: UnknownItem
    }
) => {


    return (
        <div className="items__item">
            <p className='items__item-label'>unknown</p>
            <img className='items__item-image' src='./assets/items/unknown.png' />
            <button  
                className='items__item-button'
                disabled
            >
                exchange    
            </button>
        </div>
    )
}

export default UnknownItem
