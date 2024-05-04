import { ROUTER_USER } from "../common/constants";
import DetailResume from "../components/DetailResume";
import PreviewResume from "../components/PreviewResume";
import DefaultLayout from "../layouts/DefaultLayout";
import CVManagement from "../pages/CVManagement";
import Company from "../pages/Company";
import HomePage from "../pages/HomePage";

export const routerUser = [
    { path: ROUTER_USER.HOME, element: HomePage, layout: DefaultLayout },
    { path: ROUTER_USER.MANAGEMENT_CV, element: CVManagement, layout: DefaultLayout },
    { path: ROUTER_USER.NEW_RESUME, element: DetailResume, layout: DefaultLayout },
    { path: ROUTER_USER.COMPANY, element: Company, layout: DefaultLayout },
    { path: ROUTER_USER.PREVIEW_RESUME, element: PreviewResume, layout: DefaultLayout }

];