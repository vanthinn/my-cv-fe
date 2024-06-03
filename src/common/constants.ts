export const ROUTER_USER = Object.freeze({
    LOGIN: 'auth/login',
    SIGNUP: 'auth/sign-up',
    FORGOT_PASSWORD: 'auth/forgot-password',
    HOME: '/',
    BOOKMARK: '/list-bookmark',
    MESSAGE: '/message',
    MESSAGE_GROUP: '/message/:id',
    HISTORY: '/history',
    JOB_DETAIL: 'jobs/:id',
    MANAGEMENT_CV: '/manager-cv',
    NEW_RESUME: '/new-cv',
    CV_DETAIL: '/cv/:id',
    PREVIEW_RESUME: '/preview-cv/:id',
    COMPANY: '/company',
    COMPANY_DETAIL: '/company/:id',
    BLOG: '/blog',
    BLOG_DETAIL: '/blog/:id',
    PROFILE: '/profile/:id',
});

export const ROUTER_EMPLOYER = Object.freeze({
    LOGIN: '/employer/auth/login',
    SIGNUP: '/employer/auth/sign-up',
    FORGOT_PASSWORD: '/employer/auth/forgot-password',
    HOME: '/employer',
    SETTING: '/employer/account-setting',
    CHANGE_PASSWORD: 'change-password',
    PROFILE: 'profile',
    INFO_COMPANY: 'info-company',
    BUSINESS_LICENSE: 'business-license',
    RECRUITMENT_MANAGER: '/employer/recruitment-management',
    DETAIL_JOB: '/employer/recruitment-management/:id',
    CV_MANAGER: '/employer/cv-management',
    CHAT_SERVICE: '/employer/chat-service',
    CHAT_SERVICE_ROOM: ':id'
});

export const urlsNoTokenRequired = ["/", "/company"]

export const TENANT = Object.freeze({
    EMPLOYER: 'ad87d793-7579-40fa-88c0-79b99551cb9e',
    USER: '32788ede-ae28-4600-8903-22be70ba47d2',
});




export const ROLE_ID = Object.freeze({
    EMPLOYER: '70f000b0-1a42-4102-99df-78314c44bce0',
    USER: '6d091d62-158f-4037-b8b1-ac3a3ba26511',
});

