import React, { Fragment } from 'react';

import { MDBBtn } from 'mdbreact';

type LoginControlsProps = {};

const LoginControls = React.memo<LoginControlsProps>(() => (
	<Fragment>
		<MDBBtn type="submit" className="" color="indigo">
			Sing Up
		</MDBBtn>
	</Fragment>
));

LoginControls.displayName = 'LoginControls';

export default LoginControls;
