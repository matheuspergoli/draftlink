import { generateRandomUUID } from '@/libs/utils'

export interface LinkProps {
	id: string
	url: string
	name: string
	nsfw: boolean
	description: string
	createdAt: Date
	updatedAt: Date
}

export class LinkEntity {
	readonly id: string
	protected _url: string
	protected _name: string
	protected _nsfw: boolean
	protected _description: string
	readonly createdAt: Date
	readonly updatedAt: Date

	protected constructor(props: LinkProps) {
		this.id = props.id
		this._url = props.url
		this._name = props.name
		this._nsfw = props.nsfw
		this._description = props.description
		this.createdAt = props.createdAt
		this.updatedAt = props.updatedAt
	}

	static create(props: {
		id?: string
		url: string
		name: string
		nsfw: boolean
		description: string
		createdAt?: Date
		updatedAt?: Date
	}): LinkEntity {
		return new LinkEntity({
			id: props.id || generateRandomUUID(),
			url: props.url,
			name: props.name,
			nsfw: props.nsfw,
			description: props.description,
			createdAt: props.createdAt || new Date(),
			updatedAt: props.updatedAt || new Date()
		})
	}

	static recover(props: LinkProps): LinkEntity {
		return new LinkEntity(props)
	}

	toObject(): LinkProps {
		return {
			id: this.id,
			url: this._url,
			name: this._name,
			nsfw: this._nsfw,
			description: this._description,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		}
	}

	get url(): string {
		return this._url
	}

	get name(): string {
		return this._name
	}

	get nsfw(): boolean {
		return this._nsfw
	}

	get description(): string {
		return this._description
	}
}
