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
				name
				show {
					shortName
				}
				broadcasts {
					id
					start
					end
				}
			}
		}
	}
}
`);
