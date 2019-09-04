// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import utils from './utils';

// Configure chai
chai.use(chaiHttp);
chai.should();


describe('specific', () => {

  it('it should return 200', done => {

    chai
      .request(app)
      .get('/api/v1/article/1')
      .set('Authorization', `Bearer ${utils.getUserToken(1)}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('data').be.a('object');
      });
    done();
  })

  it('it should return 400 and this article is not published now!', done => {

    chai
      .request(app)
      .get('/api/v1/article/3')
      .set('Authorization', `Bearer ${utils.getUserToken(1)}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('this article is not published now!');
      });
    done();
  })
  it('it should return 404 and article not found!', done => {

    chai
      .request(app)
      .get('/api/v1/article/100')
      .set('Authorization', `Bearer ${utils.getUserToken(1)}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('article not found!');
      });
    done();
  })
});
describe('create article', () => {

  it('it should return 201 and newly created article object', done => {

    chai
      .request(app)
      .post('/api/v1/article')
      .set('Authorization', `Bearer ${utils.getUserToken(1)}`)
      .field('title', 'how can make teamwork')
      .field('article', 'fgfhgf rtryrt tryrty')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('data').be.a('object');
        res.body.should.have.property('message').eql('article successfully created');
      });
    done();
  })

});

describe('patch', () => {

  it('it should return 200 and article successfully edited', done => {

    chai
      .request(app)
      .patch('/api/v1/article/1')
      .set('Authorization', `Bearer ${utils.getUserToken(1)}`)
      .field('article', 'fgfhgf rtryrt tryrty rtrreees')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('data').be.a('object');
        res.body.should.have.property('message').eql('article successfully edited');
      });
    done();
  })

  it('it should return 400 and You did not make this article with article_id', done => {

    chai
      .request(app)
      .patch('/api/v1/article/1')
      .set('Authorization', `Bearer ${utils.getUserToken(2)}`)
      .field('article', 'fgfhgf rtryrt tryrty rtrreees')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('You did not make this article with article_id');
      });
    done();
  })
  it('it should return 404 and article not found!', done => {

    chai
      .request(app)
      .patch('/api/v1/article/100')
      .set('Authorization', `Bearer ${utils.getUserToken(1)}`)
      .field('article', 'fgfhgf rtryrt tryrty rtrreees')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('article not found!');
      });
    done();
  })
});



describe('delete', () => {

  it('it should return 200 and article successfully deleted', done => {

    chai
      .request(app)
      .delete('/api/v1/article/1')
      .set('Authorization', `Bearer ${utils.getUserToken(1)}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('data').be.a('object');
        res.body.should.have.property('message').eql('article successfully deleted');
      });
    done();
  })

  it('it should return 400 and You did not make this article with article_id', done => {

    chai
      .request(app)
      .delete('/api/v1/article/1')
      .set('Authorization', `Bearer ${utils.getUserToken(2)}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('You did not make this article with article_id');
      });
    done();
  })
  it('it should return 404 and article not found!', done => {

    chai
      .request(app)
      .delete('/api/v1/article/100')
      .set('Authorization', `Bearer ${utils.getUserToken(1)}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('article not found!');
      });
    done();
  })
});








