import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import * as api from '../../client/api'
import { StartingData } from '../../shared/model/game'
import Chat from '../chat/Chat'
import Items from '../items/Items'
import { KnownItem } from "../../shared/model/item"

const Game = () => {
    const [data, setData] = useState<StartingData | null>(null)

    useEffect(() => {
        api.getStartingData(data => {
            console.log(data)
            setData(data)
        })
    }, [])

    function getKnownItems(items: string[]): KnownItem[] {
        return items.map(item => { 
            return (
                {  
                    type: 'known-item',
                    name: item
                }
            )
        })
    }

    if (data) {

        return (
            <div className='game'>
               ingame
               <Chat />
               <div>
                    All Items:
                    <Items items={getKnownItems(data.allItems)}/>
               </div>

               <div>
                    My Items:
                    <Items items={data.items}/>
               </div>

               <div>
                    Needed Items:
                    <Items items={getKnownItems(data.neededItems)}/>
               </div>
            </div>
         )
    } else {
        return null
    }

}

export default Game
