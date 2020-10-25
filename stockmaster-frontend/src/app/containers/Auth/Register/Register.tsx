import React from "react";
import { History } from "history";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store/";
import { actionCreators, reducer } from "../../../store/auth";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBInput } from 'mdbreact';

type RegisterProps = ReturnType<typeof reducer>
  & typeof actionCreators
  & { readonly history: History };

const Register: React.FC<RegisterProps> = ({
}) => {

  return (
    <React.Fragment>
        <MDBCol>
            <MDBCard className="container mt-5" style={{ width: "22rem" }}>
                <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/nature-sm.jpg" waves/>
                <MDBCardBody>
                    <MDBCardTitle>Register to GG-Shark</MDBCardTitle>
                    <div className="row justify-content-md-left">
                        <div className="col-10 inputMaxSize">
                            <MDBInput className="w-100" name = "email" label="Email" type="email" id="email" group />
                        </div>
                    </div>
                    <div className="row justify-content-md-left">
                        <div className="col-10 inputMaxSize">
                            <MDBInput className="w-100" name = "password" label="Password" type="password" id="password" group/>
                        </div>
                    </div>
                    <div className="row justify-content-md-left">
                        <div className="col-10 inputMaxSize">
                            <MDBInput className="w-100" name = "confirmPassword" label="Confirm password" type="password" id="confirmPassword" group/>
                        </div>
                    </div>
                    <MDBBtn className="" color="indigo">Register</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IApplicationState) => ({
  status: state.auth.status
});

export default connect(mapStateToProps, actionCreators)(Register as any);
