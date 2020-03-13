import React, { useState } from 'react'
import { dynamicPairsHetero, dynamicPairsHomo,
         dynamicGroupsHetero, dynamicGroupsHomo } from '../../actions/studentActions.js'
import { hideRatings, showRatings, showBehavior,
         hideBehavior, showAcademics, hideAcademics } from '../../actions/optionActions.js'
import { connect } from 'react-redux'


const GearMenu = ({ open, currentKlass, currentGrouping, currentRatings,
                    dynamicPairsHetero, dynamicPairsHomo,
                    dynamicGroupsHetero, dynamicGroupsHomo,
                    showBehavior, hideBehavior, showAcademics, hideAcademics,
                    hideRatings, showRatings, students }) => {

  const [groupSize, setGroupSize] = useState(4)
  const [groupingType, setGroupingType] = useState('Heterogenous')
  const [groupBy, setGroupBy] = useState('Academics')

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

  return (
    <div className={`gear-menu ${open ? 'slide' : ''}`}>
      <div className="gear-title">
        <strong>{`Generate ${currentGrouping === 'Pairs' ? 'Pairs' : 'Groups'}`}</strong>
      </div>
      <div className="options">
        {currentGrouping === "Pairs" ? renderPairMenu() : renderGroupMenu()}
      </div>
      <div className="other-options">
        <input
          type='checkbox'
          name='ratings'
          onChange={() => {
            currentRatings ? hideRatings() : showRatings()
          }}
          checked={currentRatings}
          value={currentRatings} />Show Ratings
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentKlass: state.currentKlass.klass,
    currentGrouping: state.currentKlass.grouping,
    currentRatings: state.currentKlass.ratings,
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dynamicPairsHetero: (klass, groupBy) => dispatch(dynamicPairsHetero(klass, groupBy)),
    dynamicPairsHomo: (klass, groupBy) => dispatch(dynamicPairsHomo(klass, groupBy)),
    dynamicGroupsHetero: (klass, size, groupBy) => dispatch(dynamicGroupsHetero(klass, size, groupBy)),
    dynamicGroupsHomo: (klass, size, groupBy) => dispatch(dynamicGroupsHomo(klass, size, groupBy)),
    hideRatings: () => dispatch(hideRatings()),
    showRatings: () => dispatch(showRatings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearMenu)
