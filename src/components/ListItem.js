import React, { useState } from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import  Modal from './Modal'

  export default function ListItem({task,getData}) {

    const [showModal, setShowModal] = useState(false)

  
    //Delete task//
    const deleteItem = async()=>{
      try {
        const deleted = await fetch(`${process.env.REACT_APP_SERVERURL}/api/v1/lists/${task.id}`,{
          method: 'DELETE',
        });
        if(deleted.status === 200){
          getData();
        }
      } catch (error) {
        console.error(error)
      }
    }
    //----------//

  return (
    <div className='list-item'>
      <div className='info-container'>
        <TickIcon/>
        <p className='task-title'>{task.title}</p>
        <ProgressBar progress= {task.progress}/>
      </div>

      <div className='buttonContainer'>
        <button className='edit' onClick={()=>setShowModal(true)}>Edit</button>
        <button className='delete' onClick={deleteItem}>Delete</button>
      </div>
      {showModal && <Modal mode = {'edit'} setShowModal={setShowModal} task = {task} getData={getData}/>}
    </div>
  )
}
