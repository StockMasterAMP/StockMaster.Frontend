import React, { useCallback, useEffect, useState } from 'react';
import { History } from "history";
import { connect } from "react-redux";
import { IApplicationState, ReduxAction } from "../../../store/";
import { useToggle, useTextInput } from '../../../hooks';
import { actionCreators, AuthStatusEnum, reducer } from "../../../store/auth";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBInput } from 'mdbreact';
import { EmailInput, PasswordInput } from '../Login/child-components';
import { stat } from 'fs';
import { JsxElement } from 'typescript';

type RegisterProps = ReturnType<typeof reducer> & typeof actionCreators & { readonly history: History };

const Register: React.FC<RegisterProps> = ({ history, setRegisterAuthStatus, registerUserRequest, validationErrors, registerResponse}) => {

    const [showPassword, toggleShowPassword] = useToggle(false);
    const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false);
    
	const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);
    
    const emailInput = useTextInput('');
    const passwordInput = useTextInput('', showPassword ? 'text' : 'password');
    const passwordConfirmInput = useTextInput('', showConfirmPassword ? 'text' : 'password');

    useEffect(() => {
        validateRegistrationForm();
    }, [validationErrors]);

    const handleRegister = (e: React.ChangeEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (!emailInput.hasValue || !passwordInput.hasValue  || !passwordConfirmInput.hasValue) {
			// Run invalidInputs error and display toast notification (if one is not already active)
            setIsInputInvalid(true);
        
        }
        else if(passwordInput.value !== passwordConfirmInput.value) {
            //validate is passwords are the same
            setIsInputInvalid(true);

		} else {

			setIsInputInvalid(false);
            setRegisterAuthStatus(AuthStatusEnum.PROCESS);

            registerUserRequest({
                email: emailInput.value,
                password: passwordInput.value,
            });

		}
    };

    const validateRegistrationForm = (): JSX.Element | null => {
        return validationErrors 
            ? <p className="font-weight-bold">{registerResponse.reason}</p> 
            : null
    };

    return (
        <React.Fragment>
            <MDBCol>
                <MDBCard className="container mt-5" style={{ width: "22rem" }}>
                    <MDBCardBody>
                        <MDBCardImage className="img-fluid" waves />
                        <form onSubmit={handleRegister}>
                            <MDBCardTitle>Register to Stock Master</MDBCardTitle>
                            <EmailInput textInput={emailInput} isInputInvalid={isInputInvalid} />

							<PasswordInput
								textInput={passwordInput}
								showPassword={showPassword}
								isInputInvalid={isInputInvalid}
								toggleShowPassword={toggleShowPassword}
							/>

                            <PasswordInput
								textInput={passwordConfirmInput}
								showPassword={showConfirmPassword}
								isInputInvalid={isInputInvalid}
								toggleShowPassword={toggleShowConfirmPassword}
							/>
                            {validateRegistrationForm()}
                            <MDBBtn type="submit" color="primary">Register</MDBBtn>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </React.Fragment>
  );
};

const mapStateToProps = (state: IApplicationState) => state.auth

export default connect(mapStateToProps, actionCreators)(Register as any);
