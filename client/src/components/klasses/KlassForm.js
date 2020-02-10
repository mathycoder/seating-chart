import React, { useState } from 'react'
import './css/klassForm.css'

const KlassForm = () => {
  const [name, setName] = useState('')
  const [period, setPeriod] = useState(1)

  return (
    <div className="klass-form klass-row">
      <div>
        <select name="period" onChange={(e) => setPeriod(e.target.value)}>
          {[1,2,3,4,5,6,7,8,9].map(prd => (
            <option selected={ prd === period ? 'selected' : '' } value={prd}>{prd}</option>
          )) }
        </select>
      </div>

      <div>
        <input
          type="text"
          placeholder="Class Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <button className="myButton">Add</button>
      </div>
    </div>
  )
}

export default KlassForm
