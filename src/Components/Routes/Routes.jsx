import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
// import Resume_Templates from "../Pages/Resume_Templates/Resume_Templates";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Premium_Membership from "../Pages/Premium_Membership/Premium_Membership";
import Resume_Review from "../Pages/Resume_Review/Resume_Review";
import User_Profile from "../Pages/User_Profile/User_Profile";
import PersonalInfoForm from "../Pages/Resume_Templates/PageWise/PersonalInfoForm";
import CareerObjectiveForm from "../Pages/Resume_Templates/PageWise/CareerObjectiveForm";
import SkillsForm from "../Pages/Resume_Templates/PageWise/SkillsForm";
import ProjectsForm from "../Pages/Resume_Templates/PageWise/ProjectsForm";
import EducationForm from "../Pages/Resume_Templates/PageWise/EducationForm";
import LanguagesForm from "../Pages/Resume_Templates/PageWise/LanguagesForm";
import Main from "../Pages/Resume_Templates/Main/Main";
import JobPosting from "../Pages/Job_Posting_admin/JobPosting";
import Chat from "../Pages/Chat/Chat";
import Resume_templates_row from "../Pages/Resume_Templates/templatesColllection/Resume_templates_row";
import Template1 from "../Pages/dragAndDrop/Template1";
// import Dashboard from "../Pages/Dashboard/Dashboard";
import AdminSidebar from "../Pages/Dashboard/AdminSidebar";
import ManageUser from "../Pages/Dashboard/ManageUser/ManageUser";
import JobsSection from "../Pages/JobPosting/JobsSection";
import GoogleDocAdvanced from "../Pages/GoogleDocLikeEdit/GoogleDocLikeEdit";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ResumeReview from "../Pages/Dashboard/ResumeReview/ResumeReview";
import AddAdmin from "../Pages/Dashboard/AddAdmin/AddAdmin";
import PrivateRouter from "./PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/resume-templates',
        element: <Main></Main>,
        
        children: [
          {
            path: 'Resume_Templates',
            element: <Resume_templates_row></Resume_templates_row>,
          },
          {
            path: "personal-info-form",
            element: <PersonalInfoForm />,
          },
          {
            path: "career-objective-form",
            element: <CareerObjectiveForm />,
          },
          {
            path: "skills-form",
            element: <SkillsForm />,
          },
          {
            path: "peronal-project",
            element: <ProjectsForm />,
          },
          {
            path: "education-form",
            element: <EducationForm />,
          },
          {
            path: "languages-form",
            element: <LanguagesForm />,
          },
        ]
      },
      {
        path: '/job-section',
        element: <JobsSection></JobsSection>
      },
      {
        path: '/premium-membership',
        element: <Premium_Membership></Premium_Membership>
      },
      {
        path: '/resume-review',
        element: <Resume_Review></Resume_Review>
      },
      {
        path: '/user-profile',
        element: <User_Profile></User_Profile>
      },
      {
        path: '/signin',
        element: <SignIn></SignIn>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/ai-chat',
        element: <Chat/>
      },
      {
        path: '/drag-and-drop',
        element: <Template1/>
      },
      {
        path: '/google-doc',
        element: <GoogleDocAdvanced/>
      },
    ]
  },
  {
   path:'/dashboard',
   element:<PrivateRouter><AdminSidebar/></PrivateRouter> ,
   children:[
    {
      path:'',
      element:<Dashboard/>
    },
    {
      path:'manage-users',
      element:<ManageUser/>
    },
    {
      path:'job-posting',
      element:<JobPosting></JobPosting>
    },
    {
      path:'resume-review',
      element:<ResumeReview/>
    }
    ,
    {
      path: 'admin',
      element : <AddAdmin></AddAdmin>
    }

   ]
  }
]);


export default router;