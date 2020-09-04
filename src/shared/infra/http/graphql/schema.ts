import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Book {
    title: String
    year: String
    bookDescription: String
  }

  type Query {
    bookById(id: ID!): Book
  }

  type CreateBookPayload {
    success: Boolean!
    errorMessage: String
  }

  input CreateBookInput {
    title: String!
    year: String!
    bookDescription: String!
  }

  type Mutation {
    createBook(input: CreateBookInput): CreateBookPayload!
  }
`;
