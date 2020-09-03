import { SequelizeBookRepo } from './implementations/sequelizeBookRepo';
import models from '../../../shared/infra/sequelize/models';

const bookRepo = new SequelizeBookRepo(models);

export { bookRepo };
