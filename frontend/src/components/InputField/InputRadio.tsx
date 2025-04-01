import { forwardRef, ForwardRefExoticComponent, Ref } from 'react'
import styles from './InputFields.module.scss'

interface IInputRadio {
	inputId: string
	value: 'male' | 'female'
	label: string
	error?: string
}

export const InputRadio: ForwardRefExoticComponent<IInputRadio> = forwardRef(
	(
		{ label, value = 'male', inputId, error, ...inputProps }: IInputRadio,
		ref: Ref<HTMLInputElement>
	) => {
		return (
			<div className={styles.radio}>
				<input
					className={styles.radio}
					id={inputId}
					type='radio'
					value={value}
					ref={ref}
					{...inputProps}
				/>
				<label className={styles.radio_label} htmlFor={inputId}>
					{label}
				</label>
				{error && <span className={styles.error}>{error}</span>}
			</div>
		)
	}
)
InputRadio.displayName = 'field'
