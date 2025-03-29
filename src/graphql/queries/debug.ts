import { gql } from "@apollo/client";

export const DEBUG = gql`
	query Debug {
		debug {
			id
			status
			randomShow {
				id
				shortName
				episodes {
					total
				}
			}
		}
	}
`;
