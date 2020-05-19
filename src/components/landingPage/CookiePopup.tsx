import * as React from 'react'
import { Link } from 'react-router-dom'

const CookiePopup = () => {
    return (
        <div className='cookie-popup'>
            Hi, we use cookies. Read more in our 
            <Link to='/privacy' className='privacy__link privacy__link--in-text'>Privacy And Cookie Policy</Link>.
            <button className='cookie-popup__exit-button'>
                <i className="fas fa-times"></i>
            </button>
        </div>
    )
}

export default CookiePopup
