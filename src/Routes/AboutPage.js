import React from 'react'
import { Link} from 'react-router-dom'
export const AboutPage = () => {
  return (
    <div>
      <div className="hero min-h-screen" style={{"backgroundImage": "url(https://i.imgur.com/q3DSXrL.jpg)"}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">AboutPage</h1>
            <p className="mb-5">The purpose of this application is to allow users to document the habitat they are in. They can create reports with images and an interactive map will be automaticly added. This will allow users to keep track of any wildlife or nature they encounter, what they seen and where they seen it. </p>
            <Link to='/createreport' className='btn btn-primary btn-sm mr-10 rounded-btn'>
               Create A Report Now
              </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