export const fonts = [
    { name: 'Poppins', value: 'Poppins, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lobster', value: 'Lobster, cursive' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Lora', value: 'Lora, serif' },
    { name: 'Pacifico', value: 'Pacifico, cursive' }
];

export const DATA_SIDEBAR = [
    {
        id: 0,
        name: 'Dashboard',
        pathName: "/employer",
        icon: "dashboard",
        children: [],
    },
    {
        id: 1,
        name: 'Account settings',
        pathName: "/employer/account-setting/profile",
        icon: "setting",
        children: [],
    },
    {
        id: 2,
        name: 'Recruitment',
        pathName: "/employer/recruitment-management",
        icon: "recruitment",
        children: [],
    },
    {
        id: 3,
        name: 'CV management',
        pathName: "/employer/cv-management",
        icon: "cv",
        children: [],
    },
    {
        id: 4,
        name: 'Chat service',
        pathName: "/employer/chat-service",
        icon: "chat",
        children: [],
    },
];

export const LIST_COUNTRY = [
    { label: "All Cities", name: "All Cities" },
    { label: "Hà Nội", name: "Hà Nội" },
    { label: "Hồ Chí Minh", name: "Hồ Chí Minh" },
    { label: "Đà Nẵng", name: "Đà Nẵng" },
    { label: "Hải Phòng", name: "Hải Phòng" },
    { label: "Cần Thơ", name: "Cần Thơ" },
    { label: "An Giang", name: "An Giang" },
    { label: "Bà Rịa - Vũng Tàu", name: "Bà Rịa - Vũng Tàu" },
    { label: "Bắc Giang", name: "Bắc Giang" },
    { label: "Bắc Kạn", name: "Bắc Kạn" },
    { label: "Bạc Liêu", name: "Bạc Liêu" },
    { label: "Bắc Ninh", name: "Bắc Ninh" },
    { label: "Bến Tre", name: "Bến Tre" },
    { label: "Bình Định", name: "Bình Định" },
    { label: "Bình Dương", name: "Bình Dương" },
    { label: "Bình Phước", name: "Bình Phước" },
    { label: "Bình Thuận", name: "Bình Thuận" },
    { label: "Cà Mau", name: "Cà Mau" },
    { label: "Cao Bằng", name: "Cao Bằng" },
    { label: "Đắk Lắk", name: "Đắk Lắk" },
    { label: "Đắk Nông", name: "Đắk Nông" },
    { label: "Điện Biên", name: "Điện Biên" },
    { label: "Đồng Nai", name: "Đồng Nai" },
    { label: "Đồng Tháp", name: "Đồng Tháp" },
    { label: "Gia Lai", name: "Gia Lai" },
    { label: "Hà Giang", name: "Hà Giang" },
    { label: "Hà Nam", name: "Hà Nam" },
    { label: "Hà Tĩnh", name: "Hà Tĩnh" },
    { label: "Hải Dương", name: "Hải Dương" },
    { label: "Hậu Giang", name: "Hậu Giang" },
    { label: "Hòa Bình", name: "Hòa Bình" },
    { label: "Hưng Yên", name: "Hưng Yên" },
    { label: "Khánh Hòa", name: "Khánh Hòa" },
    { label: "Kiên Giang", name: "Kiên Giang" },
    { label: "Kon Tum", name: "Kon Tum" },
    { label: "Lai Châu", name: "Lai Châu" },
    { label: "Lâm Đồng", name: "Lâm Đồng" },
    { label: "Lạng Sơn", name: "Lạng Sơn" },
    { label: "Lào Cai", name: "Lào Cai" },
    { label: "Long An", name: "Long An" },
    { label: "Nam Định", name: "Nam Định" },
    { label: "Nghệ An", name: "Nghệ An" },
    { label: "Ninh Bình", name: "Ninh Bình" },
    { label: "Ninh Thuận", name: "Ninh Thuận" },
    { label: "Phú Thọ", name: "Phú Thọ" },
    { label: "Quảng Bình", name: "Quảng Bình" },
    { label: "Quảng Nam", name: "Quảng Nam" },
    { label: "Quảng Ngãi", name: "Quảng Ngãi" },
    { label: "Quảng Ninh", name: "Quảng Ninh" },
    { label: "Quảng Trị", name: "Quảng Trị" },
    { label: "Sóc Trăng", name: "Sóc Trăng" },
    { label: "Sơn La", name: "Sơn La" },
    { label: "Tây Ninh", name: "Tây Ninh" },
    { label: "Thái Bình", name: "Thái Bình" },
    { label: "Thái Nguyên", name: "Thái Nguyên" },
    { label: "Thanh Hóa", name: "Thanh Hóa" },
    { label: "Thừa Thiên-Huế", name: "Thừa Thiên-Huế" },
    { label: "Tiền Giang", name: "Tiền Giang" },
    { label: "Trà Vinh", name: "Trà Vinh" },
    { label: "Tuyên Quang", name: "Tuyên Quang" },
    { label: "Vĩnh Long", name: "Vĩnh Long" },
    { label: "Vĩnh Phúc", name: "Vĩnh Phúc" },
    { label: "Yên Bái", name: "Yên Bái" }
]

export const stateEducation = [
    {
        label: "In progress",
        name: "In progress",
        id: 'In progress'
    },

    {
        label: "Graduated",
        name: "Graduated",
        id: 'Graduated'
    },
]

export const stateLevel = [
    {
        label: "Novice",
        name: "Novice",
        id: 'Novice'
    },
    {
        label: "Beginners",
        name: "Beginners",
        id: 'Beginners'
    },
    {
        label: "Intermediate",
        name: "Intermediate",
        id: 'Intermediate'
    },
    {
        label: "Proficient",
        name: "Proficient",
        id: 'Proficient'
    },
    {
        label: "Expert",
        name: "Expert",
        id: 'Expert'
    },
]

export const experienceEnum = [
    {
        label: "All experience",
        name: "All experience",
        id: 'All experience'
    },
    {
        label: "No experience",
        name: "No experience",
        id: 'No experience'
    },
    {
        label: "Less than 1 year",
        name: "Less than 1 year",
        id: 'Less than 1 year'
    },
    {
        label: "1 – 3 of years",
        name: "1 – 3 of years",
        id: '1 – 3 of years'
    },
    {
        label: "3 – 5 of years",
        name: "3 – 5 of years",
        id: '3 – 5 of years'
    },
    {
        label: "More than 5 years",
        name: "More than 5 years",
        id: 'More than 5 years'
    },
]

export const experienceAdd = [{
    label: "No experience",
    name: "No experience",
    id: 'No experience'
},
{
    label: "Less than 1 year",
    name: "Less than 1 year",
    id: 'Less than 1 year'
},
{
    label: "1 – 3 of years",
    name: "1 – 3 of years",
    id: '1 – 3 of years'
},
{
    label: "3 – 5 of years",
    name: "3 – 5 of years",
    id: '3 – 5 of years'
},
{
    label: "More than 5 years",
    name: "More than 5 years",
    id: 'More than 5 years'
},]

export const educationData = [
    {
        label: "Minimum Associate Degree",
        name: "Minimum Associate Degree",
        id: 'Minimum Associate Degree'
    },
    {
        label: "Minimum College Degree",
        name: "Minimum College Degree",
        id: 'Minimum College Degree'
    },
    {
        label: "Minimum Bachelor’s Degree",
        name: "Minimum Bachelor’s Degree",
        id: 'Minimum Bachelor’s Degree'
    },
    {
        label: "Minimum High School",
        name: "Minimum High School",
        id: 'Minimum High School'
    },
]

export const jobTypeData = [
    {
        label: "Full-Time",
        name: "Full-Time",
        id: 'Full-Time'
    },
    {
        label: "Part-Time",
        name: "Part-Time",
        id: 'Part-Time'
    },
    {
        label: "Full-Time - Remote",
        name: "Full-Time - Remote",
        id: 'Full-Time - Remote'
    },
    {
        label: "Part-Time - Remote",
        name: "Part-Time - Remote",
        id: 'Part-Time - Remote'
    },

]

export const scaleData = [
    {
        label: "11 - 50 employees",
        name: "11 - 50 employees",
        id: '11 - 50 employees'
    },
    {
        label: "100 - 200 employees",
        name: "100 - 200 employees",
        id: '100 - 200 employees'
    },
    {
        label: "201 - 500 employees",
        name: "201 - 500 employees",
        id: '201 - 500 employees'
    },
    {
        label: "501 - 1000 employees",
        name: "501 - 1000 employees",
        id: '501 - 1000 employees'
    },
    {
        label: "1000 - 2000 employees",
        name: "1000 - 2000 employees",
        id: '1000 - 2000 employees'
    },
    {
        label: "More than 2000 employees",
        name: "More than 2000 employees",
        id: 'More than 2000 employees'
    },
]

export const fieldOfActivityData = [
    {
        label: "Marketing and Logistics",
        name: "Marketing and Logistics",
        id: 'Marketing and Logistics'
    },
    {
        label: "Consumer Services",
        name: "Consumer Services",
        id: 'Consumer Services'
    },
    {
        label: "Information Technology and Services",
        name: "Information Technology and Services",
        id: 'Information Technology and Services'
    },
    {
        label: "Automotive",
        name: "Automotive",
        id: 'Automotive'
    },
    {
        label: "Hospital & Health Care",
        name: "Hospital & Health Care",
        id: 'Hospital & Health Care'
    },
    {
        label: "Architecture & Planning",
        name: "Architecture & Planning",
        id: 'Architecture & Planning'
    },
    {
        label: "Accounting",
        name: "Accounting",
        id: 'Accounting'
    },
    {
        label: "Cosmetics",
        name: "Cosmetics",
        id: 'Cosmetics'
    },
    {
        label: "Construction",
        name: "Construction",
        id: 'Construction'
    },
    {
        label: "Real Estate",
        name: "Real Estate",
        id: 'Real Estate'
    },
    {
        label: "Financial Services",
        name: "Financial Services",
        id: 'Financial Services'
    },
]



