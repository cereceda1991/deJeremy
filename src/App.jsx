import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './utils/getRandomLocation'
import loading from '/src/assets/loading.png'
import imageError from '/src/assets/imageError.png'

function App() {

  const [infoLocation, setInfoLocation] = useState();
  const [location, setLocation] = useState(getRandomLocation());
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [listLocation, setListLocation] = useState()
  const [isShow, setIsShow] = useState(false)
  const [getValue, setGetValue] = useState()


  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${location}`
    axios.get(url)
      .then(res => {
        setInfoLocation(res.data)
        setHasError(false)
        setIsShow(false)
      })
      .catch(err => {
        console.log(err)
        setHasError(true)
        setIsShow(false)
      })
      .finally(() => setTimeout(() => setIsLoading(false), 2000))

  }, [location])


  const handleSubmit = (e) => {
    e.preventDefault();
    setHasError(false)
    clearSelectValue()
    if (e.target.inputLocation.value === "0" || e.target.inputLocation.value.length === 0) {
      setHasError(true);
    } else {
      setLocation(e.target.inputLocation.value.trim());
      e.target.inputLocation.value = e.target.inputLocation.value.trim();
    }
  };


  const handleChange = e => {
    clearSelectValue()
    const inputValue = e.target.value.trim();
    if (inputValue) {
      const url = `https://rickandmortyapi.com/api/location/?name=${inputValue}`;
      axios.get(url)
        .then(res => setListLocation(res.data.results))
        .catch(err => console.log(err));
      setIsShow(true);
    } else {
      setListLocation([]);
      setIsShow(false);
    }
  };

  const handleFocus = e => {
    e.target.value = ""
  }

  const clearSelectValue = () => {
    setGetValue(null);
  };

  const handleClickList = (loc) => {
    setLocation(loc.id)
    setGetValue(loc.name)
  }

  return (
    <div className="App" onClick={() => setIsShow(false)}>
      {
        isLoading ?
          <div className='load_screen'>
            <img className='load_image' src={loading} alt="" />
          </div>
          :
          <>
            <div className='img_app'>
              <img className='logo' src="./assets/Rick_and_Morty.webp" alt="" />
            </div>
            <form className='form' onSubmit={handleSubmit}>
              <input
                className='form_input'
                id='inputLocation'
                value={getValue}
                type="text"
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder='Insert location o Name Location'
              />

              <button className='form_button' >Search</button>

              {isShow &&
                <ul className='suggestions' >
                  {
                    listLocation?.map(loc => (
                      <li className='list' onClick={() => handleClickList(loc)} key={loc.id}>{loc.name}</li>
                    ))
                  }
                </ul>
              }
            </form>
          </>
      }

      {
        hasError ?
          <div className='error'>
            <div className='text_error'>
              <i className='bx box_error bx-x'></i>
              <h2 className='tittle_error'>Hey! The information entered is incorrect</h2>
              <i className='bx box_error bx-x'></i>
            </div>

            <img className='imageError' src={imageError} alt="" />
          </div>
          :
          <>
            <div className='location_container'>
              <LocationInfo infoLocation={infoLocation} />
            </div>
            <div className='residents_container'>
              {
                infoLocation?.residents.map(url => (
                  <ResidentInfo
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>

          </>
      }
      <Footer />
    </div>
  )
}

export default App
