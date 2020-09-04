import { CreateBookPayload } from '../../../../generated/graphql';
import { createBook } from '../../../../modules/book/useCases/createBook';

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
};

export { resolvers };
