import React, { ReactNode, Fragment } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../store/';
import { RoutesConfig, Route } from '../config/routes.config';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import Logout from '../containers/Auth/Logout/Logout';

type NavbarProps = {
	readonly isAuthenticated: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
	const navAuthRoutes: Route[] = Object.keys(RoutesConfig)
		.map((key) => RoutesConfig[key])
		.filter((route) => route.authenticatedRoute === true);

	const navUnauthRoutes: Route[] = Object.keys(RoutesConfig)
		.map((key) => RoutesConfig[key])
		.filter((route) => route.authenticatedRoute === false);

	return (
		<nav>
			<MDBNavbar className="footer" color="blue" dark expand="md">
				<MDBNavbarBrand>
					<MDBNavLink to="/Portal">
						<strong className="white-text">Stock Master</strong>
					</MDBNavLink>
				</MDBNavbarBrand>
				<MDBNavbarNav right>
					{(() => {
						if (isAuthenticated) {
							return (
								<Fragment>
									{navAuthRoutes.map(
										(route: Route): ReactNode => (
											<MDBNavItem key={route.displayName}>
												<MDBNavLink to={route.path} key={route.path} exact={route.exact}>
													{route.displayName}
												</MDBNavLink>
											</MDBNavItem>
										),
									)}
									<Logout />
								</Fragment>
							);
						} else {
							return navUnauthRoutes.map(
								(route: Route): ReactNode => (
									<MDBNavItem key={route.displayName}>
										<MDBNavLink to={route.path} key={route.path} exact={route.exact}>
											{route.displayName}
										</MDBNavLink>
									</MDBNavItem>
								),
							);
						}
					})()}
				</MDBNavbarNav>
			</MDBNavbar>
		</nav>
	);
};

const mapStateToProps = (state: IApplicationState) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
