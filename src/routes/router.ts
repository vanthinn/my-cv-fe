import { ROUTER_EMPLOYER, ROUTER_USER } from "../common/constants";
import DetailResume from "../components/DetailResume";
import PreviewResume from "../components/PreviewResume";
import DefaultLayout from "../layouts/DefaultLayout";
import LayoutEmployer from "../layouts/LayoutEmployer";
import AccountSetting from "../pages/AccountSetting/AccountSetting";
import BusinessLicense from "../pages/AccountSetting/components/BusinessLicense";
import ChangePassword from "../pages/AccountSetting/components/ChangePassword";
import InfoCompany from "../pages/AccountSetting/components/InfoCompany";
import Profile from "../pages/AccountSetting/components/Profile";
import CVManagement from "../pages/CVManagement";
import Company from "../pages/Company";
import EmployerCVManager from "../pages/EmployerCVManager";
import HomeEmployer from "../pages/HomeEmployer";
import HomePage from "../pages/HomePage";
import RecruitmentManagement from "../pages/RecruitmentManagement";
import DetailJob from "../pages/RecruitmentManagement/components/DetailJob/DetailJob";

export const routerUser = [
    { path: ROUTER_USER.HOME, element: HomePage, layout: DefaultLayout },
    { path: ROUTER_USER.MANAGEMENT_CV, element: CVManagement, layout: DefaultLayout },
    { path: ROUTER_USER.NEW_RESUME, element: DetailResume, layout: DefaultLayout },
    { path: ROUTER_USER.COMPANY, element: Company, layout: DefaultLayout },
    { path: ROUTER_USER.PREVIEW_RESUME, element: PreviewResume, layout: DefaultLayout }
];

export const routerEmployer = [
    { path: ROUTER_EMPLOYER.HOME, element: HomeEmployer, layout: LayoutEmployer },
    {
        path: ROUTER_EMPLOYER.SETTING, element: AccountSetting, layout: LayoutEmployer,
        children: [
            { path: ROUTER_EMPLOYER.CHANGE_PASSWORD, element: ChangePassword },
            { path: ROUTER_EMPLOYER.PROFILE, element: Profile },
            { path: ROUTER_EMPLOYER.INFO_COMPANY, element: InfoCompany },
            { path: ROUTER_EMPLOYER.BUSINESS_LICENSE, element: BusinessLicense }
        ]
    },
    { path: ROUTER_EMPLOYER.RECRUITMENT_MANAGER, element: RecruitmentManagement, layout: LayoutEmployer },
    { path: ROUTER_EMPLOYER.DETAIL_JOB, element: DetailJob, layout: LayoutEmployer },
    { path: ROUTER_EMPLOYER.CV_MANAGER, element: EmployerCVManager, layout: LayoutEmployer }

]