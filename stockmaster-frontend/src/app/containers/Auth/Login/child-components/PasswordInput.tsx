import React from 'react';
import { TextInput } from '../../../../hooks';
import { createClassName } from '../../../../utils';

import { MDBInput } from 'mdbreact';

type PasswordInputProps = {
	readonly textInput: TextInput;
	readonly showPassword: boolean;
	readonly isInputInvalid: boolean;
	readonly toggleShowPassword: () => void;
};

const PasswordInput = React.memo<PasswordInputProps>(({ textInput, showPassword, isInputInvalid, toggleShowPassword }) => {
	const { hasValue, bindToInput } = textInput;

	const className = createClassName(['input', 'is-medium', isInputInvalid && !hasValue && 'is-danger']);

	return (
		<div className="row justify-content-md-left">
			<div className="col-10 inputMaxSize">
				<MDBInput className="w-100" label="Password" {...bindToInput} />
			</div>
		</div>
	);
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
