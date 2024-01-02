import React from 'react'
import './sidenavfilter.css'
import CheckBoxFilter from './checkboxfilter/CheckBoxFilter'
const SideNavFilter = ({className}) => {
  return (
    <ul className={`${className} sidenavfilter__main-ul`}>
        <li>
            <ul>
                <li>category</li>
                <li>category</li>
                <li>category</li>
                <li>category</li>
            </ul>
        </li>
        <li>
            <CheckBoxFilter/>
        </li>
        <li>
            <ul>
                <li>category</li>
                <li>category</li>
                <li>category</li>
                <li>category</li>
            </ul>
        </li>
    </ul>
  )
}

export default SideNavFilter