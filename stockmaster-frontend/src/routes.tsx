import React, { ReactNode } from 'react';
import Layout from './Layout';
import { Route, Switch } from 'react-router-dom';
import { RoutesConfig } from './app/config/routes.config';
import { Login, Register } from './app/containers';

export const routes: ReactNode = (
	<Layout>
		<Switch>
			<Route path={RoutesConfig.Login.path} component={Login} />
			<Route path={RoutesConfig.Register.path} component={Register} />
		</Switch>
	</Layout>
);
