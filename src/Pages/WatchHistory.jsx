import { MDBIcon } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistoryAPI, getHistoryAPI } from '../../service/allAPI'


function WatchHistory() {

  const [history,setHistory]=useState([])

  useEffect(()=>{
    getHistory()
  },[])

  const getHistory=async()=>{
    const result=await getHistoryAPI()
    console.log(result);
    if(result.status==200){
      setHistory(result.data)
    }else{
      console.log("API Failed");
      console.log(result.message);
      
    }
    
  }

  // console.log(history);
  
const removeHistory=async(id)=>{
  event.preventDefault()
  await deleteHistoryAPI(id)
  getHistory()
}

  return (
    <>
      <div className='container mt-5 mb-5 d-flex justify-content-between flex-wrap'>
        <h2>Watch History</h2>
        <Link to={'/Home'} style={{textDecoration:'none',color:'black',fontSize:'30px'}}>
          Back To Home{' '}<MDBIcon fas icon="history" />
          </Link>
      </div>

      <table className="table mb-5 container shadow w-100 text-align-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>URL</th>
            <th>TimeStamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          history?.length>0?history.map((video,index)=>(

            <tr>
            <td>{index+1}</td>
            <td>{video.caption}</td>
            <td>
              <a href={video.link} target='_blank'>{video.link}</a>
            </td>
            <td>{video.timeStamp}</td>
            <td>
              <a href='' className='text-danger' onClick={()=>removeHistory(video?.id)}><MDBIcon fas icon="trash" /></a>
            </td>
          </tr>
          )):<p className='text-danger'>Nothing to Display</p>
          }
        </tbody>
      </table>

    </>
  )
}

export default WatchHistory
