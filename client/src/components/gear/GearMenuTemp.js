import React, { useState, useRef, useEffect } from 'react'
import { dynamicPairsHetero, dynamicPairsHomo,
         dynamicGroupsHetero, dynamicGroupsHomo } from '../../actions/studentActions.js'
import { showBehavior, hideBehavior,
         showAcademics, hideAcademics } from '../../actions/optionActions.js'
import { connect } from 'react-redux'


const GearMenu = ({ open, currentKlass, currentGrouping,
                    currentAcademics, currentBehavior,
                    dynamicPairsHetero, dynamicPairsHomo,
                    dynamicGroupsHetero, dynamicGroupsHomo,
                    showBehavior, hideBehavior, showAcademics, hideAcademics,
                    students }) => {

  const [groupSize, setGroupSize] = useState(4)
  const [groupingType, setGroupingType] = useState('Heterogenous')
  const [groupBy, setGroupBy] = useState('Academics')


  const refTypeDropdown = useRef()
  const refTypeButton = useRef()
  const [ typeDropdown, _setTypeDropdown ] = useState(false)
  const typeDropdownRef = React.useRef(typeDropdown);
    const setTypeDropdown = data => {
      typeDropdownRef.current = data;
      _setTypeDropdown(data);
    };

  const handleClick = (e) => {
    if (typeDropdownRef.current){
      if (refTypeDropdown.current.contains(e.target) || refTypeButton.current.contains(e.target)) { return }
      setTypeDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])



  const possibleGroups = () => {
    return [4,3,2,1].filter(size => students.allIds.length / size <= 8)
  }

  const handleSubmit = () => {
    if (currentGrouping === "Groups"){
      groupingType === 'Heterogenous'
        ? dynamicGroupsHetero(currentKlass, groupSize, groupBy)
        : dynamicGroupsHomo(currentKlass, groupSize, groupBy)
    } else {
      groupingType === 'Heterogenous'
        ? dynamicPairsHetero(currentKlass, groupBy)
        : dynamicPairsHomo(currentKlass, groupBy)
    }
  }

  const renderPairMenu = () => {
    return (
      <>
        {'Type: '}
        <select name="grouping"
          value={groupingType}
          onChange={(e) => setGroupingType(e.target.value)}
        >
          {['Heterogenous', 'Homogenous'].map(type => (
            <option key={type} value={type}>{type}</option>
          )) }
        </select>
        {'Group By: '}
        <select name="group-by"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
        >
          {['Academics', 'Behavior', 'Both'].map(type => (
            <option key={type} value={type}>{type}</option>
          )) }
        </select>
        <button
            className="myButton"
            onClick={() => handleSubmit()}
          >
            Generate
        </button>
        </>
    )
  }


    const renderGroupMenu = () => {
      return (
        <>
          <div
            className="dropdown-button"
            ref={refTypeButton}
            onClick={() => setTypeDropdown(!typeDropdown)}
          >
            Type: <strong>{` ${groupingType}`}</strong>
          </div>

          {'Group By: '}
          <select name="group-by"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            {['Academics', 'Behavior', 'Both'].map(type => (
              <option key={type} value={type}>{type}</option>
            )) }
          </select>
          <div>
            {'Group Size: '}
            <select name="group-size"
              value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)}
            >
              {possibleGroups().map(score => (
                <option key={score} value={score}>{score}</option>
              )) }
            </select>
            <button
                className="myButton"
                onClick={() => handleSubmit()}
              >
                Generate
            </button>
          </div>
        </>
      )
    }

    const renderTypeDropdown = () => {
      return (
        <div
          ref={refTypeDropdown}
          className={`dropdown-menu type-dropdown ${typeDropdown ? 'opened': 'closed'}`}>
          {
            ['Heterogenous', 'Homogenous'].map(type => {
              return (
                <div onClick={() => {
                    setTypeDropdown(false)
                    setGroupingType(type)
                  }}>
                  {type}
                </div>
              )
            })
          }
        </div>
      )
    }


    // <select name="grouping"
    //   value={groupingType}
    //   onChange={(e) => setGroupingType(e.target.value)}
    // >
    //   {['Heterogenous', 'Homogenous'].map(type => (
    //     <option key={type} value={type}>{type}</option>
    //   )) }
    // </select>

  return (
    <div className={`gear-menu ${open ? 'slide' : ''}`}>
      <div className="gear-title">
        <strong>{`Generate ${currentGrouping === 'Pairs' ? 'Pairs' : 'Groups'}`}</strong>
      </div>
      <div className="options">
        {currentGrouping === "Pairs" ? renderPairMenu() : renderGroupMenu()}
      </div>
      <div className="other-options">
        Display:
        <input
          type='checkbox'
          name='academics'
          onChange={() => {
            currentAcademics ? hideAcademics() : showAcademics()
          }}
          checked={currentAcademics}
          value={currentAcademics} />
        <span className="academic">Academic</span>

        <input
          type='checkbox'
          name='behavior'
          onChange={() => {
            currentBehavior ? hideBehavior() : showBehavior()
          }}
          checked={currentBehavior}
          value={currentBehavior} />
        <span className="behavior">Behavior</span>
      </div>
      {renderTypeDropdown()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentKlass: state.currentKlass.klass,
    currentGrouping: state.currentKlass.grouping,
    currentBehavior: state.currentKlass.behavior,
    currentAcademics: state.currentKlass.academics,
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dynamicPairsHetero: (klass, groupBy) => dispatch(dynamicPairsHetero(klass, groupBy)),
    dynamicPairsHomo: (klass, groupBy) => dispatch(dynamicPairsHomo(klass, groupBy)),
    dynamicGroupsHetero: (klass, size, groupBy) => dispatch(dynamicGroupsHetero(klass, size, groupBy)),
    dynamicGroupsHomo: (klass, size, groupBy) => dispatch(dynamicGroupsHomo(klass, size, groupBy)),
    hideAcademics: () => dispatch(hideAcademics()),
    showAcademics: () => dispatch(showAcademics()),
    hideBehavior: () => dispatch(hideBehavior()),
    showBehavior: () => dispatch(showBehavior()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearMenu)
