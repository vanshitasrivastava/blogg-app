import React from 'react'
import ZKZg from '../images/ZKZg.gif'

export const Loader = () => {
  return (
     <div className="loader">
        <div className="loader__image">
            <img src={ZKZg} alt="" />
        </div>
     </div>
  )
}

export default Loader