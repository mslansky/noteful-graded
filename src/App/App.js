import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers'
import './App.css'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import ErrorBoundary from '../ErrorBoundary'

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount () {
    const url = 'http://localhost:9090/folders'
    fetch(url)
      .then(response => response.json())
      .then(apiFolders => this.setState({folders: apiFolders}))

    const api = 'http://localhost:9090/notes'
    fetch(api)
      .then(response => response.json())
      .then(apiNotes => this.setState({notes: apiNotes}))
  }

  renderNavRoutes () {
    const {notes, folders} = this.state
    return (
      <ErrorBoundary>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const {noteId} = routeProps.match.params
            const note = findNote(notes, noteId) || {}
            const folder = findFolder(folders, note.folderId)
            return <NotePageNav {...routeProps} folder={folder} />
          }}
        />
      </ErrorBoundary>
    )
  }

  renderMainRoutes () {
    const {folders, notes} = this.state
    return (
      <ErrorBoundary>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const {folderId} = routeProps.match.params
              const notesForFolder = getNotesForFolder(
                notes,
                folderId
              )
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                />
              )
            }}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const {noteId} = routeProps.match.params
            const note = findNote(notes, noteId)
            return <NotePageMain {...routeProps} note={note} />
          }}
        />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" render={routeProps => {
          return <AddNote folders={folders} />
        }}/>
      </ErrorBoundary>
    )
  }

  render () {
    return (
      <div className="App">
        <nav className="App__nav">{this.renderNavRoutes()}</nav>
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link>{' '}
            <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <main className="App__main">{this.renderMainRoutes()}</main>
      </div>
    )
  }
}

export default App
