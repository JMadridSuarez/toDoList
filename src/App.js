import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import {useCookies} from 'react-cookie';

function App() {
  const [cookies] = useCookies(null);
  
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  
  const [tasks, setTask] = useState();

  const getData = async() =>{
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/api/v1/lists/${userEmail}`);
      const json = await response.json();
      setTask(json);
    } catch (error) {
      
      console.error(error);
    }
  }

  useEffect(() => {
    if(authToken){
      getData();
    }
  }, [] )

  //sort by date
  const sortTasks = tasks?.sort((a,b)=>new Date(b.date) - new Date(a.date))
  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken && <>
        <ListHeader listName = {'Tasks'} getData={getData}/>
        <p className="user-email">Welcome back <strong>{userEmail}</strong></p>
        {sortTasks?.map((task)=><ListItem key={task.id} task={task} getData={getData}/> )}
        </>
      }
      
    </div>
  );
}

export default App;
