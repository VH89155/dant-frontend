
import { Input } from 'antd';
import { publicRoutes } from "./routes/index";
import './App.css';
import LayoutDefault from './components/Layout/LayoutDefault/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllMoive } from "../src/redux/apiRequest";



function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    getAllMoive(dispatch)
  },[])
 return (
    <Router>
    <>
        <Routes>
        
            {publicRoutes.map((route, index) => {
                let Layout= Fragment ;
                if(route.layout){
                    Layout = route.layout
                }
                else if (route.layout === null){
                    Layout = Fragment
                }
                const Page = route.component;
                
                return <Route key={index} path={route.path} element={
                <Layout >
                   
                    <Page />
                    
                   
                </Layout>
                } />;
            })}
           
        </Routes>
        
    </>
</Router>
  )
  ;
}

export default App;
