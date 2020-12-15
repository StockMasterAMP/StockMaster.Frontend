import React, { ReactNode, useCallback, useState, useRef } from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../store/index';
import { useToggle, useTextInput } from '../../../hooks';
import { RoutesConfig, Route } from '../../../config/routes.config';
import { EmailInput, PasswordInput, LoginControls } from './child-components';
import { actionCreators, AuthStatusEnum, reducer } from '../../../store/auth';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBCardText, MDBLink } from 'mdbreact';

type LoginProps = ReturnType<typeof reducer> & typeof actionCreators & { readonly history: History };

const Login: React.FC<LoginProps> = ({loginResponse, validationErrors, history, resetState, setLoginAuthStatus, loginUserRequest, }) => {
	const navRoutes: Route[] = Object.keys(RoutesConfig)
		.map((key) => RoutesConfig[key])
		.filter((route) => route.type === 'Register');

	const [showPassword, toggleShowPassword] = useToggle(false);
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);

	const emailInput = useTextInput('');
	const passwordInput = useTextInput('', showPassword ? 'text' : 'password');

	const onFailedAuth = useCallback((): void => {
		resetState();
		setLoginAuthStatus(AuthStatusEnum.NONE);
	}, [resetState, setLoginAuthStatus]);

	const onRememberMeCheck = useCallback((checked: boolean): void => setRememberMe(checked), []);
	const onSuccessfulAuth = useCallback((): void => history.push(RoutesConfig.Portal.path), [history]);

	const handleLogin = (e: React.ChangeEvent<HTMLFormElement>): void => {
		e.preventDefault();
		
		if (loginResponse.status === AuthStatusEnum.PROCESS) {
			return;
		}

		if (!emailInput.hasValue || !passwordInput.hasValue) {
			// Run invalidInputs error and display toast notification (if one is not already active)
			setIsInputInvalid(true);

		} else {
			// Clear any toast notifications and prepare state for Login request stub / run login request stub

			setIsInputInvalid(false);
			setLoginAuthStatus(AuthStatusEnum.PROCESS);

			setTimeout(() => {
				loginUserRequest({
					email: emailInput.value,
					password: passwordInput.value,
				});
			}, 1000);
		}
	};

	const validateLoginForm = (): JSX.Element | null => {
        return validationErrors 
            ? <p className="font-weight-bold">{loginResponse.reason}</p> 
            : null
    };

	return (
		<React.Fragment>
			<MDBCol>
				<MDBCard className="container mt-5" style={{ width: '22rem' }}>
					<MDBCardImage className="img-fluid" waves />
					<MDBCardBody>
						<form onSubmit={handleLogin}>
							<MDBCardTitle>Login to Stock Master</MDBCardTitle>
							<div className="d-inline">
								<MDBCardText tag="div">
									Don't have account?
									<MDBBtn className="py-1 px-3" outline color="primary" size="sm">
										{navRoutes.map(
											(route: Route): ReactNode => (
												<MDBLink className="p-0" to={route.path} key={route.path}>
													{route.displayName}
												</MDBLink>
											),
										)}
									</MDBBtn>
								</MDBCardText>
							</div>

							<EmailInput textInput={emailInput} isInputInvalid={isInputInvalid} />

							<PasswordInput
								textInput={passwordInput}
								showPassword={showPassword}
								isInputInvalid={isInputInvalid}
								toggleShowPassword={toggleShowPassword}
							/>
							{validateLoginForm()}
							<LoginControls />
						</form>

						{/* <Authenticator authStatus={status} handleOnFail={onFailedAuth} handleOnSuccess={onSuccessfulAuth} /> */}
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
		</React.Fragment>
	);
};

const mapStateToProps = (state: IApplicationState) => state.auth

export default connect(mapStateToProps, actionCreators)(Login as any);
