import React, { useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import VideoCard from './VideoCard';
import { MDBIcon } from 'mdb-react-ui-kit';
import { addCategoryAPI, deleteCategoryAPI, getAVideoAPI, getCategoryAPI, updateCategoryAPI } from '../../service/allAPI';



function Category({dropVideoResponse}) {
  
  const[categoryName,setCategoryName]=useState("")
  const[allCategory,setAllCategory]=useState([])


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log(categoryName);
  const handleAdd=async()=>{
    if(categoryName){
      const result=await addCategoryAPI({categoryName,allVideos:[]})
      // console.log(result);

      if(result.status>=200&&result.status<300){
        handleClose()
        setCategoryName("")
        getCategory()
      }
      else{
        alert(result.message)
      }
    }
    else{
      alert("Please enter category name")
    }
  }

  const getCategory=async()=>{
    const{data}=await getCategoryAPI()
    setAllCategory(data)
  }

  useEffect(()=>{
    getCategory()
  },[dropVideoResponse])

  // console.log(allCategory);

  const deleteCategory=async(id)=>{
    await deleteCategoryAPI(id)
    getCategory()
  }

  const dragOver=(e)=>{
    console.log("Videocard is dragging over the category");
    e.preventDefault();
    
  }

  const videoDropped=async(e,CategoryId)=>{
    // event.preventDefault()
    const VideoId=e.dataTransfer.getData("VideoId")
    console.log("VideoId:"+VideoId+" Video dropped categoryId:"+CategoryId);
    const {data}=await getAVideoAPI(VideoId)
    // console.log(data);
    const selectedCategory=allCategory.find(x=>x.id===CategoryId)
    selectedCategory.allVideos.push(data)
    // console.log(selectedCategory);
    await updateCategoryAPI(CategoryId,selectedCategory)
    getCategory();
  }

  const videoDragStarted=async(e,VideoId,CategoryId)=>{
    let datashare={VideoId,CategoryId}
    e.dataTransfer.setData("data",JSON.stringify(datashare))
  }
  

  return (
    <>
      <div className="d-grid">
        <div className="btn btn-info" onClick={handleShow}>Add Category</div>
      </div>

{
  allCategory?.length>0?allCategory.map(Category=>(
    
    <div className="border rounded mt-5 p-3" onDragOver={(e)=>dragOver(e)} onDrop={e=>videoDropped(e,Category.id)}>
        <div className="d-flex justify-content-between align-items-center">
          <h5>{Category.categoryName}</h5>
          <button className='btn text-danger' style={{boxShadow:"none"}} onClick={()=>deleteCategory(Category.id)}><MDBIcon fas icon="trash" /></button>
        </div>
        
        <Row>
          {
            Category?.allVideos?.length>0?Category?.allVideos.map(card=>(
              <Col sm={12} draggable onDragStart={e=>videoDragStarted(e,card.id,Category.id)}>
              <VideoCard video={card} insideCategory={true}/>
              </Col>
            )):null
          }
        </Row>

      </div>
      )):<p className='fw-bolder text-danger'>Nothing to display</p>
}


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId="floatingName" label="Category" className="mb-3">
        <Form.Control type="text" placeholder="Category Name" onChange={e=>setCategoryName(e.target.value)} />
      </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Category
