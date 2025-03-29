import { gql } from '../__generated__';

export const GET_NETWORKS = gql(`
	query GetNetworks {
		networks {
			id
			name
			code
			networkType
			logoSvgIcon
		}
	}
`);

export const GET_NETWORK = gql(`
	query GetNetwork($id: ID!) {
		network(id: $id) {
			id
			name
			code
			networkType
			logoSvgIcon
		}
	}
`);
