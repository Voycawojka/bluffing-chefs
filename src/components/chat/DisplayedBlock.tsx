import * as React from 'react'
import { TextBlock, Style } from '../../utils/formatter/formatter'
import DisplayedImage from './DisplayedImage'

const DisplayedBlock = (
    props: {
        block: TextBlock
    }
) => {

    const isImage = props.block.styles.includes(Style.itemAsset)

    const className = props.block.styles.map(style => Style[style]).join(' ')

    return (
        isImage 
            ? <DisplayedImage name={props.block.content}/>
            : <span className={className}>{props.block.content}</span>
    )
}

export default DisplayedBlock
