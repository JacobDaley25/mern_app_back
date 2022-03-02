import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newWatered, setNewWatered] = useState(false)
  const [plants, setPlants] = useState([])
  const [newCheck, setNewCheck] = useState(false)

  useEffect(()=>{
    axios
      .get('https://plantwateringapi.herokuapp.com/plants')
      .then((response)=>{
        setPlants(response.data)
    })
  }, [])

  const handleNewFormSubmit = (event) => {
    event.preventDefault();
    axios.post(
      'https://plantwateringapi.herokuapp.com/plants',
      {
        name: newName,
        image: newImage,
        description: newDescription,
        wasWatered: newWatered
      }).then((response)=>{
        axios
          .get('https://plantwateringapi.herokuapp.com/plants')
          .then((response)=>{
            setPlants(response.data)
        })
    })
  }

  const handleDelete = (plantData) => {
    axios
      .delete(`https://plantwateringapi.herokuapp.com/plants/${plantData._id}`)
      .then(() => {
          axios
            .get('https://plantwateringapi.herokuapp.com/plants')
            .then((response) => {
              setPlants(response.data)
            })
      })
  }

  const handleToggleWatered = (plantData) => {
    axios
      .put(`https://plantwateringapi.herokuapp.com/plants/${plantData._id}`,
        {
          name: plantData.name,
          image: plantData.image,
          description: plantData.description,
          wasWatered:!plantData.wasWatered
        }
      )
      .then(() => {
        axios
          .get('https://plantwateringapi.herokuapp.com/plants')
          .then((response) => {
            setPlants(response.data)
          })
      })
  }

  const changeNewCheck = () => {
    setNewCheck(true)
  }

  const closeNewCheck = () => {
    setNewCheck(false)
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewImageChange = (event) => {
    setNewImage(event.target.value)
  }
  const handleNewDescriptionChange = (event) => {
    setNewDescription(event.target.value)
  }
  const handleNewWateredChange = (event) => {
    setNewWatered(event.target.checked)
  }

  return (
    <div>
    <h1>Plants In My Garden</h1>
    <section>
      <h2>Add a New Plant</h2>
      <button onClick={ (event) => {
        changeNewCheck(plants)}}>Add A New Plant</button>
        <button onClick={ (event) => {
          closeNewCheck(plants)}}>Close</button>
      {newCheck ? (<form className="form" onSubmit={handleNewFormSubmit}>
        Name: <input type="text" onChange={handleNewNameChange}/><br/>
        Image: <input type="text" onChange={handleNewImageChange}/><br/>
        Description: <input type="text" onChange={handleNewDescriptionChange}/><br/>
        Watered: <input type="checkbox" onChange={handleNewWateredChange}/><br/>
        <input type="submit" value="Add Plant"/>
      </form>) : null
      }
    </section>
    <section>
    <h2>Your Plants!</h2>
    <div className="cardgrid">
      {
        plants.map((plant)=>{
          return <div className="plantcard" key={plant._id}>
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <p onClick={ (event)=>{ handleToggleWatered(plant) }}>
            {
              (plant.wasWatered)?
                'needs water'
                :
                'does not need water'
            } <br/>
            </p>
            <img className="plantimg" src={plant.image}/><br/>
            <button onClick={ (event)=>{ handleDelete(plant) } }>Delete Plant</button>
          </div>
        })
      }
      </div>
    </section>
  </div>
)}

export default App
