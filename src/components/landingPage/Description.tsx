import * as React from 'react'

const Description = () => {
    return (
        <div className='landing-page__description'>
            <h2 className='landing-page__heading'>How to play</h2>
            <p className='landing-page__description-content'>
                Gather all your needed ingredients by exchanging and lying about what you already have.
            </p>
            <ul className='landing-page__description-list'>
                <li className='landing-page__description-list-item'>
                    start with 5 items and a list of 4 you need to collect.
                </li>
                <li className='landing-page__description-list-item'>
                    chat with your opponents, bluff.
                </li>
                <li className='landing-page__description-list-item'>
                    trade... but are you sure this guy really has that mustard you need?
                </li>
            </ul>
        </div>
    )
}

export default Description
