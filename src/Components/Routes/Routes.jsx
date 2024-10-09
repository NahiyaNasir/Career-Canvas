import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
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
import JobPosting from "../Pages/Job_Posting/JobPosting";
import Chat from "../Pages/Chat/Chat";
import Resume_templates_row from "../Pages/Resume_Templates/templatesColllection/Resume_templates_row";
import Template1 from "../Pages/dragAndDrop/Template1";


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
        path: '/job-posting',
        element: <JobPosting></JobPosting>
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
    ]
  },
]);


export default router;