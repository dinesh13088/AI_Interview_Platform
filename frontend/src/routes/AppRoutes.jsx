

import App from '../App';
import Register from '../Pages/Register'
import Dashboard from '../Pages/Dashboard';
import { Routes, Route } from 'react-router';
import ProtectedRoutes from './ProtectedRoutes';
import RegisterCandidate from '../Pages/RegisterCandidate';
import Profile from '@/Pages/Profile';
import Jobs from '@/Pages/Jobs';
import SavedJobs from '@/Pages/SavedJobs';
import Applications from '@/Pages/Applications';
import Interview from '@/Pages/Interview';
import AiPractice from '@/Pages/AiPractice';
import MyPerfromance from '@/Pages/MyPerfromance';
import Notifications from '@/Pages/Notifications';
import Settings from '@/Pages/Settings';

import Home from '../Pages/Home';
import MyResume from '@/Pages/MyResume';
function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route>
                    <Route path='/' element={<App />} />
                    <Route path='register' element={<Register />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='candidate' element={<RegisterCandidate />} />
                    <Route path='home' element={<Home />}>
                        <Route index element={<Dashboard />} />
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='resume' element={<MyResume />} />
                        <Route path='jobs' element={<Jobs />} />
                        <Route path='savedjobs' element={<SavedJobs />} />
                        <Route path='applications' element={<Applications />} />
                        <Route path='interview' element={<Interview />} />
                        <Route path='aipractice' element={<AiPractice />} />
                        <Route path='performance' element={<MyPerfromance />} />
                        <Route path='notifications' element={<Notifications />} />
                        <Route path='settings' element={<Settings />} />
                    </Route>
                </Route>

            </Routes>
        </div>
    )
}

export default AppRoutes
