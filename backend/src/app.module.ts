import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { UsersController } from './user/user.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '',
      database: 'budgy',
      entities: ['dist/**/*.model.js'],
      synchronize: false,
    }),
    // Create User module for this
    // UserModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UserService, UserResolver],
})
export class AppModule {}
