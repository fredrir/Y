import { gql } from "@apollo/client";

export const REPOST_POST = gql`
  mutation RepostPost($postID: ID!, $type: String!) {
    repostPost(postID: $postID, type: $type) {
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
      repostId
      repostType
      repostAuthor {
        id
        username
        profilePicture
      }
    }
  }
`;
