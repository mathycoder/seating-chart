import React from 'react'
import { dynamicPairsHetero, dynamicPairsHomo } from '../../actions/studentActions.js'
import { hideRatings, showRatings } from '../../actions/optionActions.js'
import { connect } from 'react-redux'


const GearMenu = ({ open, currentKlass, currentGrouping, currentRatings,
                    dynamicPairsHetero, dynamicPairsHomo,
                    hideRatings, showRatings }) => {

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

  return (
    <div className={`gear-menu ${open ? 'slide' : ''}`}>
      <div className="gear-title">
        <strong>{`Flexible ${currentGrouping === 'Pairs' ? 'Pairs' : 'Groups'} Menu`}</strong>
      </div>
      <div className="options">
        {currentGrouping === "Pairs" ? renderPairMenu() : null}
        <input
          type='checkbox'
          name='ratings'
          onChange={() => {
            currentRatings ? hideRatings() : showRatings()
          }}
          value={currentRatings} />Show Ratings
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentKlass: state.currentKlass.klass,
    currentGrouping: state.currentKlass.grouping,
    currentRatings: state.currentKlass.ratings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dynamicPairsHetero: klass => dispatch(dynamicPairsHetero(klass)),
    dynamicPairsHomo: klass => dispatch(dynamicPairsHomo(klass)),
    hideRatings: () => dispatch(hideRatings()),
    showRatings: () => dispatch(showRatings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearMenu)
