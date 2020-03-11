import React from 'react'
import { dynamicPairs } from '../../actions/studentActions.js'
import { connect } from 'react-redux'


const GearMenu = ({ open, currentKlass, currentGrouping, dynamicPairs }) => {
  return (
    <div className={`gear-menu ${open ? 'slide' : ''}`}>
      <div className="gear-title">Flexible Grouping Menu</div>
      <div className="options">
        {currentGrouping === "Pairs"
          ? <button
              className="myButton"
              onClick={() => dynamicPairs(currentKlass)}
            >
              Heterogenous
            </button>
          : null
        }
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
    dynamicPairs: klass => dispatch(dynamicPairs(klass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearMenu)
