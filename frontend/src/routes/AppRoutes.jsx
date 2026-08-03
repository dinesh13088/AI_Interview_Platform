

import App from '../App';
import Register from '../Pages/Register'
import Dashboard  from '../Pages/Dashboard';
import { Routes,Route } from 'react-router';
function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='register' element={<Register />}></Route>
                <Route path='/dashboard'element={<Dashboard/>}/>
            </Routes>
        </div>
    )
}

export default AppRoutes
