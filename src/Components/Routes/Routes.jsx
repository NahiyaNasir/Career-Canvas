import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Resume_Templates from "../Pages/Resume_Templates/Resume_Templates";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Job_Posting from "../Pages/Job_Posting/Job_Posting"
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
            element: <Resume_Templates></Resume_Templates>,
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
        element: <Job_Posting></Job_Posting>
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
    ]
  },
]);


export default router;