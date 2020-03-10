import React from 'react'
import { connect } from 'react-redux'
import { flashDelete } from '../../actions/flashActions.js'
import './flash.css'

const FlashMessage = ({ flashMessage, flashDelete }) => {
  const handleXClick = event => {
    flashDelete()
  }

  const renderMessage = () => {
    return (
      <div className="flash-container">
        <div className="flash-x" onClick={() => handleXClick()}>
          x
        </div>
        <div className="flash-message">
          {flashMessage}
        </div>
      </div>
    )
  }

  return (
    <>
      {flashMessage ? renderMessage() : ''}
    </>
  )
}

function mapStateToProps(state){
  return {
    flashMessage: state.flashMessage
  }
}

function mapDispatchToProps(dispatch){
  return {
    flashDelete: () => dispatch(flashDelete())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage)
