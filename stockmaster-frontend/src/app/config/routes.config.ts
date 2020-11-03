export type Route = {
	readonly exact?: boolean;
	readonly path: string;
	readonly type?: string;
	//readonly pathAbsolute?: string;
	readonly displayName: string;
	readonly authenticatedRoute?: boolean;
};

export const RoutesConfig = Object.freeze<{ [key: string]: Route }>({
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

	Logout: {
		exact: true,
		type: 'Logout',
		path: '/Logout',
		displayName: 'Logout',
	},
});
