import React, { ReactNode, Fragment } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../store/';
import { RoutesConfig, Route } from '../config/routes.config';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import { Logout } from '../containers';

type NavbarProps = {
	readonly isAuthenticated: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
	const navAuthRoutes: Route[] = Object.keys(RoutesConfig)
		.map((key) => RoutesConfig[key])
		.filter((route) => route.authenticatedRoute === true)
		.sort((a, b) => (b.displayOrder - a.displayOrder));

	const navUnauthRoutes: Route[] = Object.keys(RoutesConfig)
		.map((key) => RoutesConfig[key])
		.filter((route) => route.authenticatedRoute === false)
		.sort((a, b) => (b.displayOrder - a.displayOrder));


	const authenticationHandler = () : ReactNode => {
		return isAuthenticated 
		? mapedAuthRoutes()
		: mapedUnauthRoutes();
	}

	const mapedAuthRoutes = (): ReactNode => {
		return (
			<Fragment>
			{
				navAuthRoutes.map(
					(route: Route): ReactNode => (
						<MDBNavItem key={route.displayName}>
							<MDBNavLink to={route.path} key={route.path} exact={route.exact}>
								{route.displayName}
							</MDBNavLink>
						</MDBNavItem>
				))
			}
			<Logout/>
			</Fragment>
		);
	}

	const mapedUnauthRoutes = (): ReactNode => {
		return (
			<Fragment>
			{
				navUnauthRoutes.map(
					(route: Route): ReactNode => (
						<MDBNavItem key={route.displayName}>
							<MDBNavLink to={route.path} key={route.path} exact={route.exact}>
								{route.displayName}
							</MDBNavLink>
						</MDBNavItem>
				))
			}
			</Fragment>
		);
	}

	return (
		<MDBNavbar className="footer" color="blue" dark expand="md">
			<MDBNavbarBrand>
				<MDBNavLink to="/Portal">
					<strong className="white-text">Stock Master</strong>
				</MDBNavLink>
			</MDBNavbarBrand>
			<MDBNavbarNav right>
				{authenticationHandler()}
			</MDBNavbarNav>
		</MDBNavbar>
	);
};

const mapStateToProps = (state: IApplicationState) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
