import * as React from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const CookiePopup = () => {
    const [isCookiesAcknowledged, setIsCookiesAcknowledged] = useState(false)
    
    useEffect(() => {
        setIsCookiesAcknowledged(Cookies.get('cookies-acknowledged') === 'true')
    }, [])

    function handleExit() {
        Cookies.set('cookies-acknowledged', 'true')

        setIsCookiesAcknowledged(true)
    }

    if (!isCookiesAcknowledged) {
        return (
            <div className='cookie-popup'>
                Hi, we use cookies. Read more in our 
                <Link to='/privacy' className='privacy__link privacy__link--in-text'>Privacy And Cookie Policy</Link>.
                <button 
                    className='cookie-popup__exit-button'
                    onClick={handleExit}
                >
                    <i className='fas fa-times'></i>
                </button>
            </div>
        )
    } else {
        return null
    }

}

export default CookiePopup
