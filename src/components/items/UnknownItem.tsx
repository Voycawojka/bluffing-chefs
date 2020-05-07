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
            {/* TODO question mark image */}
            <img className='items__item-image' src='' />
            <button  
                className='items__item-exchange'
                disabled
            >
                exchange    
            </button>
        </div>
    )
}

export default UnknownItem
