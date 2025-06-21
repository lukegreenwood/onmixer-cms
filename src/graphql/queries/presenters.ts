import { gql } from '../__generated__';

export const GET_PRESENTERS = gql(`
	query GetPresenters($filters: PresenterListInput) {
		presenters(filters: $filters) {
			total
            items {
                id
                name
                picture
            }
		}
	}
`);

export const GET_PRESENTER = gql(`
	query GetPresenter($id: ID!) {
		presenter(id: $id) {
            id
            name
            bio
            hero
            hidden
            shortBio
            picture
            shows {
                total
                
            }
            episodes {
                total    
            }
            networks {
                id
            }
		}
	}
`);
