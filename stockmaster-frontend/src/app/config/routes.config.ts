export type Route = {
	readonly exact?: boolean;
	readonly path: string;
	readonly type?: string;
	//readonly pathAbsolute?: string;
	readonly displayName: string;
	readonly authenticatedRoute?: boolean;
};

export type RoutesConfig = { [key: string]: Route };

export const RoutesConfig = Object.freeze<RoutesConfig>({
	Register: {
		exact: true,
		type: 'Register',
		path: '/Register',
		displayName: 'Register',
		authenticatedRoute: false,
	},

	Login: {
		exact: true,
		type: 'UnauthenticatedNav',
		path: '/Login',
		displayName: 'Login',
		authenticatedRoute: false,
	},

	Portal: {
		exact: true,
		path: '/Portal',
		displayName: 'Portal',
		authenticatedRoute: true,
	},

	Logout: {
		exact: true,
		type: 'Logout',
		path: '/Logout',
		displayName: 'Logout',
	},
});
