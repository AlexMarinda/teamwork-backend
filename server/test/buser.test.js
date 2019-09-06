// Import the dependencies for testing
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import users from '../model/users';


chai.use(chaiHttp);
chai.should();
// eslint-disable-next-line no-unused-vars
const [user1] = users;

  describe('SignUp', () => {
    it('it should add user if required fields provided', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
            email: 'marindaalex4@gmail.com',
            first_name: 'teller',
            last_name: 'marinda',
            password: '123',
            gender: 'male',
            jobRole :'developer',
            department :'IT',
            address: 'kicukiro',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('data').be.a('object');
          res.body.should.have.property('data').have.property('token');
          done();
        });
    });

    it('it should return 409 when user choose email taken', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
            email: 'marindaalex44@gmail.com',
            first_name: 'teller',
            last_name: 'marinda',
            password: '123',
            gender: 'male',
            jobRole :'developer',
            department :'it',
            address: 'kicukiro',
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('message').eql('choose another email this was taken');
          done();
        });
    });

      /*it('it should return 400 ', done => {

    chai
      .request(app)
      .post('/api/v1/article')
      .set('Authorization', `Bearer ${utils.getUserToken(1)}`)
      .send({
            email: 'marindaalex44@gmail.com',
            first_name: 'teller',
            last_name: 'marinda',
            password: '123',
            gender: 'male',
            jobRole :'developer',
            department :'it',
            
        })
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  })*/
  });
  describe('SignIn', () => {
    it('it should sign in user if correct credentials provided', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: user1.email,
          password: '12345'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').be.a(200);
          res.body.should.have.property('message').eql('succefully');
          res.body.should.have.property('data').be.a('object');
          res.body.should.have.property('data').have.property('token');
          done();
        });
    })

    it('it should return 401  when user fills bad inputs', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'test@test.com',
          password: 'somebadpass'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('status').be.a(401);
          res.body.should.have.property('nessage').eql('User not found!');
          done();
        });
    });

          /*it('it should return 400 ', done => {

    chai
      .request(app)
      .post('/api/v1/article')
      .set('Authorization', `Bearer ${utils.getUserToken(1)}`)
      .send({
            email: user1.email,

            
        })
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  })*/
  });

  describe('JWT', () => {
    it('it should return 400 ', done => {
      chai
        .request(app)
        .post('/api/v1/article/')
        .field('title', 'how can make teamwork')
        .field('article', 'fgfhgf rtryrt tryrty')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Invalid token');
          done();
        });
    });

    it('it should return 403 if invalid token', done => {
      chai
        .request(app)
        .post('/api/v1/article/')
        .set('Authorization', `Bearer gfhgbghghbghrhh.etretretre.retrtre`)
        .field('title', 'how can make teamwork')
        .field('article', 'fgfhgf rtryrt tryrty')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message').eql('Unauthorized access');
          done();
        });
    });

  });
  


