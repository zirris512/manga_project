import gql from 'graphql-tag';

export const GET_ANIME = gql`
   query ($search: String, $perPage: Int, $page: Int, $type: MediaType) {
      Page (page: $page, perPage: $perPage) {
         pageInfo {
            currentPage
            lastPage
            hasNextPage
         }
         media(type: $type, search: $search, isAdult: false) {
            id
            title {
               english
               romaji
            }
            coverImage {
               medium
               large
            }
         }
      }
   }
`;

export const GET_MANGA = gql`
   query ($search: String, $perPage: Int, $page: Int, $type: MediaType) {
      Page (page: $page, perPage: $perPage) {
         pageInfo {
            currentPage
            lastPage
            hasNextPage
         }
         media(type: $type, search: $search, isAdult: false) {
            id
            title {
               english
               romaji
            }
            coverImage {
               medium
               large
            }
         }
      }
   }
`;

export const GET_SINGLE_ANIME = gql`
   query ($id: Int) {
      Media(id: $id) {
         title {
            romaji
            english
         }
         status
         description
         startDate {
            year
            month
         }
         endDate {
            year
            month
         }
         episodes
         duration
         coverImage {
            extraLarge
         }
         streamingEpisodes {
            title
            thumbnail
            url
            site
         }
      }
   }
`;

export const GET_SINGLE_MANGA = gql`
   query ($id: Int) {
      Media(id: $id) {
         title {
            romaji
            english
         }
         status
         description
         startDate {
            year
            month
         }
         endDate {
            year
            month
         }
         volumes
         chapters
         coverImage {
            extraLarge
         }
      }
   }
`;
