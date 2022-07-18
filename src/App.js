import { Switch,Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useSelector} from 'react-redux';
import './App.css';
import Auth from './Components/Auth/Authentication';
import Welcome from './Components/Home/Welcome';
import Navbar from './Components/Home/Navbar';
import ChatRoomAuth from './Components/Chat/ChatAuth';
import Events from './Components/Events/Events';
import Forums from './Components/Forum/Forums';
import { useState } from 'react';
import ChatBox from './Components/Chat/ChatBox';
import Moments from './Components/Moments/Moments';
import AddQuestion from './Components/Forum/AddQuestion';
import ForumDetail from './Components/Forum/ForumDetail';
import NewEvent from './Components/Events/NewEvent';
function App() {
  const loggedin = useSelector(state=>state.loginStat.loggedin);
  const [unitnumber,setunitnumber] = useState(null);
  const getclusternumber = (num) => {
    setunitnumber(num);
  }
  return (
    <div className="App">

      {/* This is the Login/Authentication Page where the user will land before logging In */}
      <Switch>
        <Route path="/" exact>
          {!loggedin && <Redirect to='/login'/>}
          {loggedin && <Redirect to='/welcome'/>}
        </Route>
        <Route path='/login'>
          {!loggedin && 
          <div>
            <Auth/>
          </div>}
          {loggedin && <Redirect to='/welcome'/>}
        </Route>
        {!loggedin && 
        <Route path="*">
          <Redirect to='/login'/>
        </Route>
        }

        {/* This is the NavBar which will only be visible is the user is Logged In, It will be visible on every Page if User is Logged In! */}
        {loggedin && 
        <div className='main_application'>
          <Navbar/>
          {/* This is the Post-Login Environment / The main Application */}
          <Route path='/welcome'>
            <Welcome/>
          </Route>
          <Route path='/ChatRoomAuth' exact>
            {!unitnumber && <ChatRoomAuth clusternumber={getclusternumber}/>}
            {unitnumber && <Redirect to={`Chat/${unitnumber}`}/>}
          </Route>
          <Route path="/Chat/:unit">
            <ChatBox/>
          </Route>
          <Route path="/Moments">
            <Moments/>
          </Route>
          <Route path='/Events'>
            <Events/>
          </Route>
          <Route path='/Forum' exact>
            <Forums/>
          </Route>
          <Route path='/Forum/:qID'>
            <ForumDetail/>
          </Route>
          <Route path='/AddQuestion'>
            <AddQuestion/>
          </Route>
          <Route path='/NewEvent'>
            <NewEvent/>
            {/* New Event */}
          </Route>
        </div>
        }
      </Switch>
    </div>
  );
}

export default App;
