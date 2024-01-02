import { generateRandomUUID } from '@/libs/utils'

export interface SiteProps {
	id: string
	name: string
	description: string
	subdomain: string
	createdAt: Date
	updatedAt: Date
}

export class SiteEntity {
	readonly id: string
	protected _name: string
	protected _description: string
	protected _subdomain: string
	readonly createdAt: Date
	readonly updatedAt: Date

	protected constructor(props: SiteProps) {
		this.id = props.id
		this._name = props.name
		this._description = props.description
		this._subdomain = props.subdomain
		this.createdAt = props.createdAt
		this.updatedAt = props.updatedAt
	}

	static create(props: {
		id?: string
		name: string
		description: string
		subdomain: string
		createdAt?: Date
		updatedAt?: Date
	}): SiteEntity {
		return new SiteEntity({
			id: props.id || generateRandomUUID(),
			name: props.name,
			description: props.description,
			subdomain: props.subdomain,
			createdAt: props.createdAt || new Date(),
			updatedAt: props.updatedAt || new Date()
		})
	}

	static recover(props: SiteProps): SiteEntity {
		return new SiteEntity(props)
	}

	toObject(): SiteProps {
		return {
			id: this.id,
			name: this._name,
			description: this._description,
			subdomain: this._subdomain,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		}
	}

	get name(): string {
		return this._name
	}

	get description(): string {
		return this._description
	}

	get subdomain(): string {
		return this._subdomain
	}
}
