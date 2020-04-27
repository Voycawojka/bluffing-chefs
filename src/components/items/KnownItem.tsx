import * as React from 'react'
import { KnownItem } from '../../shared/model/item'
import * as api from '../../client/api'
import { useState, useContext } from 'react'
import { GameContext } from '../gameProvider/GameProvider'
import DisplayItem from './DisplayItem'

const KnownItem = (
    props: {
        item: KnownItem,
        index: number
    }
) => {
    const [claimPossibilitiesVisible, setClaimPossibilitiesVisible ] = useState(false)
    const gameContext = useContext(GameContext)

    function claim(asItem: string) {
        api.claimItem(props.index, asItem)
    }

    const renderClaimPossiblities = gameContext.allItems.map(item => 
        <div onClick={() => claim(item)}>
            <DisplayItem item={item} />
        </div>
    )

    return (
        <div className="items__item">
            {props.item.name}
            {
                claimPossibilitiesVisible && <div> {renderClaimPossiblities} </div>
            }
            <button onClick={() => setClaimPossibilitiesVisible(state => !state)}>claim</button>
        </div>
    )
}

export default KnownItem
