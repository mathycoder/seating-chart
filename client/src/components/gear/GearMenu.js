import React, { useState } from 'react'
import { dynamicPairsHetero, dynamicPairsHomo,
         dynamicGroupsHetero, dynamicGroupsHomo } from '../../actions/studentActions.js'
import { hideRatings, showRatings } from '../../actions/optionActions.js'
import { connect } from 'react-redux'


const GearMenu = ({ open, currentKlass, currentGrouping, currentRatings,
                    dynamicPairsHetero, dynamicPairsHomo,
                    dynamicGroupsHetero, dynamicGroupsHomo,
                    hideRatings, showRatings, students }) => {

  const [groupSize, setGroupSize] = useState(4)

  const possibleGroups = () => {
    return [4,3,2,1].filter(size => students.allIds.length / size <= 8)
  }

  const renderPairMenu = () => {
    return (
      <>
        <button
            className="myButton"
            onClick={() => dynamicPairsHetero(currentKlass)}
          >
            Heterogenous
        </button>
        <button
            className="myButton"
            onClick={() => dynamicPairsHomo(currentKlass)}
          >
            Homogenous
        </button>
      </>
    )
  }


    const renderGroupMenu = () => {
      return (
        <>
          <button
              className="myButton"
              onClick={() => dynamicGroupsHetero(currentKlass, groupSize)}
            >
              Heterogenous
          </button>
          <button
              className="myButton"
              onClick={() => dynamicGroupsHomo(currentKlass, groupSize)}
            >
              Homogenous
          </button>
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
    dynamicPairsHetero: klass => dispatch(dynamicPairsHetero(klass)),
    dynamicPairsHomo: klass => dispatch(dynamicPairsHomo(klass)),
    dynamicGroupsHetero: (klass, size) => dispatch(dynamicGroupsHetero(klass, size)),
    dynamicGroupsHomo: (klass, size) => dispatch(dynamicGroupsHomo(klass, size)),
    hideRatings: () => dispatch(hideRatings()),
    showRatings: () => dispatch(showRatings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearMenu)
