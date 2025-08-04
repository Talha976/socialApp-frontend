import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/userComponents/Home';
import Network from './components/userComponents/Network';
import Login from './components/userComponents/Login';
import ForgetPassword from './components/passwords/ForgetPassword';
import SignUp from './components/userComponents/SignUp';
import ResetPassword from './components/passwords/ResetPassword';
import Profile from './components/userComponents/Profile';
import Notifications from './components/userComponents/Notifications';
import Message from './components/userComponents/Message';
import PostDetails from './components/userComponents/PostDetails';
import Connections from './components/pages/Connections';
import Job from './components/userComponents/Job';
import AdminSideBar from './components/admin/AdminSideBar';
import CreateJob from './components/admin/CreateJob';
import AdminRegister from './components/admin/AdminRegister';
import AdminLogin from './components/admin/AdminLogin';
import Dashboard from './components/admin/Dashboard'
import UpdateForm from './components/admin/UpdateForm';
import AdminProfile from './components/admin/AdminProfile';
import JobList from './components/admin/JobList'
import ApplicantsList from './components/admin/ApplicantsList '
import {useDispatch, useSelector} from 'react-redux'
import {initSocket} from './redux/slices/socketSlice.js'
import { useEffect } from 'react';



function App() { 
  const authUser = useSelector((state)=>state.auth.user)

  const dispatch = useDispatch();
  const userId = authUser?.info?._id; 
  useEffect(()=>{
    if(userId) dispatch(initSocket(userId))
  },[authUser, userId])

  return (
    <div className="overflow-hidden text-black bg-gradient-to-r from-blue-100 via-gray-100 to-blue-100 min-h-screen">
       <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' /> } />
        <Route path='/network' element={authUser ? <Network /> : <Navigate to='/login' /> }  />
        <Route path='/login' element={<Login />} />  
        <Route path='/register' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to='/login' /> } />
        <Route path='/notification' element={authUser ? <Notifications /> : <Navigate to='/login' /> } />
        <Route path='/connections' element={authUser ? <Connections /> : <Navigate to='/login' /> } />
        <Route path='/jobs' element={authUser ? <Job /> : <Navigate to='/login' /> } />
        <Route path='/messaging' element={authUser ? <Message /> : <Navigate to='/login' /> } />
        {/* <Route path='/application' element={authUser ? <ApplicationForm /> : <Navigate to='/login' /> } /> */}
        <Route path='/post/:postId' element={authUser ? <PostDetails /> : <Navigate to='/login' /> } />
        <Route path='/admin' element={<AdminSideBar />} />  
        <Route path='/create_job' element={<CreateJob />} />
        <Route path='/job_list' element={<JobList />} />
        <Route path='/update/:id' element={<UpdateForm />} />
        <Route path='/applicants' element={<ApplicantsList />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin_profile' element={<AdminProfile />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin-register' element={<AdminRegister />} />
      </Routes> 
    </div>
  );
}

export default App;
