import React from 'react'

const GearMenu = ({ open }) => {
  return (
    <div className={`gear-menu ${open ? 'slide' : ''}`}>
      Gear Menu
    </div>
  )
}

export default GearMenu
