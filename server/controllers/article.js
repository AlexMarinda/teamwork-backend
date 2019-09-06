import articles  from '../model/article';
import comments from '../model/comment';
import moment from 'moment';
import jwt from 'jsonwebtoken';


class Article {
    


static  createArticle(req, res) {
const getUser = jwt.decode(req.headers.authorization.split(' ')[1]);
const newArticle = {
article_id:articles.length + 1,
title:req.body.title,
article:req.body.article,
createdOn:moment().format(),
user_id: getUser.user_id,
status:"unshare"

};

    articles.push(newArticle);


if(newArticle)
 res.status(201).send({ status: 201, message:'article successfully created',data: { ...newArticle } });
return res.status(400).send({ status: 400,'message':'article not created' });

}

static  deleteArticle (req, res) {
  const getUser = jwt.decode(req.headers.authorization.split(' ')[1]);
    const findArticle =   articles.find(t => t.article_id === parseInt(req.params.article_id));
    if(findArticle){
       
       if(getUser.user_id === findArticle.user_id){
       articles.splice(findArticle,1);

  
        return res.status(200).send({ status: 200, 'message': 'article successfully deleted', data: {
          title:findArticle.title,
          article:findArticle.article}});
      }
      else{
        return res.status(400).send({ status: 400, 'message':'You did not make this article with article_id'});
      }
     } 
     else {
          return res.status(404).send({ status: 404,  'message':'article not found!'});
     }
     }


     static  editArticle (req, res) {
      const getUser = jwt.decode(req.headers.authorization.split(' ')[1]);
        const findArticle =   articles.find(t => t.article_id === parseInt(req.params.article_id));
        if(findArticle){
           
           if(getUser.user_id === findArticle.user_id){

            findArticle.article = req.body.article;
    
      
            return res.status(200).send({ status: 200, 'message': 'article successfully edited', data: {
              title:findArticle.title,
              article:findArticle.article}});
          }
          else{
            return res.status(400).send({ status: 400, 'message':'You did not make this article with article_id'});
          }
         } 
         else {
              return res.status(404).send({ status: 404,  'message':'article not found!'});
         }
         }


         static  getSpecificArticle(req, res) {
          
          const findArticle =   articles.find(t => t.article_id === parseInt(req.params.article_id));
          const findComment =   comments.find(t => t.article_id === parseInt(req.params.article_id));
  
          
          
          if(findArticle)
          if(findArticle.status==='share'){
            const comments = [{
              comment_id:findComment.comment_id,
              comment:findComment.comment,
              user_id:findComment.user_id,
            }
            ];


  
              return res.status(200).send({ status: 200, 'message': 'success', data: {
                title:findArticle.title,
                article:findArticle.article,
                createdOn:findArticle.createdOn,
                user_id:findArticle.user_id,
                comments}});
                
               

              }
              else{
                return res.status(400).send({ status: 400,  'message':'this article is not published now!'});
                
              }
              return res.status(404).send({ status: 404,  'message':'article not found!'});
          
      
      }


      static  getAllArticle(req, res) {
        const findArticle =   articles.filter(t => t.status === "share");
          
        if(findArticle){
          //findArticle.sort();
          findArticle.reverse();
          

            return res.status(200).send({ status: 200, 'message': 'success', data: 
            findArticle});
              
            }
            return res.status(404).send({ status: 404,  'message':'article not found!'});
        
    
    }





      static  comment (req, res) {
        const getUser = jwt.decode(req.headers.authorization.split(' ')[1]);
          const findArticle =   articles.find(t => t.article_id === parseInt(req.params.article_id));
          if(findArticle){
             
             if(findArticle.status === 'share'){
              const newComment = {
                comment_id:comments.length + 1,
                createdOn:moment().format(),
                article_id:findArticle.article_id,
                user_id: getUser.user_id,
                comment:req.body.comment
                
                };
  
              comments.push(newComment);
      
        
              return res.status(201).send({ status: 201, 'message': 'relevant-success-message', data: {
                createdOn:newComment.createdOn,
                title:findArticle.title,
                article:findArticle.article,
              comment:newComment.comment}});
            }
            else{
              return res.status(400).send({ status: 400, 'message':'this article is not published now'});
            }
           } 
           else {
                return res.status(404).send({ status: 404,  'message':'article not found!'});
           }
           }




}
export default Article;