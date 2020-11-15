import React, { ReactNode, Fragment } from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../store/';
import { actionCreators, reducer } from '../../../store/auth';
import { RoutesConfig, Route } from '../../../config/routes.config';
import { MDBNavItem, MDBNavLink } from 'mdbreact';

type LogoutProps = ReturnType<typeof reducer> & typeof actionCreators & { readonly history: History };

const Logout: React.FC<LogoutProps> = ({ logoutUserRequest }) => {
	const logoutRoute: Route[] = Object.keys(RoutesConfig)
		.map((key) => RoutesConfig[key])
		.filter((route) => route.type === 'Logout');

	const handleLogout = (e: React.ChangeEvent<HTMLFormElement>): void => {
		logoutUserRequest();
	};

	return (
		<Fragment>
			{logoutRoute.map(
				(route: Route): ReactNode => (
					<MDBNavItem key={route.displayName}>
						<MDBNavLink to={route.path} key={route.path} exact={route.exact} onClick={handleLogout}>
							{route.displayName}
						</MDBNavLink>
					</MDBNavItem>
				),
			)}
		</Fragment>
	);
};

const mapStateToProps = (state: IApplicationState) => state.auth

export default connect(mapStateToProps, actionCreators)(Logout as any);
