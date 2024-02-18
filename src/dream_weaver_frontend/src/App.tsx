import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import MePage from "./pages/me-page/me-page";
import MainTemplate from "./templates/main-template";

function App() {
  return <>
    <MainTemplate>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/me" element={<MePage/>}/>
        </Routes>
      </BrowserRouter>
    </MainTemplate>
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
