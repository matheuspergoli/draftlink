import { LinkEntity, LinkProps } from './link-entity'

export class LinkEntityBuilder {
	private readonly props: LinkProps

	constructor() {
		this.props = {
			id: '',
			url: '',
			name: '',
			nsfw: false,
			description: '',
			createdAt: new Date(),
			updatedAt: new Date()
		}
	}

	withId(id: string): LinkEntityBuilder {
		this.props.id = id
		return this
	}

	withUrl(url: string): LinkEntityBuilder {
		this.props.url = url
		return this
	}

	withName(name: string): LinkEntityBuilder {
		this.props.name = name
		return this
	}

	withNsfw(nsfw: boolean): LinkEntityBuilder {
		this.props.nsfw = nsfw
		return this
	}

	withDescription(description: string): LinkEntityBuilder {
		this.props.description = description
		return this
	}

	withCreatedAt(createdAt: Date): LinkEntityBuilder {
		this.props.createdAt = createdAt
		return this
	}

	withUpdatedAt(updatedAt: Date): LinkEntityBuilder {
		this.props.updatedAt = updatedAt
		return this
	}

	build(): LinkEntity {
		return LinkEntity.create(this.props)
	}
}
