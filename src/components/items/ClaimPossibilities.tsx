import * as React from 'react'
import { useState, useContext } from 'react'
import { GameContext } from '../gameProvider/GameProvider'
import { KnownItem } from '../../shared/model/item'
import * as api from '../../client/api'
import ClaimLieItem from './ClaimLieItem'
import DisplayItem  from './DisplayItem'

const ClaimPossibilities = (
    props : {
        item: KnownItem,
        index: number,
        toggleDown: () => void
    }
) => {
    const gameContext = useContext(GameContext)

    function claim(asItem: string) {
        api.claimItem(props.index, asItem).then(() => props.toggleDown())
    }

    const possibleLies = [...new Set(gameContext.allItems)].filter(item => item !== props.item.name)

    const renderLiePossiblities = possibleLies.map((item, index) => 
        <ClaimLieItem item={item} claimHandler={() => claim(item)} key={index}/>
    )

    return (
        <div className='claim-possibilites'>
            <div className='claim-possibilites__content'>
                <p className='claim-possibilites__heading'>Claim</p>
                <div className='claim-possibilites__honest'>
                    <DisplayItem item={props.item.name} />
                    <button 
                        className='claim-possibilites__honest-button'
                        onClick={() => claim(props.item.name)}
                    >
                        be honest
                    </button>
                </div>
                <div className='claim-possibilites__lie'>{renderLiePossiblities}</div>

                <button className='claim-possibilites__exit' onClick={props.toggleDown}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    )
}

export default ClaimPossibilities
