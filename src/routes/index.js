

// Layout
import LayoutDefault from '../components/Layout/LayoutDefault/Layout'
import DashBoardAdmin from '../components/Layout/LayoutAdmin/DashBoardAdmin';

// Pages- WEB

import  Home from "../pages/Web/home"
import Details from '../pages/Web/details';
import ShowTimes from '../pages/Web/showtimes';
import News from '../pages/Web/news';
import TicketPrice from '../pages/Web/ticket_price';
import TicketBooking from '../pages/Web/ticket_booking';
import Login from '../pages/Web/login';
import Register from '../pages/Web/register';
import Book_Ticket from '../pages/Web/bookTicket';
import PayMent from '../pages/Web/paymet';


/// Custom -account

import DefaultCustom_Acc from '../pages/Web/custom_account/custom_account';
import Account_edit from '../pages/Web/custom_account/account_edit';

// Pages Admin

import HomeAdmin from '../pages/Admin/home';
import AddMoive from '../pages/Admin/addMoive';
import AddShowTime from '../pages/Admin/add-show-time';


const publicRoutes =[
    {path: '/', component: Home, layout: LayoutDefault},
    {path: '/details/:moiveId', component: Details, layout: LayoutDefault},
    {path: '/show-time', component: ShowTimes, layout: LayoutDefault},
    {path: '/news', component: News, layout: LayoutDefault},
    {path: '/ticket-price', component: TicketPrice, layout: LayoutDefault},
    {path: '/ticket-booking', component: TicketBooking, layout: LayoutDefault},
    {path: '/book-ticket/:showtimeId', component: Book_Ticket, layout: LayoutDefault},
    {path: '/default/custom-account', component: DefaultCustom_Acc, layout: LayoutDefault},
    {path: '/default/custom-account/edit', component: Account_edit, layout: LayoutDefault},

    {path: '/default/payment', component: PayMent, layout: LayoutDefault},

    {path: '/login', component: Login, layout: LayoutDefault},
    {path: '/register', component: Register, layout: LayoutDefault},



    // Admin routes
    {path: '/admin', component: HomeAdmin, layout: DashBoardAdmin},
    {path: '/admin/add-moive', component: AddMoive, layout: DashBoardAdmin},
    {path: '/admin/add-show-time', component: AddShowTime, layout: DashBoardAdmin},
];  
const privateRoutes = [];


export {publicRoutes,privateRoutes}