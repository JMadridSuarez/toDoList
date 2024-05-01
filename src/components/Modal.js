import React, { useState } from 'react'
import {useCookies} from 'react-cookie';

export default function Modal({mode,setShowModal,getData,task}) {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === "edit" ? true: false;

  const [data,setData] = useState({
    user_email: editMode ? task.user_email: cookies.Email,
    title: editMode ? task.title: null,
    progress:editMode ? task.progress: 50,
    date:editMode ? task.date: new Date()
  })

  //post to do list
  const postData = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/api/v1/lists/`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      })

      
      if(response.status === 200){
        console.log('worked')
        setShowModal(false);
        getData();
      }

    } catch (error) {
      console.error(error)
    }
  }
  //

  //edit task//
  const editData = async(e) =>{
    e.preventDefault();
    try {
      const response =await fetch(`${process.env.REACT_APP_SERVERURL}/api/v1/lists/${task.id}`,{
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
      })
      if(response.status === 200){
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error)
    }
  }
  //---------//
  

  const handleChange = (e)=>{
    const {name, value} = e.target
    setData(data=>({
      ...data,
      [name] : value
    }))
    
  }
  return (
    <div className='overlay'>
        <div className='modal'>
          <div className='form-title-container'>
              <h3>Let's {mode} yout task</h3>
              <button onClick={()=>{setShowModal(false)}}>X</button>
          </div>
          <form>
            <input 
              required 
              maxLength={30} 
              placeholder='Your task goes here' 
              name='title' 
              value={data.title}
              onChange={handleChange}/>
            <label >Drag to select your progress</label>
            <input
              required
              id='range'
              type='range'
              min='0'
              max='100'
              name='progress'
              value={data.progress}
              onChange={handleChange}/>
            <input className={mode} type='submit' onClick={editMode ? editData : postData} />
          </form>

        </div>
    </div>
  )
}
