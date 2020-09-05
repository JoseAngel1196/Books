import {
  CreateBookPayload,
  BookCollectionResult,
} from '../../../../generated/graphql';
import { createBook } from '../../../../modules/book/useCases/createBook';
import { getBooks } from '../../../../modules/book/useCases/getBooks';
import { BookMap } from '../../../../modules/book/mappers/bookMap';

const resolvers = {
  Mutation: {
    createBook: async (_, args, ___): Promise<CreateBookPayload> => {
      const { title, year, bookDescription } = args.input;
      const response = await createBook.execute({
        title,
        year,
        bookDescription,
      });

      if (response.isFailure) {
        return {
          success: false,
          errorMessage: response.error,
        };
      }

      return {
        success: true,
      };
    },
  },
  Query: {
    books: async (_, args, ___): Promise<BookCollectionResult[]> => {
      const { offset } = args;
      const response = await getBooks.execute({ offset });
      console.log(response);
      if (response.isRight()) {
        const books = response.value.getValue();
        console.log(books.map((b) => BookMap.toDTO(b)));
        return books.map((b) => BookMap.toDTO(b));
      } else {
        throw response.value.error;
      }
    },
  },
};

export { resolvers };
