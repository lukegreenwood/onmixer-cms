import { gql } from '@/graphql/__generated__';

export const UPDATE_NETWORK = gql(`
  mutation UpdateNetwork($input: UpdateNetworkInput!) {
    updateNetwork(input: $input) {
      success
      message
      network {
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
  }
`);