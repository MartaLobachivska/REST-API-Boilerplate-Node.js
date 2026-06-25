import { Router } from 'express';
import * as controller from '../controllers/announcements.controller.js';
import * as validators from '../validators/announcements.validators.js';

const router = Router();

router.get('/', validators.getAllValidator, controller.getAnnouncements);
router.get('/:id', validators.idParamValidator, controller.getAnnouncementById);
router.post('/', validators.createValidator, controller.createAnnouncement);
router.patch('/:id', validators.updateValidator, controller.updateAnnouncement);
router.delete('/:id', validators.idParamValidator, controller.deleteAnnouncement);

export default router;