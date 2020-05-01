import * as React from 'react'

export interface Social {
    icon: string,
    url: string
}

const SocialIcon = (
    props: {
        social: Social
    }
) => {

    return (
        <a className='landing-page__social-icon' href={props.social.url}>
            <i className={props.social.icon}></i>
        </a>
    )
}

export default SocialIcon
