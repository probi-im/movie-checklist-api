import {Router} from 'express'
import {  watchMovie } from '../controllers';
import { getUserData, unwatchMovie } from '../controllers/user.controller';

const router = Router();

router.get('/:userId', getUserData)
router.post('/:userId/watch', watchMovie)
router.post('/:userId/unwatch', unwatchMovie)

export default router;