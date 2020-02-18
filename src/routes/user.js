import express from 'express';
import { login, search, find} from './../controller/user.controller';

const router = express.Router();

router.post(
    '/signin',
    login
);
router.post(
    '/signup',
    search
);
router.get(
    '/list',
    find
);

module.exports = router;