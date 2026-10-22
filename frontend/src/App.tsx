import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/modern-ui.css';
import './styles/original-jsp-styles.css';
import JspAddbeneficiaryComponent from './components/JspAddbeneficiaryComponent';
import JspAdmindashboardComponent from './components/JspAdmindashboardComponent';
import JspCheckAccountComponent from './components/JspCheckAccountComponent';
import JspCreateAccountComponent from './components/JspCreateAccountComponent';
import JspCustomerComponent from './components/JspCustomerComponent';
import JspCustomeraccountsComponent from './components/JspCustomeraccountsComponent';
import JspCustomerdashboardComponent from './components/JspCustomerdashboardComponent';
import JspCustomerOwnInfoComponent from './components/JspCustomerOwnInfoComponent';
import JspDashboardComponent from './components/JspDashboardComponent';
import JspDepositComponent from './components/JspDepositComponent';
import JspEditfaqComponent from './components/JspEditfaqComponent';
import JspEdituserComponent from './components/JspEdituserComponent';
import JspErrorpageComponent from './components/JspErrorpageComponent';
import JspFaqComponent from './components/JspFaqComponent';
import JspFaqAdminComponent from './components/JspFaqAdminComponent';
import JspForgotComponent from './components/JspForgotComponent';
import JspHeaderComponent from './components/JspHeaderComponent';
import JspHiddenDashboardComponent from './components/JspHiddenDashboardComponent';
import JspHiddenDepositComponent from './components/JspHiddenDepositComponent';
import JspHiddenHomeComponent from './components/JspHiddenHomeComponent';
import JspHiddenWalletComponent from './components/JspHiddenWalletComponent';
import JspLoanDashboardComponent from './components/JspLoanDashboardComponent';
import JspLoanPageComponent from './components/JspLoanPageComponent';
import JspLoginComponent from './components/JspLoginComponent';
import JspMessageComponent from './components/JspMessageComponent';
import JspMinistatementComponent from './components/JspMinistatementComponent';
import JspOtpPageComponent from './components/JspOtpPageComponent';
import JspPaymentHistoryComponent from './components/JspPaymentHistoryComponent';
import JspPaymentPageComponent from './components/JspPaymentPageComponent';
import JspRegisterComponent from './components/JspRegisterComponent';
import JspResetPasswordComponent from './components/JspResetPasswordComponent';
import JspTransactionsComponent from './components/JspTransactionsComponent';
import JspUpdateprofileComponent from './components/JspUpdateprofileComponent';
import JspUserComponent from './components/JspUserComponent';
import JspWithdrawComponent from './components/JspWithdrawComponent';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/jspaddbeneficiary" element={<JspAddbeneficiaryComponent />} />
        <Route path="/jspadmindashboard" element={<JspAdmindashboardComponent />} />
        <Route path="/jspcheckaccount" element={<JspCheckAccountComponent />} />
        <Route path="/jspcreateaccount" element={<JspCreateAccountComponent />} />
        <Route path="/jspcustomer" element={<JspCustomerComponent />} />
        <Route path="/jspcustomeraccounts" element={<JspCustomeraccountsComponent />} />
        <Route path="/jspcustomerdashboard" element={<JspCustomerdashboardComponent />} />
        <Route path="/jspcustomerowninfo" element={<JspCustomerOwnInfoComponent />} />
        <Route path="/" element={<JspDashboardComponent />} />
        <Route path="/jspdashboard" element={<JspDashboardComponent />} />
        <Route path="/jspdeposit" element={<JspDepositComponent />} />
        <Route path="/jspeditfaq" element={<JspEditfaqComponent />} />
        <Route path="/jspedituser" element={<JspEdituserComponent />} />
        <Route path="/jsperrorpage" element={<JspErrorpageComponent />} />
        <Route path="/jspfaq" element={<JspFaqComponent />} />
        <Route path="/jspfaqadmin" element={<JspFaqAdminComponent />} />
        <Route path="/jspforgot" element={<JspForgotComponent />} />
        <Route path="/jspheader" element={<JspHeaderComponent />} />
        <Route path="/jsphiddendashboard" element={<JspHiddenDashboardComponent />} />
        <Route path="/jsphiddendeposit" element={<JspHiddenDepositComponent />} />
        <Route path="/jsphiddenhome" element={<JspHiddenHomeComponent />} />
        <Route path="/jsphiddenwallet" element={<JspHiddenWalletComponent />} />
        <Route path="/jsploandashboard" element={<JspLoanDashboardComponent />} />
        <Route path="/jsploanpage" element={<JspLoanPageComponent />} />
        <Route path="/jsplogin" element={<JspLoginComponent />} />
        <Route path="/jspmessage" element={<JspMessageComponent />} />
        <Route path="/jspministatement" element={<JspMinistatementComponent />} />
        <Route path="/jspotppage" element={<JspOtpPageComponent />} />
        <Route path="/jsppaymenthistory" element={<JspPaymentHistoryComponent />} />
        <Route path="/jsppaymentpage" element={<JspPaymentPageComponent />} />
        <Route path="/jspregister" element={<JspRegisterComponent />} />
        <Route path="/jspresetpassword" element={<JspResetPasswordComponent />} />
        <Route path="/jsptransactions" element={<JspTransactionsComponent />} />
        <Route path="/jspupdateprofile" element={<JspUpdateprofileComponent />} />
        <Route path="/jspuser" element={<JspUserComponent />} />
        <Route path="/jspwithdraw" element={<JspWithdrawComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
