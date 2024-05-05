import { RouteType } from "./auth-routes";

//pages
import Dashboard from "../pages/users-dashboard/dashboard";
import Account from "../users-dashboard/account";
import OrderHistory from "../users-dashboard/order-history";
import JobsPage from "../pages/users-dashboard/Jobs";
import ApplicationPage from "../pages/users-dashboard/application";
import ChatPage from "../pages/users-dashboard/chat";
// import NotFoundPage from "../pages/Not-found";

const privateRoutes: RouteType[] = [
    {
        path: '/users-dashboard',
        component:<Dashboard/>
    },
    {
        path: '/account',
        component:<Account />
    },
    {
        path: '/history',
        component:<OrderHistory />
    },
    {
        path: '/jobs',
        component: <JobsPage />
    },
    {
        path: '/job-application',
        component: <ApplicationPage />
    },
    {
        path: '/chats',
        component: <ChatPage />
    },
    // {
    //     path: '*',
    //     component: <NotFoundPage/>
    // },
    
];

export default privateRoutes;