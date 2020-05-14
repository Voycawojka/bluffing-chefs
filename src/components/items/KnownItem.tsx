import * as React from 'react'
import { KnownItem } from '../../shared/model/item'
import * as api from '../../client/api'
import { useState, useContext } from 'react'
import { GameContext } from '../gameProvider/GameProvider'
import DisplayItem from './DisplayItem'
import ClaimPossibilities from './ClaimPossibilities'

const KnownItem = (
    props: {
        item: KnownItem,
        index: number
    }
) => {
    const [claimPossibilitiesVisible, setClaimPossibilitiesVisible ] = useState(false)

    return (
        <div className='items__item  items__item--player-item'>
            <p className='items__item-label'>{props.item.name}</p>
            <img className='items__item-image' src={`./assets/items/${props.item.name}.png`} />
            <button  
                onClick={() => setClaimPossibilitiesVisible(true)}
                className='items__item-button'
            >
                claim as
            </button>
            { 
                claimPossibilitiesVisible
            && <ClaimPossibilities item={props.item} index={props.index} toggleDown={() => setClaimPossibilitiesVisible(false)} /> 
            }
        </div>
    )
}

export default KnownItem
