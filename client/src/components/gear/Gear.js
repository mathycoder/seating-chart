import React, { useState, useEffect } from 'react'
import GearMenu from './GearMenu'
import './gear.css'

const Gear = ({ type }) => {
  const [open, setOpen] = useState(false)

  // useEffect(() => {
  //   return () => {
  //     setOpen(false)
  //   }
  // }, [])

  return (
    <div className="gear">
      <img
        className={`${open ? 'clock' : 'counterclock'}`}
        onClick={() => setOpen(!open)}
        src="/gear.png"
        alt="gear"
      />
      <GearMenu open={open}/>
    </div>
  )
}

export default Gear
