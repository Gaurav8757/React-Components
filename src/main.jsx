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
import AddBranch from "./admin/admincomponents/Branch/AddBranch.jsx";
import AddEmployee from "./HumanResources/Employee/AddEmployee.jsx";
import AddHRSalary from "./admin/admincomponents/Salary/HrSalary.jsx";
import GenerateSalary from "./HumanResources/GenerateSalary/GenerateSalary.jsx";
import Policy from "./admin/admincomponents/reports/Policy.jsx";
import AddPolicyDetails from "./admin/admincomponents/PolicyLists/AddPolicyDetails.jsx";
import Layout from "./admin/Layout.jsx";
import ViewBranch from "./admin/admincomponents/Branch/ViewBranch.jsx";
import UpdateBranch from "./admin/admincomponents/Branch/UpdateBranch.jsx";
import ViewEmployee from "./HumanResources/Employee/ViewEmployee.jsx";
import ViewHRSalary from "./admin/admincomponents/Salary/ViewHrSalary.jsx";
import UpdateHRSalary from "./admin/admincomponents/Salary/UpdateHrSalary.jsx";
import ViewPolicy from "./admin/admincomponents/PolicyLists/ViewPolicy.jsx";
import ViewGenSalary from "./HumanResources/GenerateSalary/ViewGenSalary.jsx";
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
import AddAdvisor from "./admin/admincomponents/Advisor/AddAdvisor.jsx";
import ViewAdvisor from "./admin/admincomponents/Advisor/ViewAdvisor.jsx";
import UpdateAdvisor from "./admin/admincomponents/Advisor/UpdateAdvisor.jsx";
import HomepageAdvisor from "./advisor/Home/HomepageAdvisor.jsx";
import UpdateMaster from "./admin/admincomponents/MasterForm/UpdateMaster.jsx";
import ForgotPassword from "./advisor/ForgotPassword.jsx";
import ForgetPassBranch from "./branches/ForgetPassBranch.jsx";
import UpdateEmployee from "./HumanResources/Employee/UpdateEmployee.jsx";
import UpdateGenSalary from "./HumanResources/GenerateSalary/UpdateGenSalary.jsx";
import LoginEmployee from "./Employee/LoginEmp.jsx";
import ProtectedEmp from "./Employee/ProtectedEmp.jsx";
import LayoutEmp from "./Employee/LayoutEmp.jsx";
import ForgotEmpPassword from "./Employee/ForgotEmpPassword.jsx";
import HrLogin from "./HumanResources/HrLogin.jsx";
import ForgetHr from "./HumanResources/ForgetHr.jsx";
import ProtectedHr from "./HumanResources/ProtectedHr.jsx";
import LayoutHr from "./HumanResources/LayoutHr.jsx";
import AddHr from "./admin/admincomponents/Hr/AddHr.jsx";
import ViewHr from "./admin/admincomponents/Hr/ViewHr.jsx";
import DashboardHr from "./HumanResources/DashboardHr.jsx";
import AddSalary from "./HumanResources/Salary/AddSalary.jsx";
import ViewSalary from "./HumanResources/Salary/ViewSalary.jsx";
import UpdateSalary from "./HumanResources/Salary/UpdateSalary.jsx";
import GenerateHrSalary from "./admin/admincomponents/GenerateSalary/GenerateSalary.jsx";
import ViewGenHrSalary from "./admin/admincomponents/GenerateSalary/ViewGenSalary.jsx";
import UpdateGenHrSalary from "./admin/admincomponents/Salary/UpdateHrSalary.jsx";
import HrAttendance from "./HumanResources/attendance/HrAttendance.jsx";
import AddHrAttendance from "./HumanResources/attendance/AddHrAttendance.jsx";
import EmpAttendance from "./Employee/attendance/EmpAttendance.jsx";
import DashboardEmp from "./Employee/DashboardEmp.jsx";
import AddAttendance from "./Employee/attendance/AddAttendance.jsx";
import ViewHrAttendace from "./admin/admincomponents/Hr/ViewHrAttendace.jsx";
import EmpAttendanceModal from "./HumanResources/Employee/EmpAttendanceModal.jsx";
import EmpCalendar from "./HumanResources/Employee/EmpCalendar.jsx";
import AddDataByBranch from "./branches/AddDetails/AddDataByBranch.jsx";
import OperationHead from "./admin/admincomponents/operationHead/OperationHead.jsx";
import TeamLead from "./admin/admincomponents/Teams/TeamLead.jsx";
import StaffType from "./admin/admincomponents/stafftype/StaffType.jsx";
import ListStaffType from "./admin/admincomponents/stafftype/ListStaffType.jsx";
import EmpPolicy from "./Employee/policy/EmpPolicy.jsx";
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
          <Route path="/dashboard/updatebranch" element={<UpdateBranch />} />
          <Route path = "/dashboard/addhr" element = {<AddHr/>}/>
          <Route path = "/dashboard/viewhr" element = {<ViewHr/>}/>
          <Route path="/dashboard/addhrsalary" element={<AddHRSalary />} />
          <Route path="/dashboard/viewhrsalary" element={<ViewHRSalary />} />
          <Route path="/dashboard/updatehrsalary" element={<UpdateHRSalary />} />
          <Route path="/dashboard/generate/salary" element={<GenerateHrSalary />} />
          <Route path="/dashboard/update/gensalary" element={<UpdateGenHrSalary />} />
          <Route path="/dashboard/view/generatesalary" element={<ViewGenHrSalary />} />
          <Route path="/dashboard/view/attendance" element = {<ViewHrAttendace/>} />
          <Route path="/dashboard/policy" element={<Policy />} />
          <Route path="/dashboard/addpolicy" element={<AddPolicyDetails />} />
          <Route path="/dashboard/viewpolicy" element={<ViewPolicy />} />
          <Route path="/dashboard/viewclaim" element={<ViewClaim />} />
          <Route path="/dashboard/viewcomplaint" element={<ViewComplaint />} />
          <Route path="/dashboard/viewfeedback" element={<ViewFeedback />} />
          <Route path="/dashboard/viewcontact" element={<ViewContact />} />
          <Route path="/dashboard/addcarousel" element={<UserCarousel />} />
          <Route path="/dashboard/firstview/carousel" element={<ViewCarousel />} />
          <Route path="/dashboard/viewfilledform" element={<ViewUserFillCompany />} />
          <Route path="/dashboard/masterform" element={<MasterForm />} />
          <Route path="/dashboard/updatemasterform" element={<UpdateMaster />} />
          <Route path="/dashboard/viewmasterform" element={<ViewMasterForm />} />
          <Route path="/dashboard/addAdvisor" element={<AddAdvisor />} />
          <Route path="/dashboard/viewadvisor" element={<ViewAdvisor />} />
          <Route path="/dashboard/updateadvisor" element={<UpdateAdvisor />} />
          <Route path="/dashboard/operation/head" element={<OperationHead />} />
          <Route path="/dashboard/team/operation" element={<TeamLead />} />
          <Route path="/dashboard/staff/type" element={<StaffType />} />
          <Route path="/dashboard/staff/lists" element={<ListStaffType />} />
        </Route>
      </Route>
     
      {/* BRANCHES ROUTES */}
      <Route path="/branches" element={<LoginBranch />} />
      <Route path="/branches/forget" element={<ForgetPassBranch />} />
      <Route element={<BranchProtected />}>
        <Route path="/branches/home" element={<BranchLayout />}>
          <Route path="/branches/home" element={<BranchDashboard />} />
          <Route path="/branches/home/add/policy" element = {<AddDataByBranch/>}/>
          <Route path="/branches/home/viewinsurance" element={<MasterView />} />
        </Route>
      </Route>

      {/* Advisor Routes */}
      <Route path="/advisor" element={<LoginAdvisor />} />
      <Route path="/advisor/forget" element={<ForgotPassword />} />
      <Route element={<ProtectedAdvisor />}>
        <Route path="/advisor/home" element={<LayoutAdvisor />}>
          <Route path="/advisor/home" element={<HomepageAdvisor />} />
          <Route path="/advisor/home/viewinsurance" element={<InsuranceLists />} />
        </Route>
      </Route>

      {/* Employee Routes */}
      <Route path="/employee" element={<LoginEmployee />} />
      <Route path="/employee/forget" element={<ForgotEmpPassword />} />
      <Route element={<ProtectedEmp />}>
        <Route path="/employee/home" element={<LayoutEmp />}>
          <Route path="" element={<DashboardEmp />} />
          <Route path="/employee/home/add/attendance" element = {<AddAttendance/>}/>
          <Route path="/employee/home/attendance" element = {<EmpAttendance/>}/>
          <Route path="/employee/home/policy" element = {<EmpPolicy/>}/>
        </Route>
      </Route>
      
      {/* HR Routes */}
      <Route path="/hr" element = {<HrLogin/>}/>
      <Route path="/hr/forget" element = {<ForgetHr/>}/>
      <Route element = {<ProtectedHr/>}>
        <Route path="/hr/home" element = {<LayoutHr/>}>
        <Route path="" element = {<DashboardHr/>}/>
        <Route path="/hr/home/addemployee" element={<AddEmployee />} />
          <Route path="/hr/home/viewemployee" element={<ViewEmployee />} />
          <Route path="/hr/home/emp/modal/attendance" element={<EmpAttendanceModal/>} />
          <Route path="/hr/home/updateemployee" element={<UpdateEmployee />} />
          <Route path="/hr/home/emp/attendance" element = {<EmpCalendar/>}/>
          

          <Route path="/hr/home/addsalary" element={<AddSalary />} />
          <Route path="/hr/home/viewsalary" element={<ViewSalary />} />
          <Route path="/hr/home/updatesalary" element={<UpdateSalary />} />

          <Route path="/hr/home/generate/salary" element={<GenerateSalary />} />
          <Route path="/hr/home/update/gensalary" element={<UpdateGenSalary />} />
          <Route path="/hr/home/view/generate/salary" element={<ViewGenSalary />} />
          <Route path="/hr/home/attendance" element = {<HrAttendance/>} />
          <Route path="/hr/home/add/attendance" element = {<AddHrAttendance/>} />
          </Route>
        </Route>
      {/* </Route> */}

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
