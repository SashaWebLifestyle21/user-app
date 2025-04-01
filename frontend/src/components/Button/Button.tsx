import { FC, MouseEventHandler, PropsWithChildren } from 'react'
import styles from './Button.module.scss'

interface IButton extends PropsWithChildren {
	className?: string
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<IButton> = ({
	children,
	className,
	type = 'button',
	disabled = false,
	onClick,
}) => {
	return (
		<button
			className={styles.button + ' ' + className}
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
