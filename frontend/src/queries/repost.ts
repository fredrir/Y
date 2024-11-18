import { gql } from "@apollo/client";

export const REPOST_POST = gql`
  mutation RepostPost($ID: ID!, $type: String!) {
    repostPost(id: $id, type: $type) {
      id
      body
      author {
        id
        username
        profilePicture
      }
      amtLikes
      hashTags
      amtComments
      imageUrl
      createdAt
      __typename
      repostID
      repostType
      repostAuthor {
        id
        username
        profilePicture
      }
    }
  }
`;
