import React from 'react';
import { TextInput } from '../../../../hooks';
import { createClassName } from '../../../../utils';

import { MDBInput } from 'mdbreact';

type EmailInputProps = {
	readonly textInput: TextInput;
	readonly isInputInvalid: boolean;
};

const EmailInput = React.memo<EmailInputProps>(({ textInput, isInputInvalid }) => {
	const { hasValue, bindToInput } = textInput;

	const className = createClassName(['input', 'is-medium', isInputInvalid && !hasValue && 'is-danger']);

	return (
		<div className="row justify-content-md-left">
			<div className="col-10 inputMaxSize">
				<MDBInput className="w-100" label="Email" {...bindToInput} />
			</div>
		</div>
	);
});

EmailInput.displayName = 'EmailInput';

export default EmailInput;
