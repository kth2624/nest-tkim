import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsEntity } from 'src/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardsEntity])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
