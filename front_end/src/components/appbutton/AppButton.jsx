import React from 'react'
import './appbutton.css'
const AppButton = ({name, color, size}) => {
  return (
    <button className={`app-button f-larger fw-bold`}
    style={{backgroundColor:color}}>{name}</button>
  )
}

export default AppButton