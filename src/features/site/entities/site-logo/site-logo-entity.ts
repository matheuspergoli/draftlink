import { generateRandomUUID } from '@/libs/utils'

export interface SiteLogoProps {
	id: string
	image: string
	publicId: string
	createdAt: Date
	updatedAt: Date
}

export class SiteLogoEntity {
	readonly id: string
	protected _image: string
	protected _publicId: string
	readonly createdAt: Date
	readonly updatedAt: Date

	protected constructor(props: SiteLogoProps) {
		this.id = props.id
		this._image = props.image
		this._publicId = props.publicId
		this.createdAt = props.createdAt
		this.updatedAt = props.updatedAt
	}

	static create(props: {
		id?: string
		image: string
		publicId: string
		createdAt?: Date
		updatedAt?: Date
	}): SiteLogoEntity {
		return new SiteLogoEntity({
			id: props.id || generateRandomUUID(),
			image: props.image,
			publicId: props.publicId,
			createdAt: props.createdAt || new Date(),
			updatedAt: props.updatedAt || new Date()
		})
	}

	static recover(props: SiteLogoProps): SiteLogoEntity {
		return new SiteLogoEntity(props)
	}

	toObject(): SiteLogoProps {
		return {
			id: this.id,
			image: this._image,
			publicId: this._publicId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		}
	}

	get image(): string {
		return this._image
	}

	get publicId(): string {
		return this._publicId
	}
}
