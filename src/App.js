import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './../src/Components/Layout/Dashboard';
import Login from './../src/Components/Layout/Login/Login';

function App() {  
  return (
<GoogleOAuthProvider clientId="485922282449-s1leke8fnqm4gkqnqge5a0brr71046n3.apps.googleusercontent.com">
<BrowserRouter>
       <div className="App">
      <Routes>
      <Route   path="/dashboard" element={<Dashboard />}  />

        <Route  exact path="/" element={<Login />}>
         {/* <Route path="*" element={<NoPage />} />*/}
        </Route>
      </Routes> 
      </div>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
