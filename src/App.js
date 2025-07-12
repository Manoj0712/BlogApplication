import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CreatePost from './screens/create/CreatePost.js'
import NavBar from './ReactFunctionComponents/NavBar';
import PostDetail from './screens/postDetails/PostDetails.js'
import EditPost from './screens/edit/EditPost.js'
import Notification from './calenderCreation/notification';
"just test"
import DayWiseLogic from './dayWiseLogic/dateWiselogic'
import Home from './screens/Home.js'
import ThemeSwitch from './switch/ThemeSwitch';
import { useThemeContext } from './hooks/useThemeContext';

function App() {
  const {theme} = useThemeContext()
  return (
    <div className={`text-center ${theme==="dark"?"bg-blue-200":"bg-red-200"}`}>
      {/* <DayWiseLogic/> */}
      {/* <Notification/> */}
      <BrowserRouter>
        <NavBar />
        <ThemeSwitch/>
        <div className='pt-5'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/edit/:id" element={<EditPost/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
