import React from "react";
import ReactDOM from "react-dom/client";
import Companies from "./components/about/Companies.jsx";
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
import ComplaintForm from "./components/complaint/ComplaintForm.jsx";
import ContactUs from "./components/contact/ContactUs.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      {/* home */}
       <Route path="" element={<Home/>} />
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


    </Route>

  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
