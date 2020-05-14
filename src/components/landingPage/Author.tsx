import * as React from 'react'
import SocialIcon, { Social } from './SocialIcon'

const Author = (
    props: {
        name: string,
        socialLinks: Social[]
    }
) => {

    const renderSocial = props.socialLinks.map(social =>
        <SocialIcon social={social} key={social.icon} />
    )

    return (
        <div className='landing-page__author'>
            <h3 className='landing-page__author-name'>{props.name}</h3>
            <div className='landing-page__author-social'>
                {renderSocial}
            </div>
        </div>
    )
}

export default Author
