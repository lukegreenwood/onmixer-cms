import { gql } from '@/graphql/__generated__';

export const CREATE_NETWORK = gql(`
  mutation CreateNetwork($input: CreateNetworkInput!) {
    createNetwork(input: $input) {
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