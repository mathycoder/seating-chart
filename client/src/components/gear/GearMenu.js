import React, { useState } from 'react'
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
                    students, loading }) => {

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

  const renderTypeOption = () => (
    <div className="gear-option">
      <div className="label">Type</div>
      <select name="grouping"
        value={groupingType}
        onChange={(e) => setGroupingType(e.target.value)}
      >
        {['Heterogenous', 'Homogenous'].map(type => (
          <option key={type} value={type}>{`${type}`}</option>
        )) }
      </select>
    </div>
  )

  const renderGroupByOption = () => (
    <div className="gear-option">
      <div className="label">By</div>
      <select name="group-by"
        value={groupBy}
        onChange={(e) => setGroupBy(e.target.value)}
      >
        {['Academics', 'Behavior', 'Both'].map(type => (
          <option key={type} value={type}>{type}</option>
        )) }
      </select>
    </div>
  )

  const renderSizeOption = () => (
    <div className="gear-option">
      <div className="label">Group Size</div>
      <select name="group-size"
        value={groupSize}
        onChange={(e) => setGroupSize(e.target.value)}
      >
        {possibleGroups().map(score => (
          <option key={score} value={score}>{score}</option>
        )) }
      </select>
    </div>
  )

  const renderGenerateButton = () => (
    <div className="gear-option generate-button-div">
      <button
          className={`myButton little ${loading ? 'loading' : ''}`}
          onClick={() => handleSubmit()}
        >
          Generate
      </button>
      <div>
        <img className={`loading-wheel ${loading ? '' : 'hide'}`} src="/loading.png" alt="loading" />
      </div>
    </div>
  )

  const renderPairMenu = () => {
    return (
      <>
        {renderTypeOption()}
        {renderGroupByOption()}
        {renderGenerateButton()}
      </>
    )
  }


    const renderGroupMenu = () => {
      return (
        <>
          {renderTypeOption()}
          {renderGroupByOption()}
          {renderSizeOption()}
          {renderGenerateButton()}
        </>
      )
    }

  return (
    <div className={`gear-menu noselect ${open ? 'slide' : ''}`}>
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
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentKlass: state.currentKlass.klass,
    currentGrouping: state.currentKlass.grouping,
    currentBehavior: state.currentKlass.behavior,
    currentAcademics: state.currentKlass.academics,
    students: state.students,
    loading: state.students.loading
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
