import React from 'react'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError () {
    return {hasError: true}
  }

  render () {
    if (this.state.hasError) {
      return (
        <h2> There is an Error. Please refresh page.</h2>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.array.isRequired
}
