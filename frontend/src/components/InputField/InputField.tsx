import { forwardRef, ForwardRefExoticComponent, HTMLProps, Ref } from 'react'
import styles from './InputFields.module.scss'

interface IInputField extends HTMLProps<HTMLInputElement> {
	label: string
	error?: string
}

export const InputField: ForwardRefExoticComponent<IInputField> = forwardRef(
	(
		{ label, error, ...inputProps }: IInputField,
		ref: Ref<HTMLInputElement>
	) => {
		return (
			<>
				<label className={styles.label}>
					{label}
					<input className={styles.input} ref={ref} {...inputProps} />
				</label>
				{error && <span className={styles.error}>{error}</span>}
			</>
		)
	}
)

InputField.displayName = 'field'
