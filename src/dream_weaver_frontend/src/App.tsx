import { BrowserRouter, Route, Routes } from "react-router-dom";
import CashflowPage from "./pages/cashflow-page";
import CrowdfundDetailPage from "./pages/crowdfund-detail-page";
import CrowdfundPage from "./pages/crowdfund-page/crowdfund-page";
import DonatePage from "./pages/donate-page";
import HomePage from "./pages/home-page";
import MePage from "./pages/me-page/me-page";
import ProfilePage from "./pages/profile-page";
import MainTemplate from "./templates/main-template";

function App() {
  return <>
      <BrowserRouter>
        <MainTemplate>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/me" element={<MePage/>}/>
            <Route path="/cashflow" element={<CashflowPage/>}/>
            <Route path="/donate/:name" element={<DonatePage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/crowdfund" element={<CrowdfundPage/>}/>
            <Route path="/crowdfund/:id" element={<CrowdfundDetailPage/>}/>
          </Routes>
        </MainTemplate>
      </BrowserRouter>
  </>

  // const [greeting, setGreeting] = useState('');

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;
  //   dream_weaver_backend.greet(name).then((greeting) => {
  //     setGreeting(greeting);
  //   });
  //   return false;
  // }

  // return (
  //   <main>
  //     <img src="/logo2.svg" alt="DFINITY logo" />
  //     <br />
  //     <br />
  //     <form action="#" onSubmit={handleSubmit}>
  //       <label htmlFor="name">Enter your name: &nbsp;</label>
  //       <input id="name" alt="Name" type="text" />
  //       <button type="submit">Click Me!</button>
  //     </form>
  //     <section id="greeting">{greeting}</section>
  //   </main>
  // );
}

export default App;
