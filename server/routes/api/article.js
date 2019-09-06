import express from 'express';
import Article from '../../controllers/article';
import {verifyToken} from '../../helpers';
//import isAdmin from '../../middleware/is_admin';
import {Validation} from '../../middleware/validation';



const router = express.Router();

//router.post('/',verifyToken,isAdmin, Create_trip.trip);
//router.post('/',verifyToken,Validation.createArticleValidator,Article.createArticle);
router.post('/',verifyToken,Article.createArticle);
router.delete('/:article_id',verifyToken,Article.deleteArticle );
//router.patch('/:article_id',verifyToken,Validation.editArticleValidator,Article.editArticle );
router.patch('/:article_id',verifyToken,Article.editArticle );
router.get('/:article_id',verifyToken,Article.getSpecificArticle );
router.get('/',verifyToken,Article.getAllArticle);
//router.post('/:article_id/comment',verifyToken,Validation.createCommentValidator,Article.comment);
router.post('/:article_id/comment',verifyToken,Article.comment);





export default router;