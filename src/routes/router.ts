import { ROUTER_USER } from "../common/constants";
import DefaultLayout from "../layouts/DefaultLayout";
import CVManagement from "../pages/CVManagement";
import HomePage from "../pages/HomePage";

export const routerUser = [
    { path: ROUTER_USER.HOME, element: HomePage, layout: DefaultLayout },
    { path: ROUTER_USER.MANAGEMENT_CV, element: CVManagement, layout: DefaultLayout },
];