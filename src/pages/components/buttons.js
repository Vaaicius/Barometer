import React from 'react'

const Buttons = (props) => {
  const onHandleclickedCity = (e) => {
    const clickedCity = e.target.value
    props.onClickedCity(clickedCity)
  }

  return (
    <div className='threeButtons-container'>
        <button className='btn btn2' onClick={onHandleclickedCity} value='Vilnius'>Vilnius</button>
        <button className='btn btn3' onClick={onHandleclickedCity} value='Nida'>Nida</button>  
    </div>
  )
}

export default Buttons