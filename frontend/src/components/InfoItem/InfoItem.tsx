import { FC } from 'react'
import { Text } from '../Text'
import { Title } from '../Title'
import styles from './InfoItem.module.scss'

export interface IInfoItem {
	title: string
	description: string
}

export const InfoItem: FC<IInfoItem> = ({ description, title }) => {
	return (
		<div className={styles.wrapper}>
			<Title>{title}</Title>
			<Text>{description}</Text>
		</div>
	)
}
