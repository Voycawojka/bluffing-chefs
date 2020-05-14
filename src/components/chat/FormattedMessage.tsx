import * as React from 'react'
import { parse } from '../../utils/formatter/formatter'
import DisplayedBlock from './DisplayedBlock'

const FormattedMessage = (
    props: {
        msg: string
    }
) => {

    const content = parse(props.msg)

    const renderContent = content.map((msg, index) => <DisplayedBlock block={msg} key={index}/> )

    return (
        <>
            {renderContent}
        </>
    )
}

export default FormattedMessage
