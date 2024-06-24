import PaymentsPage from "./PaymentsPage";
import GetToken from "./GetToken";
const LandingPage = () => {
  return (
    <>
      <div className="bg-black w-100 d-flex justify-content-center">
        <h1 className="display-1 fw-bold text-white">Hello World</h1>
      </div>
      {/* <div>
        <PaymentsPage />
      </div> */}
      <div className=" my-5 bg-dark py-5 shadow-lg flex">
        <p className="text-white fw-bold">Click the button below to access the payment gateway</p>
        <GetToken />
      </div>
    </>
  )
}

export default LandingPage;
