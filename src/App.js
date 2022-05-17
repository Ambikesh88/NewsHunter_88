
import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



 const App =()=>{
  const pageSize=5
  const apiKey= "f0709b1efa6e4ec7a11fb7805c1833d3"
  //  process.env.REACT_APP_NEWS_API
  //  "0dc6c945b98b4fc8a5d4fa1ba36a4302"
  
  const [progress, setProgress] = useState(0)
  
  
    return (
      <div>
        <Router>
       <Navbar/>
       
      <LoadingBar
        color='#f11946' 
        progress={progress}
        height={3}
        
      />

       <Routes>
         <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country="in"  category="general" />}/>
         <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in"  category="business" />}/>
         <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} country="in"  category="entertainment" />}/>
         <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in"  category="general" />}/>
         <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key ="health" pageSize={pageSize} country="in"  category="health" />}/>
         <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in"  category="science" />}/>
         <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in"  category="sports" />}/>
         <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in"  category="technology" />}/>
         {/* <Route exact path="/business"> <News setProgress={setProgress}  pageSize={pageSize} country="in"  category="business" /></Route>
         <Route exact path="/entertainment"> <News setProgress={setProgress}  pageSize={pageSize} country="in"  category="entertainment" /></Route>
         <Route exact path="/general"> <News setProgress={setProgress}  pageSize={pageSize} country="in"  category="general" /></Route>
         <Route exact path="/health"> <News setProgress={setProgress}  pageSize={pageSize} country="in"  category="health" /></Route>
         <Route exact path="/science"> <News setProgress={setProgress}  pageSize={pageSize} country="in"  category="science" /></Route>
         <Route exact path="/sports"> <News setProgress={setProgress}  pageSize={pageSize} country="in"  category="sports" /></Route>
         <Route exact path="/technology"> <News setProgress={setProgress}  pageSize={pageSize} country="in"  category="technology" /></Route> */}
       </Routes>
       </Router>
      </div>
    )
  
}


export default App
