import { FC } from 'react'

interface IImage {
	src: string
	alt?: string
	width: number
	height: number
	className?: string
}

export const Image: FC<IImage> = ({
	src,
	alt,
	height,
	width,
	className = '',
}) => {
	return (
		<img
			className={className}
			src={src}
			alt={alt ? alt : src}
			width={width}
			height={height}
			loading='lazy'
		/>
	)
}
