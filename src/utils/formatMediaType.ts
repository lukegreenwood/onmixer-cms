import { MediaType } from '@/graphql/__generated__/graphql';

/**
 * Formats MediaType enum values into user-friendly text
 */
export function formatMediaType(type: MediaType): string {
  switch (type) {
    case MediaType.ArticleImage:
      return 'Article Image';
    case MediaType.FeaturedImage:
      return 'Featured Image';
    case MediaType.General:
      return 'General';
    case MediaType.Presenter:
      return 'Presenter';
    case MediaType.PresenterHero:
      return 'Presenter Hero';
    case MediaType.TrackArt:
      return 'Track Art';
    default:
      return type;
  }
}
