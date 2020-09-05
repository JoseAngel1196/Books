import {
  CreateBookPayload,
  BookCollectionResult,
  UpdateBookPayload,
} from '../../../../generated/graphql';
import { createBook } from '../../../../modules/book/useCases/createBook';
import { getBooks } from '../../../../modules/book/useCases/getBooks';
import { BookMap } from '../../../../modules/book/mappers/bookMap';
import { UpdateBookDTO } from '../../../../modules/book/useCases/updateBook/UpdateBookDTO';
import { updateBook } from '../../../../modules/book/useCases/updateBook';

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
    updateBook: async (_, args, ___): Promise<UpdateBookPayload> => {
      const {
        bookDescription,
        bookId,
        title,
        year,
      } = args.input as UpdateBookDTO;

      const response = await updateBook.execute({
        bookDescription,
        bookId,
        title,
        year,
      });

      if (response.isRight()) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          // errorMessage: response.error,
        };
      }
    },
  },
  Query: {
    books: async (_, args, ___): Promise<BookCollectionResult[]> => {
      const { offset } = args;
      const response = await getBooks.execute({ offset });
      if (response.isRight()) {
        const books = response.value.getValue();
        return books.map((b) => BookMap.toDTO(b));
      } else {
        throw response.value;
      }
    },
  },
};

export { resolvers };
