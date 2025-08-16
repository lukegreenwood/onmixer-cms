import { gql } from '../__generated__';

export const GET_NETWORKS = gql(`
	query GetNetworks {
		networks {
			id
			name
			code
			baseUrl
			imagesUrl
			logoSvg
			logoSvgCircular
			logoSvgColor
			logoSvgIcon
			logoMedia {
				id
				key
				mimeType
				type
				urls {
					original
					medium
					square
				}
				fileSize {
					label
				}
			}
			logoIconMedia {
				id
				key
				mimeType
				type
				urls {
					original
					medium
					square
				}
				fileSize {
					label
				}
			}
			logoLightMedia {
				id
				key
				mimeType
				type
				urls {
					original
					medium
					square
				}
				fileSize {
					label
				}
			}
			networkType
			tagline
			cssUrl
			playFormat
			playUrl
			shortId
		}
	}
`);

export const GET_NETWORK = gql(`
	query GetNetwork($id: ID!) {
		network(id: $id) {
			id
			name
			code
			baseUrl
			imagesUrl
			logoSvg
			logoSvgCircular
			logoSvgColor
			logoSvgIcon
			logoMedia {
				id
				key
				mimeType
				type
				urls {
					original
					medium
					square
				}
				fileSize {
					label
				}
			}
			logoIconMedia {
				id
				key
				mimeType
				type
				urls {
					original
					medium
					square
				}
				fileSize {
					label
				}
			}
			logoLightMedia {
				id
				key
				mimeType
				type
				urls {
					original
					medium
					square
				}
				fileSize {
					label
				}
			}
			networkType
			tagline
			cssUrl
			playFormat
			playUrl
			shortId
		}
	}
`);
