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
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />}  >

      {/* <Route path="admin" element={<Admin />} /> */}
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
    </>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={1500}
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
