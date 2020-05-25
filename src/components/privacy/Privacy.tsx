import * as React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { registerPageView } from '../../utils/analytics'

const Privacy = () => {
    useEffect(() => registerPageView('policy'), [])

    return (
        <div className='privacy'>
            <h2 className='privacy__heading'>
                Privacy And Cookie Policy
            </h2>

            <h3 className='privacy__content-heading'>Data Collection</h3>
            <p className='privacy__content'>
                Bluffing Chefs doesn't collect any personal information. 
                All the in-game chat messages are stored on the server only for the duration of the match.
            </p>

            <h3 className='privacy__content-heading'>Cookies</h3>
            <p className='privacy__content'>
                Cookies are small pieces of data stored on the user's device that websites can read and write. 
                You can read more about cookies at
                <a 
                    className='privacy__link privacy__link--in-text' 
                    href='http://www.whatarecookies.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    http://www.whatarecookies.com
                </a>. 
                Bluffing Chefs uses cookies for the following purposes:
                <ul>
                    <li>better user experience - e.g. to remember the user's nickname between sessions</li>
                    <li>analytics - to provide us (creators) with a better understanding of our user base. Read more about it in the "Google Analytics" section</li>
                </ul>
                You can disabled cookies in your browser's settings, if you want to opt out of those features.
            </p>

            <h3 className='privacy__content-heading'>Google Analytics</h3>
            <p className='privacy__content'>
                We use Google Analytics to analyze the traffic and better understand how the players interact with the game. 
                It's a web traffic analysis service provided by Google. 
                Google Analytics collect statistics such as geographical location of visitors, average time on the site, traffic and other important metrics. 
                In order to do this, it uses cookies (see the "Cookies" section).
            </p>
            <p className='privacy__content'>
                Bluffing Chefs have Google Analytics set up such that it doesn't collect any personal information. 
                User's IP addresses are anonymized in such a way they can only provide information about the user's country (and not state/province or city).
            </p>
            <p className='privacy__content'>
                If you want to opt out of Google Analytics but do not want to disable cookies, you can install the 
                <a 
                    className='privacy__link privacy__link--in-text' 
                    href='https://tools.google.com/dlpage/gaoptout/'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    browser plugin developed by Google
                </a>. 
            </p>

            <h3 className='privacy__content-heading'>Disclaimer</h3>
            <p className='privacy__content'>
                Note that the Privacy And Cookie Policy can change at any time without notice.
            </p>

            <Link to='/' className='privacy__link'>Go back</Link>
        </div>
    )
}

export default Privacy
