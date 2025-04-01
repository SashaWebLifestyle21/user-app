import { FC, PropsWithChildren } from 'react'

interface IText extends PropsWithChildren {
	className?: string
}

export const Text: FC<IText> = ({ children, className }) => {
	return <p className={className}>{children}</p>
}
