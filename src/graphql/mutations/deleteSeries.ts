import { gql } from '../__generated__';

export const DELETE_SERIES = gql(`
  mutation DeleteSeries($input: DeleteSeriesInput!) {
    deleteSeries(input: $input) {
      success
      message
    }
  }
`);
