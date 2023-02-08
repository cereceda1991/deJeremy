import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/residentInfo.css'

const ResidentInfo = ({ url }) => {

  const [character, setCharacter] = useState()

  useEffect(() => {
    axios.get(url)
      .then(res => setCharacter(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <article className='resident_info'>
      <header className='header'>
        <img className='character_img' src={character?.image} alt="" />
        <div className={`status_container ${character?.status}_Shadow`}>
          <span className={`status_circle ${character?.status}`}></span>
          <span className='character_status'>{character?.status}</span>
        </div>
      </header>

      <section className='character_body'>
        <h3 className='character_name'>{character?.name}</h3>
        <hr />

        <ul className='character_info'>
          <li className='character_item'>
            <span className='character_label'>Specie: </span>
            {character?.species}
          </li>

          <li className='character_item'>
            <span className='character_label'>Gender: </span>
            {character?.gender}
          </li>

          <li className='character_item'>
            <span className='character_label'>Origin: </span>
            {character?.origin.name}
          </li>

          <li className='character_item'>
            <span className='character_label'>Episodes where appear: </span>
            {character?.episode.length}
          </li>
        </ul>
      </section>
    </article>
  )
}

export default ResidentInfo