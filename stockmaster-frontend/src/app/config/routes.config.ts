export type Route = {
    readonly exact?: boolean;
    readonly path: string;
    readonly type?: string;
    //readonly pathAbsolute?: string;
    readonly displayName: string;
    readonly authenticatedRoute?: boolean;
    readonly displayOrder: number | 0;
};

export const RoutesConfig = Object.freeze<{ [key: string]: Route }>({
    Register: {
        exact: true,
        type: 'Register',
        path: '/Register',
        displayName: 'Register',
        authenticatedRoute: false,
        displayOrder: 1,
    },

    Login: {
        exact: true,
        type: 'Login',
        path: '/Login',
        displayName: 'Login',
        authenticatedRoute: false,
        displayOrder: 2,
    },

    Logout: {
        exact: true,
        type: 'Logout',
        path: '/Logout',
        displayName: 'Logout',
        displayOrder: 3,
    },

    Dashboard: {
        exact: true,
        type: 'Dashboard',
        path: '/Dashboard',
        displayName: 'Dashboard',
        authenticatedRoute: true,
        displayOrder: 4,
    },
});
