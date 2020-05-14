import * as React from 'react'
import Author from './Author'

const About = () => {
    return (
        <div className='landing-page__about'>
            <h2 className='landing-page__heading'>Check us out</h2>
                
            <div className='landing-page__authors-container'>
                <Author 
                    name='Filip A. Kowalski'  
                    socialLinks={[
                        {
                            url: 'http://ideasalmanac.com',
                            icon: 'fa fa-globe-africa'
                        },
                        {
                            url: 'https://twitter.com/IdeasAlmanac',
                            icon: 'fab fa-twitter'
                        },
                        {
                            url: 'https://github.com/Voycawojka',
                            icon: 'fab fa-github'
                        }
                    ]} 
                />
                <Author 
                    name='Dominik Józefiak'  
                    socialLinks={[
                        {
                            url: 'https://github.com/domlj',
                            icon: 'fab fa-github'
                        }
                    ]} 
                />
            </div>
        </div>
    )
}

export default About
