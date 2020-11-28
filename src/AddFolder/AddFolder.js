import './AddFolder.css'
import React from 'react'
import history from '../history'
import PropTypes from 'prop-types'
const url = 'http://localhost:9090/folders'

export default class AddFolder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  render () {
    const handleSubmit = (event) => {
      event.preventDefault()
      const postJson = this.state
      fetch(url, {
        headers: {'Content-Type': 'application/json'},
        method: 'Post',
        body: JSON.stringify(postJson)
      })
        .then(response => response.json())
        .then(json => { this.props.refresh(); history.goBack() })
        .catch(err => { console.log(err) })
    }

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-folder-button"> Add New Folder
          <input type="text" name="new-folder-button" defaultValue={this.state.name} onChange = {(evt) => { this.setState({name: evt.target.value}) }}/>
        </label>
        <input className="submit-button" type="submit" defaultValue="Submit" disabled={!(this.state.name.length > 0)}/>
      </form>
    )
  }
}

AddFolder.propTypes = {
  refresh: PropTypes.func.isRequired
}
