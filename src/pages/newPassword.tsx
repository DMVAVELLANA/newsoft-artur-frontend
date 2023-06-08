import { NextPage } from 'next'
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import {
  Button, Card, Col, Container, Form, InputGroup, Row,
} from 'react-bootstrap'
import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import axios from 'axios'

const NewPassword: NextPage = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const getRedirect = () => {
    const redirect = getCookie('redirect')
    if (redirect) {
      deleteCookie('redirect')
      return redirect.toString()
    }

    return '/'
  }

  const newPassword = async (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setSubmitting(true)

    const res = await axios.post('api/mock/login')
    if (res.status === 200) {
      router.push(getRedirect())
    }
    setSubmitting(false)
  }

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center background-theme">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="mb-4 rounded-0">
              <Card.Body className="p-4">
                <h1 className="text-center">New Password</h1>

                <form onSubmit={newPassword}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      required
                      disabled={submitting}
                      placeholder="Password"
                      aria-label="Password"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password_repeat"
                      required
                      disabled={submitting}
                      placeholder="Repeat password"
                      aria-label="Repeat password"
                    />
                  </InputGroup>

                  <Button type="submit" className="d-block w-100 theme-button" disabled={submitting} variant="primary">
                    Submit
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NewPassword
