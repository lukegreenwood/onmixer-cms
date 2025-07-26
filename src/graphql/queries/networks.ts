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
			networkType
			tagline
			cssUrl
			playFormat
			playUrl
			shortId
		}
	}
`);
