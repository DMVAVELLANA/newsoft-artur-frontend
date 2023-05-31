import React from 'react'
import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="footer border-top px-sm-2 py-0 sticky-bottom py-2 px-sm-2 bg-light">
      <Container fluid className="align-items-center flex-column flex-md-row d-flex justify-content-between">
        <div className="ms-md-auto">
          Powered by&nbsp;
          <a
            className="text-decoration-none"
            href="https://www.newsoft.com.co/"
          >
            ARTUR
          </a>
          &nbsp;a product from&nbsp;
          <a
            className="text-decoration-none"
            href="https://www.newsoft.com.co/"
          >
            NEWSOFT
          </a>
        </div>
      </Container>
    </footer>
  )
}
