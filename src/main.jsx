import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Companies from "./components/about/Companies.jsx";
import Feedback from "./components/feedback/Feedback.jsx";
import App from "./components/app/App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Home from "../src/components/home/Home.jsx";
import DirectorMessage from "./components/about/DirectorMessage.jsx";
import Mission from "./components/about/Mission.jsx";
import Brochure from "./components/downloads/Brochure.jsx";
import Proposal from "./components/downloads/Proposal.jsx";
import ClaimForm from "./components/downloads/ClaimForm.jsx";
import ServiceClaim from "./components/service-request/ServiceClaim.jsx";
import Branch from "./components/branch/Branch.jsx";
import TrackRequest from "./components/track-request/TrackRequest.jsx";
import ComplaintForm from "./components/complaint/ComplaintForm.jsx";
import ContactUs from "./components/contact/ContactUs.jsx";
import Admin from "./admin/Admin.jsx";
import Dashboard from "./admin/admincomponents/Dashboard.jsx";
import AddBranch from "./admin/admincomponents/AddBranch.jsx";
import AddEmployee from "./admin/admincomponents/AddEmployee.jsx";
import AddSalary from "./admin/admincomponents/AddSalary.jsx";
import GenerateSalary from "./admin/admincomponents/GenerateSalary.jsx";
import Policy from "./admin/admincomponents/reports/Policy.jsx";
import AddPolicyDetails from "./admin/admincomponents/reports/AddPolicyDetails.jsx";
import Layout from "./admin/Layout.jsx";
import Agent from "./branches/Agent.jsx";
import ViewBranch from "./admin/admincomponents/ViewBranch.jsx";
import ViewEmployee from "./admin/admincomponents/ViewEmployee.jsx";
import ViewSalary from "./admin/admincomponents/ViewSalary.jsx";
import ViewPolicy from "./admin/admincomponents/ViewPolicy.jsx";
import ViewGenSalary from "./admin/admincomponents/ViewGenSalary.jsx";
import ProtectRoute from "./admin/Protected.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />}  >
      {/* home */}
      <Route path="" element={<Home />} />


      {/* about us */}
      <Route path="/aboutus" element={<Companies />} />
      <Route path="/vision" element={<Mission />} />
      <Route path="/messages" element={<DirectorMessage />} />
      {/* downloads */}
      <Route path="/claimform" element={<ClaimForm />} />
      <Route path="/proposal" element={<Proposal />} />
      <Route path="/brochures" element={<Brochure />} />
      {/* SERVICE */}
      <Route path="/serviceclaim" element={<ServiceClaim />} />
      {/* Branch */}
      <Route path="/branch" element={<Branch />} />
      {/* complaint */}
      <Route path="/complaintform" element={<ComplaintForm />} />
      {/* Contact us */}
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/track-request" element={<TrackRequest />} />
    </Route>



    {/* admin routes */}
    <Route path="/admin" element={<Admin/>}/>
    <Route element={<ProtectRoute/>}>
    <Route path="/dashboard" element={<Layout/>}>
    <Route path="" element={<Dashboard/>}/>
    <Route path="/dashboard/addbranch" element={<AddBranch/>}/>
    <Route path="/dashboard/viewbranch" element={<ViewBranch/>}/>
    <Route path="/dashboard/addemployee" element={<AddEmployee/>}/>
    <Route path="/dashboard/viewemployee" element={<ViewEmployee/>}/>
    <Route path="/dashboard/addsalary" element={<AddSalary/>}/>
    <Route path="/dashboard/viewsalary" element={<ViewSalary/>}/>
    <Route path="/dashboard/generatesalary" element={<GenerateSalary/>}/>
    <Route path="/dashboard/viewgeneratesalary" element={<ViewGenSalary/>}/>
    <Route path="/dashboard/policy" element={<Policy/>}/>
    <Route path="/dashboard/addpolicy" element={<AddPolicyDetails/>}/>
    <Route path="/dashboard/viewpolicy" element={<ViewPolicy/>}/>
      </Route>
      </Route>
      <Route path="/agent" element={<Agent/>}/>
    </>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      limit={9}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="colored"
    />
  </React.StrictMode>
);
