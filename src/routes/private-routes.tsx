import { RouteType } from "./auth-routes";

//pages
import Dashboard from "../pages/users-dashboard/dashboard";
import SellCrypto from "../users-dashboard/sell-crypto";
import TradeGiftcard from "../users-dashboard/trade-giftcard";
import Account from "../users-dashboard/account";
import OrderHistory from "../users-dashboard/order-history";
import BuyCrypto from "../pages/users-dashboard/buy-crypto";
import Airtime from "../users-dashboard/airtime";
import JobsPage from "../pages/users-dashboard/Jobs";
import ApplicationPage from "../pages/users-dashboard/application";
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
        path: '/sell-crypto',
        component:<SellCrypto />
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
    // {
    //     path: '*',
    //     component: <NotFoundPage/>
    // },
    
];

export default privateRoutes;