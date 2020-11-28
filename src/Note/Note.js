import React from 'react'
import {Link} from 'react-router-dom'
import {format} from 'date-fns'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Note.css'
import PropTypes from 'prop-types'

function deleteNote (props) {
  fetch(`http://localhost:9090/notes/${props.id}`, {method: 'DELETE'})
    .then(props.refresh)
    .catch(err => { console.log(err) })
}
// delete a note from the api when user clicks the trash icon

export default function Note (props) {
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={() => { deleteNote(props) }}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}

Note.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  modified: PropTypes.string
}
