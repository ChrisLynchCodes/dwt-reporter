import React from 'react'
import { GeoLocationDisplay } from '../Location/GeoLocationDisplay'
import {Link} from 'react-router-dom'




//TODO Display report title, description, timstamp, location, image, category, edit btn, delete btn (no seperate page for delete), 
export const ReportItem = ({ report }) => {

  return (
    <div className='flex flex-row'>
      
      <div>

        <h1 className='text-2xl basis-2 hover:basis-1/2'>Title: {report.title} </h1>
      
      </div>
      <div>
        <h1 className='text-2xl basis-1 hover:basis-1/2 '>Description: {report.description} </h1>
      </div>
      <div>
        <h1 className='text-2xl'>Title: {report.title} </h1>
      </div>
      <div>
        <h1 className='text-2xl'>Title: {report.title} </h1>
      </div>
      <div>
        <h1 className='text-2xl'>Title: {report.title} </h1>
      </div>
      {/* <div>
<h2 className='text-1xl'>Description: {report.description}</h2>
</div>
<div className='flex-auto w-70'>
<GeoLocationDisplay latitude={report.latitude} longitude={report.longitude} />
</div> */}




    </div>
  )
}
