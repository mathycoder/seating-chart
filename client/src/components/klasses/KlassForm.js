import React, { useState } from 'react'
import { addKlass } from '../../actions/klassActions.js'
import { connect } from 'react-redux'
import './css/klassForm.css'

const KlassForm = ({ addKlass }) => {
  const [name, setName] = useState('')
  const [period, setPeriod] = useState(1)

  const submitHandler = (e) => {
    e.preventDefault()
    const params = {
      klass: {
        name: name,
        period: period
      }
    }
    addKlass(params)
  }

  return (
    <form className="klass-form klass-row" onSubmit={(e) => submitHandler(e)}>
      <div>
        <select name="period" value={period} onChange={(e) => setPeriod(e.target.value)}>
          {[1,2,3,4,5,6,7,8,9].map(prd => (
            <option key={prd} value={prd}>{prd}</option>
          )) }
        </select>
      </div>

      <div>
        <input
          required
          type="text"
          placeholder="Class Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <input className="myButton" type="submit" value="Add"/>
      </div>
    </form>
  )
}

function mapDispatchToProps(dispatch){
  return {
    addKlass: (klassData) => dispatch(addKlass(klassData))
  }
}

export default connect(null, mapDispatchToProps)(KlassForm)
