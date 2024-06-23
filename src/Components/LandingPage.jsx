import PaymentsPage from "./PaymentsPage";
const LandingPage = () => {
  return (
    <>
      <div className="container bg-black w-100 d-flex justify-content-center">
        <h1 className="display-1 fw-bold text-white">Hello World I am React</h1>
      </div>
      <div>
        <PaymentsPage />
      </div>
    </>
  )
}

export default LandingPage;
