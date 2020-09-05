import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Book {
    title: String
    year: String
    bookDescription: String
  }

  type BookCollectionResult {
    title: String
    year: String
    bookDescription: String
  }

  type Query {
    books(offset: String): [BookCollectionResult]!
  }

  type CreateBookPayload {
    success: Boolean!
    errorMessage: String
  }

  type BookError {
    errorMessage: String!
  }

  type UpdateBookPayload {
    success: Boolean!
    errorMessage: String
  }

  input CreateBookInput {
    title: String!
    year: String!
    bookDescription: String!
  }

  input UpdateBookInput {
    bookId: String!
    title: String!
    year: String!
    bookDescription: String!
  }

  type Mutation {
    createBook(input: CreateBookInput): CreateBookPayload!
    updateBook(input: UpdateBookInput): UpdateBookPayload!
  }
`;
