import { gql } from '../__generated__';

export const GET_SCHEDULE = gql(`
    query Schedule(
	$from: DateTime!
	$network: ID!
	$to: DateTime
) {
	schedule(
		filters: { from: $from, networkId: $network, to: $to, amount: 200 }
	) {
		total
		items {
			id
			start
			end
			networks {
				id
                name
                logoSvgIcon
			}
			episode {
				id
				name
				show {
					id
					shortName
				}
				description
				broadcasts {
					id
				}
				featuredImage {
					urls {
						square
						customSquare(size: 150)
					}
				}
				networks {
					id
					logoSvgIcon
				}
			}
		}
	}
}
`);
