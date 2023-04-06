import { useEffect, useRef } from 'react'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorPage from '../pages/Error'
import useBookApi from '../hooks/useBookApi'
import useNotesApi from '../hooks/useNotesApi'
import type { Book } from '../types'
import Note from '../components/Note'
import NewNote from '../components/NewNote'

function BookDetails(props: Partial<Book>) {
  const { bookId } = useParams()
  if (!bookId) return <ErrorPage />

  const navigate = useNavigate()
  const { book, errorMsg: bookErrorMsg, getBook } = useBookApi()
  const { notes, errorMsg } = useNotesApi(bookId)

  useEffect(() => {
    if (!bookId) navigate('../')
    else {
      const invalidProps = !props.title || !props.author
      if (invalidProps) getBook(bookId)
    }
  }, [])

  // new note ref
  const newNoteRef = useRef<HTMLFormElement>(null)

  function saveNote() {
    console.log(newNoteRef)
  }

  return bookErrorMsg ? (
    <ErrorPage msg={bookErrorMsg} />
  ) : (
    <Container className='margins'>
      <Row>
        <Col />
        <Col sm='10' md='8'>
          <Row>
            <Col className='margin-start'>
              <b>{book?.title ?? props.title}</b>
            </Col>
            <Col> {book?.author ?? props.author}</Col>
          </Row>
        </Col>
        <Col />
      </Row>

      <Row>
        <Col />
        <Col className='bg-books' sm='10' md='8'>
          <ListGroup>
            {notes.map((note, key) => (
              <Note key={key} info={note} />
            ))}
            <NewNote ref={newNoteRef} />
          </ListGroup>
        </Col>
        <Col />
      </Row>

      <Row>
        <Col />
        <Col sm='10' md='8'>
          <Row>
            <Col className='margin-start'>{errorMsg}</Col>
            <Col className='text-end'>
              <Button onClick={saveNote}>Add new</Button>
            </Col>
          </Row>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default BookDetails
