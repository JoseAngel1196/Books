export default (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'book',
    {
      book_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      book_description: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'book',
    }
  );

  return Book;
};
