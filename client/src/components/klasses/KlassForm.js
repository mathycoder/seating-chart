import React, { useState, useEffect } from 'react'
import { addKlass, updateKlass, deleteKlass } from '../../actions/klassActions.js'
import { connect } from 'react-redux'
import './css/klassForm.css'

const KlassForm = ({ addKlass, updateKlass, deleteKlass, klass, setEditKlassId, displayFormSet }) => {
  const [name, setName] = useState('')
  const [period, setPeriod] = useState(1)

  useEffect(() => {
    if (klass){
      setName(klass.name)
      setPeriod(klass.period)
    }
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    const params = {
      klass: {
        name: name,
        period: period
      }
    }
    if (klass){
      updateKlass(params, klass)
      setEditKlassId(null)
    } else {
      addKlass(params)
      displayFormSet(false)
    }
  }

  const handleDelete = () => {
    deleteKlass(klass)
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
        <input className="myButton" type="submit" value={klass ? 'Update' : 'Add'}/>
        { klass ? <button className="myButton" onClick={() => handleDelete()}>Delete</button> : null }
      </div>
    </form>
  )
}

function mapDispatchToProps(dispatch){
  return {
    addKlass: (klassData) => dispatch(addKlass(klassData)),
    updateKlass: (klassData, klass) => dispatch(updateKlass(klassData, klass)),
    deleteKlass: (klass) => dispatch(deleteKlass(klass))
  }
}

export default connect(null, mapDispatchToProps)(KlassForm)
