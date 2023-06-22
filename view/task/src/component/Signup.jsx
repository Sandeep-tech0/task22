import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import axios from "axios"

import {useNavigate} from "react-router-dom"


function Signup() {
    
    const navigate = useNavigate()
  const [data,setData ] = useState({
    email:"",
    password:"",
    full_name:"",
    father_name:"",
    mobile_no:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })

  }
  const handleSubmit = async () => {
    console.log("user data", data);
    const api = await axios.post("http://localhost:5000/api/signup", data)
    console.log("api", api.data)
    if (api.data.status == 200) {
      // console.log("-------------    " , api.data.response.token)
      localStorage.setItem("token",api.data.response.token)
      // alert(api.data.response)
      navigate('/dashboard')

     } else {
      alert(api.data.response)
     }
   
  }


  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
              

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Full Name' id='formControlLg' type='text' size="lg"
              name='full_name' value={data.full_name} onChange={handleChange}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Father Name' id='formControlLg' type='text' size="lg"
              name='father_name' value={data.father_name} onChange={handleChange}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"
              name='email' value={data.email} onChange={handleChange}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"
              name='password' value={data.password} onChange={handleChange}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Mobile Number' id='formControlLg' type='text' size="lg"
              name='mobile_no' value={data.mobile_no} onChange={handleChange}/>


              <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handleSubmit}>
                Login
              </MDBBtn>

           

              <div>
                <p className="mb-0">Don't have an account? <a href="/" class="text-white-50 fw-bold">Sign Up</a></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;