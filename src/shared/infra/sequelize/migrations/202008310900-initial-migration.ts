import runner from '../runner';

export default {
  up: (queryInterface, Sequelize) => {
    const CREATE_BOOK = () => {
      return queryInterface.create('books', {
        book_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        year: {
          type: Sequelize.CHAR(4),
          allowNull: false,
        },
        book_description: {
          type: Sequelize.STRING(250),
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
    };

    return runner.run([() => CREATE_BOOK()]);
  },
  down: (queryInterface, Sequelize) => {
    return runner.run([() => queryInterface.dropTable('books')]);
  },
};
