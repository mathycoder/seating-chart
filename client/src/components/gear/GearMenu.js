import React from 'react'
import { dynamicPairsHetero } from '../../actions/studentActions.js'
import { connect } from 'react-redux'


const GearMenu = ({ open, currentKlass, currentGrouping, dynamicPairsHetero }) => {

  const renderPairMenu = () => {
    return (
      <button
          className="myButton"
          onClick={() => dynamicPairsHetero(currentKlass)}
        >
          Heterogenous
      </button>
    )
  }


  return (
    <div className={`gear-menu ${open ? 'slide' : ''}`}>
      <div className="gear-title">
        {`Flexible ${currentGrouping === 'Pairs' ? 'Pairs' : 'Groups'} Menu`}
      </div>
      <div className="options">
        {currentGrouping === "Pairs" ? renderPairMenu() : null}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentKlass: state.currentKlass.klass,
    currentGrouping: state.currentKlass.grouping
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dynamicPairsHetero: klass => dispatch(dynamicPairsHetero(klass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearMenu)
