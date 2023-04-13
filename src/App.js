
import { Input } from 'antd';
import { publicRoutes } from "./routes/index";
import './App.css';
import DashBoardPage from './components/Layout/DashBoardPage/DashBoardPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';




function App() {
 
 return (
    <Router>
    <>
        <Routes>
        
            {publicRoutes.map((route, index) => {
                let Layout= DashBoardPage ;
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
