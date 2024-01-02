import { SiteEntity, SiteProps } from './site-entity'

export class SiteEntityBuilder {
	private readonly props: SiteProps

	constructor() {
		this.props = {
			id: '',
			name: '',
			description: '',
			subdomain: '',
			createdAt: new Date(),
			updatedAt: new Date()
		}
	}

	withId(id: string): SiteEntityBuilder {
		this.props.id = id
		return this
	}

	withName(name: string): SiteEntityBuilder {
		this.props.name = name
		return this
	}

	withDescription(description: string): SiteEntityBuilder {
		this.props.description = description
		return this
	}

	withSubdomain(subdomain: string): SiteEntityBuilder {
		this.props.subdomain = subdomain
		return this
	}

	withCreatedAt(createdAt: Date): SiteEntityBuilder {
		this.props.createdAt = createdAt
		return this
	}

	withUpdatedAt(updatedAt: Date): SiteEntityBuilder {
		this.props.updatedAt = updatedAt
		return this
	}

	build(): SiteEntity {
		return SiteEntity.create(this.props)
	}
}
