import { gql } from '../__generated__';

export const CREATE_SCHEDULE_ITEM = gql(`
  mutation CreateScheduleItem($input: CreateScheduleItemInput!) {
    createScheduleItem(input: $input) {
      scheduleItem {
        id
        end
        start
        networks {
          id
          name
        }
        episode {
          id
          name
          show {
            shortName
          }
          description
          broadcasts {
            id
            start
            end
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
