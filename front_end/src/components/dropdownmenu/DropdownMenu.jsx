import React from 'react'
import {Plus} from 'react-bootstrap-icons'
import './dropdownmenu.css'

const toggleMenu = (name) => {
    const menu = document.getElementById(name)
    if (menu.offsetHeight === 0){
        menu.classList.add('h')
    }else {menu.classList.remove('h')}
}

const DropdownMenu = ({className, name, list}) => {
  return (
    <div className={`${className}`}>
        <p className='flex-group-between upper'><span className='cursor-pointer'>{name}</span>
                                                <Plus size={30}
                                                    className='dropdownmenu__plus cursor-pointer'
                                                    onClick={() => {toggleMenu (name)}}/></p>
        <ul className='dropdownmenu__ul' id={name}>
            {list.map(item => {
                return <li key={item}
                           className='text-muted f-small cap cursor-pointer'>{item}</li>
            })}
        <div className='b-bottom-white'/>
        </ul>
    </div>

  )
}

export default DropdownMenu