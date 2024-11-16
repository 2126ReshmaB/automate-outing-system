import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Student from "../student/Student";
import Counsellor from "../components/Counsellor";
import FavoriteStudent from "../home/FavoriteStudent";
import CounsellorSelect from "../components/CouncellorSelect";
import HOD from "../hod/HOD";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Hod from "../components/Hod";
import Login_Counsellor from "../components/login/Login_Counsellor";
import Pass from "../components/Pass";
import Coordinator from "../components/login/ycoordinator/Coordinator";
import Principal from "../components/login/principal/Principal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/student',
        element: <Student />
      },
      {
        path: '/counsellor',
        element: <Counsellor />
      },
      {
        path: '/list',
        element: <CounsellorSelect />
      },
      {
        path: '/hod',
        element: <Hod />
      },
      {
        path: '/sign-up',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/login-counsellor',
        element: <Login_Counsellor />
      },
      {
        path: '/pass/:studentId',  
        element: <Pass />
      },
      {
        path: '/year-coordinator',
        element: <Coordinator />
      },
      {
        path: '/principal',
        element: <Principal />
      }
    ]
  },
]);

export default router;