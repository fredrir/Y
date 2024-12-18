import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const uploadLink = createUploadLink({
  uri: `${BACKEND_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "x-apollo-operation-name": "defaultOperation",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          getContentByHashtag: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          getComments: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          getNotifications: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          searchPosts: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          searchUsers: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          searchHashtags: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          getUsers: {
            keyArgs: false,
            merge(existing = [], incoming = []) {
              return [...existing, ...incoming];
            },
          },
          getTrendingHashtags: {
            keyArgs: false,
            merge(existing = [], incoming = []) {
              return [...existing, ...incoming];
            },
          },
          getPostsByIds: {
            keyArgs: ["ids"],
            merge(existing = [], incoming, { args }) {
              const merged = existing ? existing.slice(0) : [];
              const page = args?.page || 1;
              const start = (page - 1) * 10;
              merged.splice(start, incoming.length, ...incoming);
              return merged;
            },
          },
          getCommentsByIds: {
            keyArgs: ["ids"],
            merge(existing = [], incoming, { args }) {
              const merged = existing ? existing.slice(0) : [];
              const page = args!.page || 1;
              const start = (page - 1) * 10;
              merged.splice(start, incoming.length, ...incoming);
              return merged;
            },
          },
        },
      },
    },
  }),
});

export default client;
