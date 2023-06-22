import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,

} from 'mdb-react-ui-kit';

const Dashboard = () => {

    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(true)

    const [ndata,setNData ] = useState({
        title:"",
      })
    
      const config = { headers: { "token": localStorage.getItem("token") } }

      const handleChange = (e) => {
        const { name, value } = e.target
        setNData({ ...ndata, [name]: value })
    
      }
 

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    const allFeedback = async () => {


        const api = await axios.get(`http://localhost:5000/api/view`, config)
        console.log(api.data)
        if (api.data.status == 200) {
            setdata(api.data.response)
            setLoading(false)

        }
    }

    useEffect(() => {
        allFeedback()
    }, [])

    const handleSubmit = async () => {
        console.log("user data", ndata);
        const api = await axios.post("http://localhost:5000/api/add", ndata,config)
        console.log("api", api)
        if (api.data.status == 200) {
            // toggleShow()
            allFeedback()
        } else {
          alert(api.data.response)
         }
       
      }
    const handleDelete = async (id) => {
        console.log("user id", id);
        const api = await axios.delete(`http://localhost:5000/api/remove/${id}`,config)
        console.log("api", api)
        if (api.data.status == 200) {
            allFeedback()
        } else {
          alert(api.data.response)
         }
       
      }
     


    return (

        <>
        <div>
            <h1>Todo List Task</h1>
            <h2> Add list <MDBBtn onClick={toggleShow}>+</MDBBtn>

            </h2>
            <div>{loading == false ? data && data.map((t) => {
                // console.log(t)
                return <div style={{display:'flex'}}>
                    <h3>{t.title}</h3>

                    <MDBBtn onClick={()=>handleDelete(t.id)}>X</MDBBtn>
                    <MDBBtn onClick={''}>e</MDBBtn>
                </div>

            }) : <h3> No data found</h3>}</div>
        </div>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add list</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody> 
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Title' id='formControlLg' type='text' size="mg"
              name='title' value={ndata.title} onChange={handleChange}/>

              </MDBModalBody>
  
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={()=> handleSubmit()}>Save changes</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
        </>
    )
}

export default Dashboard