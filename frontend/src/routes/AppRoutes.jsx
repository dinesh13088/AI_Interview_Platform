

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
import Success from '@/Recruiter/Success';

import Home from '../Pages/Home';
import MyResume from '@/Pages/MyResume';
import CompanyForm from '@/Recruiter/Company';
import RecruiterForm from '@/Recruiter/RecruiterForm';
import RecruiterLogin from '@/Recruiter/RecruiterLogin';
import RoleChooser from '@/Pages/RoleChooser';
import ApplyJob from '@/Pages/ApplyJob';



import RecruiterDashboard from '@/Recruiter/Home/RecruiterDashboard';
import RecruiterHome from '@/Recruiter/Home/RecruiterHome';
import Company from '@/Recruiter/pages/Company';
import RecruiterJobs from '@/Recruiter/pages/RecruiterJobs';
import CandidatesList from '@/Recruiter/pages/CandidatesList';
import RecruiterApplications from '@/Recruiter/pages/RecruiterApplications';
import InterviewsList from '@/Recruiter/pages/InterviewsList';
import AIReview from '@/Recruiter/pages/AIReview';
import Analytics from '@/Recruiter/pages/Analytics';
import RecruiterNotifications from '@/Recruiter/pages/RecruiterNotifications';
import RecruiterSettings from '@/Recruiter/pages/RecruiterSettings';
function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route>
                    <Route path='/' element={<RoleChooser />} />
                    <Route path='candidate-login' element={<App />} />
                    <Route path='recruiter-login' element={<RecruiterLogin />} />
                    <Route path='register' element={<Register />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='candidate' element={<RegisterCandidate />} />
                    <Route path='company-form' element={<CompanyForm />} />
                    <Route path='recruiter-form' element={<RecruiterForm />} />
                    <Route path='success' element={<Success />} />

                    {/* this is routes for recruiter*/}
                    <Route path='rhome' element={<RecruiterHome />}>
                        <Route index element={<RecruiterDashboard />} />
                        <Route path='rdashboard' element={<RecruiterDashboard />} />
                        <Route path='company' element={<Company />} />
                        <Route path='jobs' element={<RecruiterJobs />} />
                        <Route path='candidates' element={<CandidatesList />} />
                        <Route path='applications' element={<RecruiterApplications />} />
                        <Route path='interviews' element={<InterviewsList />} />
                        <Route path='ai-review' element={<AIReview />} />
                        <Route path='analytics' element={<Analytics />} />
                        <Route path='notifications' element={<RecruiterNotifications />} />
                        <Route path='settings' element={<RecruiterSettings />} />

                    </Route>



                    <Route path='home' element={<Home />}>


                        <Route index element={<Dashboard />} />
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='resume' element={<MyResume />} />
                        
                        <Route path='savedjobs' element={<SavedJobs />} />
                        <Route path='applications' element={<Applications />} />
                        <Route path='interview' element={<Interview />} />
                        <Route path='aipractice' element={<AiPractice />} />
                        <Route path='performance' element={<MyPerfromance />} />
                        <Route path='notifications' element={<Notifications />} />
                        <Route path='settings' element={<Settings />} />
                        <Route path='jobs' element={<Jobs />}/>
                        <Route path="apply-jobs/:jobId" element={<ApplyJob/>}/> 
                        

                        
                        
                        
                    </Route>


                </Route>

            </Routes>
        </div>
    )
}

export default AppRoutes
