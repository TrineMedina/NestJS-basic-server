import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';
import * as pactum from 'pactum';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService; //Declare a var for PrismaService
  beforeAll(async () => {
    //Simulate setup of server:
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule], //imports everything so we can test if it works together
    }).compile();
    app = moduleRef.createNestApplication(); //compiles the above module
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init(); //Starts mock server
    await app.listen(3333);

    prisma = app.get(PrismaService); //assign PrismaService to the variable
    await prisma.cleanDb(); //Clean the DB after all tests are run
    pactum.request.setBaseUrl('http://localhost:3333'); //Set base URL for use in all endpoint tests
  });

  // Close app after all tests are done
  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@test.com',
      password: '123',
    };

    describe('Signup', () => {
      it('should throw exception if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto.password)
          .expectStatus(400); //You can add .inspect() to see what the call returns
      });

      it('should throw exception if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto.email)
          .expectStatus(400); //You can add .inspect() to see what the call returns
      });

      it('should throw exception if no body is provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400); //You can add .inspect() to see what the call returns
      });

      it('should sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201); //You can add .inspect() to see what the call returns
      });
    });

    describe('Signin', () => {
      it('should throw an error if no email is provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto.password)
          .expectStatus(400); //You can add .inspect() to see what the call returns
      });

      it('should should throw an error if no password is provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto.email)
          .expectStatus(400); //You can add .inspect() to see what the call returns
      });

      it('should throw exception if no body is provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400); //You can add .inspect() to see what the call returns
      });

      it('should sign in', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200); //You can add .inspect() to see what the call returns
      });
    });
  }); //End of Auth

  describe('User', () => {
    describe('Get me', () => {});

    describe('Edit user', () => {});
  }); //End of User

  describe('Race', () => {
    describe('Create Race', () => {});
    describe('Get Races', () => {});
    describe('Get Race by id', () => {});
    describe('Edit race', () => {});
    describe('Delete race', () => {});
  }); //End of Race
});
