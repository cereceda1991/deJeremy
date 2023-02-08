import React from 'react'
import './styles/locationInfo.css'

const LocationInfo = ({ infoLocation }) => {

  return (
    <article className='location'>
      <h3 className='info_name'> {infoLocation?.name}</h3>

      <ul className='location_info'>
        <li className='location_item'>
          <span className='info_label'>Id </span>
          {infoLocation?.id}
        </li>
        <li className='location_item'>
          <span className='info_label'>Type: </span>
          {infoLocation?.type}
        </li>


        <li className='location_item'>
          <span className='info_label'>Dimension: </span>
          {infoLocation?.dimension}
        </li>

        <li className='location_item'>
          <span className='info_label'>Population: </span>
          {infoLocation?.residents?.length}
        </li>
      </ul>
    </article>
  )
}

export default LocationInfo
