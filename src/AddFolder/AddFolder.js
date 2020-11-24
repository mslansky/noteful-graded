import './AddFolder.css'
import React from 'react'
import history from '../history'
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
      const folderName = this.state
      const postJson = {name: folderName}
      fetch(url, {
        headers: {'Content-Type': 'application/json'},
        method: 'Post',
        body: JSON.stringify(postJson)
      })
        .then(response => response.json())
        .then(json => { history.goBack() })
    }

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-folder-button"> Add New Folder
          <input type="text" name="new-folder-button" value={this.state.name}/>
        </label>
        <input className="submit-button" type="submit" value="Submit"/>
      </form>
    )
  }
}
