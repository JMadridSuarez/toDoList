import { useState } from 'react';
import Modal from './Modal';
import {useCookies} from 'react-cookie'

export default function ListHeader({listName, getData}) {
    const [showModal, setShowModal] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(null);

    const signout = ()=>{
      removeCookie('Email');
      removeCookie('AuthToken');
      window.location.reload(); 

    }
  return (
    <div className='listHeader'>
        <h1>{listName}</h1>
        <div className='buttonContainer'>
            <button className='addNew' onClick={()=>setShowModal(true)}>Add new</button>
            <button className='signout' onClick={signout}>Signout</button>
        </div>
        {showModal && <Modal mode = {'create'} setShowModal={setShowModal} getData={getData}/>}
        
    </div>
  )
}
