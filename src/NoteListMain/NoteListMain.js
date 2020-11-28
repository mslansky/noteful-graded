import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export default class NoteListMain extends React.Component {
  render () {
    return (
      <section className='NoteListMain'>
        <ul>
          {this.props.notes.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                refresh={this.props.refresh}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}

NoteListMain.defaultProps = {
  notes: []
}

NoteListMain.propTypes = {
  notes: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired
}
