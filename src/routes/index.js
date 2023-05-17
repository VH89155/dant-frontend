

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
import PayPal_succes from '../pages/Web/paypal-succes';
import News_detail from '../pages/Web/new-detail';

/// Custom -account

import DefaultCustom_Acc from '../pages/Web/custom_account/custom_account';
import Account_edit from '../pages/Web/custom_account/account_edit';
import Ticket_Acc from '../pages/Web/custom_account/ticket-acc';
import MoivePage from '../pages/Admin/moive-page';


// Pages Admin

import HomeAdmin from '../pages/Admin/home';
import AddMoive from '../pages/Admin/addMoive';
import AddShowTime from '../pages/Admin/add-show-time';
import ShowTimePage from '../pages/Admin/showtime';
import TrashMoive from '../pages/Admin/trash-moive';
import User_Show from '../pages/Admin/user';
import New_Manage from '../pages/Admin/new-page';
import Ticket_page from '../pages/Admin/ticket-page';
import Discount_page from '../pages/Admin/discount-page';

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
    {path: '/default/ticket', component: Ticket_Acc, layout: LayoutDefault},
    {path: '/news/:id', component: News_detail, layout: LayoutDefault},



//  -------------- Pay ment --------
    {path: '/default/payment', component: PayMent, layout: LayoutDefault},
    {path: '/default/payment-succes', component: PayPal_succes},

    

    
    {path: '/login', component: Login, layout: LayoutDefault},
    {path: '/register', component: Register, layout: LayoutDefault},



    // Admin routes
    {path: '/admin', component: HomeAdmin, layout: DashBoardAdmin},
    {path: '/admin/add-moive', component: AddMoive, layout: DashBoardAdmin},
    {path: '/admin/add-show-time', component: AddShowTime, layout: DashBoardAdmin},
    {path: '/admin/show-time', component: ShowTimePage, layout: DashBoardAdmin},
    {path: '/admin/moive', component: MoivePage, layout: DashBoardAdmin},
    {path: '/admin/trash-moive', component: TrashMoive, layout: DashBoardAdmin},
    {path: '/admin/user', component: User_Show, layout: DashBoardAdmin},
    {path: '/admin/news', component: New_Manage, layout: DashBoardAdmin},
    {path: '/admin/tickets', component: Ticket_page, layout: DashBoardAdmin},
    {path: '/admin/discount', component: Discount_page, layout: DashBoardAdmin},



];  
const privateRoutes = [];


export {publicRoutes,privateRoutes}