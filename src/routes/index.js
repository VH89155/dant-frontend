

// Layout
import DashBoardPage from '../components/Layout/DashBoardPage/DashBoardPage'


// Pages- WEB

import  Home from "../pages/Web/home"
import Details from '../pages/Web/details';
import ShowTimes from '../pages/Web/showtimes';
import News from '../pages/Web/news';
import TicketPrice from '../pages/Web/ticket_price';
import TicketBooking from '../pages/Web/ticket_booking';


const publicRoutes =[
    {path: '/', component: Home, layout: DashBoardPage},
    {path: '/details', component: Details, layout: DashBoardPage},
    {path: '/show-time', component: ShowTimes, layout: DashBoardPage},
    {path: '/news', component: News, layout: DashBoardPage},
    {path: '/ticket-price', component: TicketPrice, layout: DashBoardPage},
    {path: '/ticket-booking', component: TicketBooking, layout: DashBoardPage},


];
const privateRoutes = [];


export {publicRoutes,privateRoutes}