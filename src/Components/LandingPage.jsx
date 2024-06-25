import PaymentsPage from "./PaymentsPage";
import GetToken from "./GetToken";
const LandingPage = () => {
  return (
    <>
      <div>
        <PaymentsPage />
      </div>
      <div className=" my-5 bg-tertiary py-5 shadow-lg flex justify-content-center row container-fluid">
        <p className="text-black fw-bold">Click the button below to access the payment gateway</p>
        <GetToken />
      </div>
    </>
  )
}

export default LandingPage;
