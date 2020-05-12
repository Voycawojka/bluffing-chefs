import * as React from 'react'
import { Victor } from '../../shared/model/game'
import DisplayItem from '../items/DisplayItem'

const Victor = (
    props: {
        data: Victor
    }
) => {
    const renderItems = props.data.neededItems.map((item, index) => 
        <DisplayItem item={item} key={index} />
    )

    return (
        <div className='end-game__victor'>
            <p className='game__enemy-name'>{props.data.username}</p>
            <div className='end-game__victor-items'>
                {renderItems}
            </div>
        </div>
    )
}

export default Victor
