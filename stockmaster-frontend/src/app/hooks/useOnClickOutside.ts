import { useEffect, MutableRefObject } from 'react';
import { CallbackFunction } from '../types';

export const useOnClickOutside = (ref: MutableRefObject<HTMLElement | null>, handlerFn: CallbackFunction): void => {
	useEffect(() => {
		const onClickHandler = (e: any): void => {
			if (ref.current && ref.current.contains(e.target)) {
				return;
			}
			handlerFn(false);
		};

		document.addEventListener('click', onClickHandler);
		document.addEventListener('touchend', onClickHandler);

		return () => {
			document.removeEventListener('click', onClickHandler);
			document.removeEventListener('touchend', onClickHandler);
		};
	}, [ref, handlerFn]);
};
