import { ROUTER_EMPLOYER, ROUTER_USER } from "../common/constants";
import DetailResume from "../components/DetailResume";
import PreviewResume from "../components/PreviewResume";
import DefaultLayout from "../layouts/DefaultLayout";
import LayoutEmployer from "../layouts/LayoutEmployer";
import MessageLayout from "../layouts/MessageLayout";
import AccountSetting from "../pages/AccountSetting/AccountSetting";
import BusinessLicense from "../pages/AccountSetting/components/BusinessLicense";
import ChangePassword from "../pages/AccountSetting/components/ChangePassword";
import InfoCompany from "../pages/AccountSetting/components/InfoCompany";
import Profile from "../pages/AccountSetting/components/Profile";
import Bookmark from "../pages/Bookmark";
import CVManagement from "../pages/CVManagement";
import ChatService from "../pages/ChatService";
import Company from "../pages/Company";
import CompanyDetail from "../pages/CompanyDetail";
import EmployerCVManager from "../pages/EmployerCVManager";
import History from "../pages/History";
import HomeEmployer from "../pages/HomeEmployer";
import HomePage from "../pages/HomePage";
import JobOfferDetail from "../pages/JobOfferDetail/JobOfferDetail";
import Message from "../pages/Message";
import RecruitmentManagement from "../pages/RecruitmentManagement";
import DetailJob from "../pages/RecruitmentManagement/components/DetailJob/DetailJob";

export const routerUser = [
    { path: ROUTER_USER.HOME, element: HomePage, layout: DefaultLayout },
    { path: ROUTER_USER.MANAGEMENT_CV, element: CVManagement, layout: DefaultLayout },
    { path: ROUTER_USER.NEW_RESUME, element: DetailResume, layout: DefaultLayout },
    { path: ROUTER_USER.CV_DETAIL, element: DetailResume, layout: DefaultLayout },
    { path: ROUTER_USER.COMPANY, element: Company, layout: DefaultLayout },
    { path: ROUTER_USER.COMPANY_DETAIL, element: CompanyDetail, layout: DefaultLayout },
    { path: ROUTER_USER.PREVIEW_RESUME, element: PreviewResume, layout: DefaultLayout },
    { path: ROUTER_USER.BOOKMARK, element: Bookmark, layout: DefaultLayout },
    { path: ROUTER_USER.JOB_DETAIL, element: JobOfferDetail, layout: DefaultLayout },
    { path: ROUTER_USER.HISTORY, element: History, layout: DefaultLayout },
    { path: ROUTER_USER.MESSAGE, element: Message, layout: MessageLayout },
    { path: ROUTER_USER.MESSAGE_GROUP, element: Message, layout: MessageLayout }

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
    { path: ROUTER_EMPLOYER.CV_MANAGER, element: EmployerCVManager, layout: LayoutEmployer },
    {
        path: ROUTER_EMPLOYER.CHAT_SERVICE, element: ChatService, layout: LayoutEmployer, children: [
            { path: ROUTER_EMPLOYER.CHAT_SERVICE_ROOM, element: Message },
        ]
    }


]