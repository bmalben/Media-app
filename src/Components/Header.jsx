import { MDBIcon } from 'mdb-react-ui-kit';
import React from 'react'
import { Navbar,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      {/* <h1>Head</h1> */}
      <Navbar lassName="bg-info">
        <Container>
          <Navbar.Brand className='fw-bolder' >
          <Link to={'/'} style={{textDecoration:"none"}}>
            {/* <i class="fa-solid fa-play fa-fade" style="color: #000000;"></i> */}
            <MDBIcon fas icon="cannabis" />
            Media-Player
          </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>

   
    </>
  )
}

export default Header
