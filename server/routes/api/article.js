import express from 'express';
import Article from '../../controllers/article';
import {verifyToken} from '../../helpers';
//import isAdmin from '../../middleware/is_admin';
//import {Validation} from '../../middleware/validation';



const router = express.Router();

//router.post('/',verifyToken,isAdmin, Create_trip.trip);
router.post('/',verifyToken,Article.createArticle);
router.delete('/:article_id',verifyToken,Article.deleteArticle );
router.patch('/:article_id',verifyToken,Article.editArticle );
router.get('/:article_id',verifyToken,Article.getSpecificArticle );





export default router;