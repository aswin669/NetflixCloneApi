import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Banner from "./Components/Banner/Banner";
import './App.css'
import TitleCards from "./Components/TitleCards/TitleCards";
import Footer from "./Components/footer/footer";
function App() {
  return (
    <div className="App">
      <NavBar />
     <Banner />
     <TitleCards category="trending" />
      <TitleCards category="action" />
       <TitleCards category="originals" />
        <TitleCards category="comedy" /> 
        <TitleCards category="horror" /> 
        <TitleCards category="romance" /> 
     <TitleCards category="documentaries" />
     <Footer />
    </div>
  );
}

export default App;
