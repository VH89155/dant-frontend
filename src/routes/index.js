

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
import TransactionHistory from '../pages/Web/custom_account/transaction-history';


// Pages Admin

import MoivePage from '../pages/Admin/Moive/moive-page';
import HomeAdmin from '../pages/Admin/statistical/home';
import AddMoive from '../pages/Admin/Moive/addMoive';
import AddShowTime from '../pages/Admin/ShowTime/add-show-time';
import ShowTimePage from '../pages/Admin/ShowTime/showtime';
import TrashMoive from '../pages/Admin/Moive/trash-moive';
import User_Show from '../pages/Admin/User/user';
import New_Manage from '../pages/Admin/PageManage/new-page';
import Ticket_page from '../pages/Admin/ticket-page';
import Discount_page from '../pages/Admin/discount-page';
import ShowTimeSuccess from '../pages/Admin/ShowTime/showtime-success';
import AddCombo from '../pages/Admin/Combo/add-combo';
import Room_page from '../pages/Admin/room-page';
import HomPage_statistical from '../pages/Admin/statistical/homePage';
import Statistical from '../pages/Admin/statistical/statistical';
import PriceTicket_page from '../pages/Admin/price-ticket';
import FormAddUser from '../pages/Admin/User/addUser';
import TrashUser from '../pages/Admin/User/trash-user';
import Banner from '../pages/Admin/PageManage/bannerPage';

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
    {path: '/default/transaction-history', component: TransactionHistory, layout: LayoutDefault},
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
    {path: '/admin/show-time-success', component: ShowTimeSuccess, layout: DashBoardAdmin},
    {path: '/admin/add-combo', component: AddCombo, layout: DashBoardAdmin},
    {path: '/admin/room', component:Room_page, layout: DashBoardAdmin},
    {path: '/admin/today', component:HomPage_statistical, layout: DashBoardAdmin},
    {path: '/admin/statistical', component:Statistical, layout: DashBoardAdmin},
    {path: '/admin/price-ticket', component:PriceTicket_page, layout: DashBoardAdmin},
    {path: '/admin/user/add', component:FormAddUser, layout: DashBoardAdmin},
    {path: '/admin/user/trash', component:TrashUser, layout: DashBoardAdmin},
    {path: '/admin/banner-page', component:Banner, layout: DashBoardAdmin},


];  
const privateRoutes = [];


export {publicRoutes,privateRoutes}