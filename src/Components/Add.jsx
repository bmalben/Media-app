import React, { useState } from 'react'
import {Button, FloatingLabel, Form, Modal} from 'react-bootstrap'
import {MDBIcon} from 'mdb-react-ui-kit'
import {uploadVideoAPI} from '../../service/allAPI'

function Add({setUploadVideoResponse}) {

  const[uploadVideo,setUploadVideo]=useState({
    id:"",caption:"",url:"",link:""
  })

  const getYoutubeLink=(e)=>{
    const {value}=e.target
    if(value.includes("v=")){
      let vID=value.split("v=")[1].slice(0,11)
      console.log(`https://www.youtube.com/embed/${vID}`);
      setUploadVideo({...uploadVideo,link:`https://www.youtube.com/embed/${vID}`});
      
    }
    else{
      setUploadVideo({...uploadVideo,link:""});
    }
  }

  const handleAdd=async()=>{
    const {id,caption,url,link}=uploadVideo

    if(!id || !caption || !url  || !link){

      alert("Please fill all fields");
    }else{
      // Store the videos in JSON server
      const result=await uploadVideoAPI(uploadVideo)
      console.log(result);

      if(result.status>=200&&result.status<=300){
        // Success
        handleClose()
        alert("Uploaded Successfully")
          // After getting success response field should be empty
          setUploadVideo({
            id:"",caption:"",url:"",link:""
          })
          setUploadVideoResponse(result.data)
      }else{
        console.log(result.message);
        
      }
      
    }
  }

  console.log(uploadVideo);
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);

  
  return (
    <>
      <div className="d-flex align-items-center">
        <h5></h5>
        
        <Button variant="primary" className='btn1' onClick={handleShow}>
        Upload Videos{' '}<MDBIcon fas icon="cloud-upload-alt" />
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>


        <FloatingLabel
        controlId="floatingInput"
        label="Video Id"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Video Id" onChange={(e)=>setUploadVideo({...uploadVideo,id:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTitle" label="Video Title">
        <Form.Control type="text" placeholder="Video Title" onChange={(e)=>setUploadVideo({...uploadVideo,caption:e.target.value})} />
      </FloatingLabel>

        <FloatingLabel
        controlId="floatingInput"
        label="Image URL"
        className="mb-3 mt-3"
      >
        <Form.Control type="text" placeholder="Image URL" onChange={(e)=>setUploadVideo({...uploadVideo,url:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingUrl" label="Video URL">
        <Form.Control type="text" placeholder="Video URL" onChange={getYoutubeLink} />
      </FloatingLabel>


          </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  )
}

export default Add
