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
import ViewBranch from "./admin/admincomponents/ViewBranch.jsx";
import ViewEmployee from "./admin/admincomponents/ViewEmployee.jsx";
import ViewSalary from "./admin/admincomponents/ViewSalary.jsx";
import ViewPolicy from "./admin/admincomponents/ViewPolicy.jsx";
import ViewGenSalary from "./admin/admincomponents/ViewGenSalary.jsx";
import ProtectRoute from "./admin/Protected.jsx";
import LoginBranch from "./branches/LoginBranch.jsx";
import BranchLayout from "./branches/BranchLayout.jsx";
import BranchDashboard from "./branches/BranchDashboard.jsx";
import BranchProtected from "./branches/BranchProtect.jsx";
import ViewClaim from "./admin/admincomponents/reports/ViewClaim.jsx";
import ViewComplaint from "./admin/admincomponents/reports/ViewComplaint.jsx";
import ViewContact from "./admin/admincomponents/reports/ViewContact.jsx";
import ViewFeedback from "./admin/admincomponents/reports/ViewFeedback.jsx";
import HealthInsurance from "./components/homeComponets/HealthInsurance.jsx";
import MotorInsurance from "./components/homeComponets/MotorInsurance.jsx";
import NonMotorInsurance from "./components/homeComponets/NonMotorInsurance.jsx";
import AddCompanies from "./admin/admincomponents/company/AddCompanies.jsx";
import ViewCompany from "./admin/admincomponents/company/ViewCompany.jsx";
import HealthPage from "../src/components/homeComponets/Health/HealthPage.jsx";
import MotorPage from "../src/components/homeComponets/Motor/MotorPage.jsx";
import NonMotorPage from "./components/homeComponets/Non_Motor/NonMotorPage.jsx";
import UserCarousel from "./admin/admincomponents/uploadCarousel/UserCarousel.jsx";
import ViewCarousel from "./admin/admincomponents/uploadCarousel/ViewCarousel.jsx";
import ViewUserFillCompany from "./admin/admincomponents/reports/ViewUserFillCompany.jsx";
import FamilyHealthPage from "./components/homeComponets/Health/FamilyHealthPage.jsx";
import EmpHealthPage from "./components/homeComponets/Health/EmpHealthPage.jsx";
import TwoWheeler from "./components/homeComponets/Motor/TwoWheeler.jsx";
import CommercialVehicle from "./components/homeComponets/Motor/CommercialVehicle.jsx";
import HomeInsPage from "./components/homeComponets/Non_Motor/HomeInsPage.jsx";
import BusinessInsPage from "./components/homeComponets/Non_Motor/BusinessInsPage.jsx";
import MarineInsPage from "./components/homeComponets/Non_Motor/MarineInsPage.jsx";
import ChallanView from "./components/homeComponets/viewChallan/ChallanView.jsx";
import Careers from "./components/careers/Careers.jsx";
import MasterForm from "./admin/admincomponents/MasterForm/MasterForm.jsx";
import ViewMasterForm from "./admin/admincomponents/MasterForm/ViewMasterForm.jsx";
import MasterView from "./branches/showInsuranceData/MasterView.jsx";
import LoginAdvisor from "./advisor/LoginAdvisor.jsx";
import ProtectedAdvisor from "./advisor/ProtectedAdvisor.jsx";
import InsuranceLists from "./advisor/showInsurance/InsuranceLists.jsx";
import LayoutAdvisor from "./advisor/LayoutAdvisor.jsx";
import AddAdvisor from "./admin/admincomponents/AddAdvisor.jsx";
import ViewAdvisor from "./admin/admincomponents/ViewAdvisor.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}  >
        {/* home */}
        <Route path="" element={<Home />} />
        {/* health insurance */}
        <Route path="/healthinsurance" element={<HealthInsurance />} />
        <Route path="/healthinsurance/health" element={<HealthPage />} />
        <Route path="/healthinsurance/health2" element={<FamilyHealthPage />} />
        <Route path="/healthinsurance/health3" element={<EmpHealthPage />} />

        {/* motor */}
        <Route path="/motorinsurance" element={<MotorInsurance />} />
        <Route path="/motorinsurance/car" element={<MotorPage />} />
        <Route path="/motorinsurance/twowheeler" element={<TwoWheeler />} />
        <Route path="/motorinsurance/commervehicle" element={<CommercialVehicle />} />

        {/* non-motor */}
        <Route path="/nonmotorinsurance" element={<NonMotorInsurance />} />
        <Route path="/nonmotorinsurance/travelins" element={<NonMotorPage />} />
        <Route path="/nonmotorinsurance/homeins" element={<HomeInsPage />} />
        <Route path="/nonmotorinsurance/businessins" element={<BusinessInsPage />} />
        <Route path="/nonmotorinsurance/marineins" element={<MarineInsPage />} />




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
        <Route path="/careers" element={<Careers />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/track-request" element={<TrackRequest />} />
        {/* challans */}
        <Route path="/challans" element={<ChallanView />} />
      </Route>



      {/* admin routes */}
      <Route path="/admin" element={<Admin />} />
      <Route element={<ProtectRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/dashboard/addcompanies" element={<AddCompanies />} />
          <Route path="/dashboard/viewcompanies" element={<ViewCompany />} />
          <Route path="/dashboard/addbranch" element={<AddBranch />} />
          <Route path="/dashboard/viewbranch" element={<ViewBranch />} />
          <Route path="/dashboard/addemployee" element={<AddEmployee />} />
          <Route path="/dashboard/viewemployee" element={<ViewEmployee />} />
          <Route path="/dashboard/addsalary" element={<AddSalary />} />
          <Route path="/dashboard/viewsalary" element={<ViewSalary />} />
          <Route path="/dashboard/generatesalary" element={<GenerateSalary />} />
          <Route path="/dashboard/viewgeneratesalary" element={<ViewGenSalary />} />
          <Route path="/dashboard/policy" element={<Policy />} />
          <Route path="/dashboard/addpolicy" element={<AddPolicyDetails />} />
          <Route path="/dashboard/viewpolicy" element={<ViewPolicy />} />
          <Route path="/dashboard/viewclaim" element={<ViewClaim />} />
          <Route path="/dashboard/viewcomplaint" element={<ViewComplaint />} />
          <Route path="/dashboard/viewfeedback" element={<ViewFeedback />} />
          <Route path="/dashboard/viewcontact" element={<ViewContact />} />
          <Route path="/dashboard/addcarousel" element={<UserCarousel />} />
          <Route path="/dashboard/firstview/carousel" element={<ViewCarousel />} />/dashboard/viewfilledform
          <Route path="/dashboard/viewfilledform" element={<ViewUserFillCompany />} />
          <Route path="/dashboard/masterform" element={<MasterForm />} />
          <Route path="/dashboard/viewmasterform" element={<ViewMasterForm />} />
          <Route path="/dashboard/addAdvisor" element={<AddAdvisor />} />
          <Route path="/dashboard/viewadvisor" element={<ViewAdvisor />} />
        </Route>
      </Route>

{/* BRANCHES ROUTES */}
      <Route path="/branches" element={<LoginBranch />} />
      <Route element={<BranchProtected />}>
        <Route path="/branches/home" element={<BranchLayout />}>
          <Route path="/branches/home" element={<BranchDashboard />} />
          <Route path="/branches/home/viewinsurance" element={<MasterView />} />
        </Route>
      </Route>

      {/* advisor routes */}
      <Route path="/advisor" element={<LoginAdvisor />} />
      <Route element={<ProtectedAdvisor />}>
        <Route path="/advisor/home" element={<LayoutAdvisor />}>
          <Route path="/advisor/home/viewinsurance" element={<InsuranceLists />} />
        </Route>
      </Route>




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
