import React, { useState, useCallback } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import useSpeechRecognition from '../hooks/useSpeechRecognition'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const [autoSubmit, setAutoSubmit] = useState(false)

  // Speech recognition hook
  const onResult = useCallback((transcript) => {
    setKeyword(transcript)
    setAutoSubmit(true)
  }, [])
  const { listening, start, stop, isSupported } = useSpeechRecognition({ onResult })

  // Submit handler
  const submitHandler = (e) => {
    if (e) e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
    setAutoSubmit(false)
  }

  // Auto-submit when speech result comes in
  React.useEffect(() => {
    if (autoSubmit && keyword) {
      submitHandler()
    }
    // eslint-disable-next-line
  }, [autoSubmit, keyword])

  return (
    <Form onSubmit={submitHandler} className="w-100">
      <InputGroup>
        <Form.Control
          type='text'
          name='q'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search for products...'
          aria-label="Search"
          className='border-0 shadow-sm'
          autoComplete="off"
        />
        {isSupported && (
          <Button
            type="button"
            variant={listening ? 'danger' : 'outline-secondary'}
            onClick={listening ? stop : start}
            aria-label={listening ? 'Stop voice search' : 'Start voice search'}
            className="border-0 shadow-sm"
            tabIndex={0}
          >
            {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </Button>
        )}
        <Button
          type='submit'
          variant='light'
          className='border-0 shadow-sm text-primary'
          aria-label="Search"
        >
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBox

