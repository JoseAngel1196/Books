import * as express from 'express';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { CreateBookUseCase } from './CreateBookUseCase';
import { CreateBookDTO } from './CreateBookDTO';

export class CreateBookController extends BaseController {
  private useCase: CreateBookUseCase;

  /**
   *
   */
  constructor(useCase: CreateBookUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    let dto: CreateBookDTO = req.body as CreateBookDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isFailure) {
        return this.fail(res, result.error);
      }

      return this.ok(res);
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
