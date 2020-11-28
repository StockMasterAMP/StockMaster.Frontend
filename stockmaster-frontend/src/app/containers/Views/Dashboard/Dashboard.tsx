import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../store/index';
import { actionCreators, reducer } from '../../../store/views/dashboard';

type DashboardProps = ReturnType<typeof reducer> & typeof actionCreators & { readonly history: History };

const Dashboard: React.FC<DashboardProps> = ({}) => {

	return (
		<React.Fragment>
			<div>Dashboard</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state: IApplicationState) => state.dashboard

export default connect(mapStateToProps, actionCreators)(Dashboard as any);