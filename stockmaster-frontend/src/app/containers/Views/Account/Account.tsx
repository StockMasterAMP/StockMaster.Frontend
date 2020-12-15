import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../store/index';
import { actionCreators, reducer } from '../../../store/views/account';

type AccountProps = ReturnType<typeof reducer> & typeof actionCreators & { readonly history: History };

const Account: React.FC<AccountProps> = ({getAboutMe}) => {
	const initAboutMe = () => {
		try{
			getAboutMe();
		}catch(ex){
			console.log(ex);
		}

	}

	return (
		<React.Fragment>
			<div>Account</div>
			{initAboutMe()}
		</React.Fragment>
	);
};

const mapStateToProps = (state: IApplicationState) => state.account

export default connect(mapStateToProps, actionCreators)(Account as any);