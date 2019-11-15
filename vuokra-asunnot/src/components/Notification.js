import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (!notification.message) {
    return null
  }
  const notificationType = notification.type === 'success' ? '' : 'notification--error' 

  return (
    <div className={`notification ${notificationType}`}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)