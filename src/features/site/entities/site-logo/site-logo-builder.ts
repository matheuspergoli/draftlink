import { SiteLogoEntity, SiteLogoProps } from './site-logo-entity'

export class SiteLogoBuilder {
	private readonly props: SiteLogoProps

	constructor() {
		this.props = {
			id: '',
			image: '',
			publicId: '',
			createdAt: new Date(),
			updatedAt: new Date()
		}
	}

	withId(id: string): SiteLogoBuilder {
		this.props.id = id
		return this
	}

	withImage(image: string): SiteLogoBuilder {
		this.props.image = image
		return this
	}

	withPublicId(publicId: string): SiteLogoBuilder {
		this.props.publicId = publicId
		return this
	}

	withCreatedAt(createdAt: Date): SiteLogoBuilder {
		this.props.createdAt = createdAt
		return this
	}

	withUpdatedAt(updatedAt: Date): SiteLogoBuilder {
		this.props.updatedAt = updatedAt
		return this
	}

	build(): SiteLogoEntity {
		return SiteLogoEntity.create(this.props)
	}
}
