import React from 'react'
import './appbutton.css'
const AppButton = ({name, color, size, widthFit, className, onClick, type}) => {
  let widthFitClass
  if(widthFit){
    widthFitClass = 'app-button__width-fit'
  }else{
    widthFitClass = ''
  }
  return (
    <button className={`app-button f-larger fw-bold ${widthFitClass} cap ${className}`}
    style={{backgroundColor:color}} onClick={onClick} type={type}>{name}</button>
  )
}

export default AppButton