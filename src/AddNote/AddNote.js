import React from 'react'
import './AddNote.css'
import PropTypes from 'prop-types'
import history from '../history'

const url = 'http://localhost:9090/notes'

export default class AddNote extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      folderId: '',
      content: ''
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
        .then(json => { history.goBack() })
    }

    return (
      <container className = "AddNote">
        <form onSubmit={handleSubmit}>
          <div className="NoteInput">
            <label htmlFor="new-note-button"> Add New Note
              <input type="text" name="new-note-button" value={this.state.name} onChange = {(evt) => { this.setState({name: evt.target.value}) }}/>
            </label>
            <div className="Notecontent">
              <label htmlFor="new-note-content"> Content :
                <textarea type="text" name="new-note-content" value={this.state.content} onChange = {(evt) => { this.setState({content: evt.target.value}) }}/>
              </label>
            </div>
            <select placeholder="Select Folder" value={this.state.folderId} onChange = {(evt) => { this.setState({folderId: evt.target.value}) }}>
              <option key="Select Folder">Select Folder</option>
              {this.props.folders.map((x) => {
                return (
                  <option key={x.id} value={x.id}> {x.name}</option>
                )
              })}
            </select>
            <input className="submit-button" type="submit" value="Submit" disabled={!(this.state.name.length > 0 && this.state.content.length > 3)}/>
          </div>
        </form>
      </container>
    )
  }
}

AddNote.propTypes = {
  folders: PropTypes.array.isRequired
}
