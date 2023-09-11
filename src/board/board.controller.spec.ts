import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardsEntity } from '../entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

describe('BoardController', () => {
  let controller: BoardController;
  let service: BoardService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([BoardsEntity]),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.MYSQL_HOST,
          port: +process.env.MYSQL_PORT,
          username: process.env.MYSQL_USERNAME,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
          entities: [BoardsEntity],
          synchronize: false,
        }),
      ],
      controllers: [BoardController],
      providers: [BoardService],
    }).compile();

    controller = module.get<BoardController>(BoardController);
    service = module.get<BoardService>(BoardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBoardById', () => {
    it('should call the service', async () => {
      const result = {
        id: 2,
        title: 'board2',
        description: 'hello',
        createdAt: new Date('2023-09-08T23:18:53.000Z'),
        updatedAt: new Date('2023-09-08T23:18:53.000Z'),
      };
      const spy = jest.spyOn(service, 'getBoardById').mockResolvedValue(result);
      expect(await controller.getBoardById('2')).toStrictEqual(result); //실제 디비에 있는 값과 비교
      expect(spy).toBeCalledWith(2);
    });
  });

  describe('createBoard', () => {
    it('should call the service', async () => {
      const result = {
        id: 1,
        title: 'test title',
        description: 'hello world',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const spy = jest.spyOn(service, 'createBoard').mockResolvedValue(result);
      expect(
        await controller.createBoard({
          title: result.title,
          description: result.description,
        }),
      ).toStrictEqual(result);
      //expect(spy).toBeCalledWith(result);
    });
  });
});
