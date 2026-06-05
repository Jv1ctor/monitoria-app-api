import { Router } from 'express';

import { academicProfileRepository } from '../student/repository';
import { majorController } from './controller';
import { majorRepository } from './repository';
import { majorService } from './service';

export const majorRouter = Router();

const repository = majorRepository;
const profileRepository = academicProfileRepository;
const service = majorService(repository, profileRepository);

const controller = majorController({
  majorService: service,
});

majorRouter.post('/', controller.create);
majorRouter.get('/', controller.findAll);
majorRouter.get('/:id', controller.findById);
majorRouter.put('/:id', controller.update);
majorRouter.delete('/:id', controller.remove);
