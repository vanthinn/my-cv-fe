export const ROUTER_USER = Object.freeze({
    LOGIN: 'auth/login',
    SIGNUP: 'auth/sign-up',
    FORGOT_PASSWORD: 'auth/forgot-password',
    HOME: '/',
    JOB_DETAIL: 'jobs/"id',
    MANAGEMENT_CV: '/manager-cv',
    NEW_RESUME: '/new-cv',
    CV_DETAIL: '/cv/:id',
    PREVIEW_RESUME: '/preview-cv',
    COMPANY: '/company',
    COMPANY_DETAIL: '/company/:id',
    BLOG: '/blog',
    BLOG_DETAIL: '/blog/:id',
    PROFILE: '/profile/:id',
});

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
        id: 'all'
    },
    {
        label: "No experience",
        name: "No experience",
        id: '0'
    },
    {
        label: "Less than 1 year ",
        name: "Less than 1 year",
        id: '1'
    },
    {
        label: "1 – 3 years",
        name: "1 – 3 years",
        id: '2'
    },
    {
        label: "3 – 5 years",
        name: "3 – 5 years",
        id: '3'
    },
    {
        label: "More than 5 years",
        name: "More than 5 years",
        id: '4'
    },
]



