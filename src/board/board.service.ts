import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsEntity } from '../entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardsEntity)
    private boardRepository: Repository<BoardsEntity>,
  ) {}

  //전체 게시글 조회
  async getBoard() {
    const boards = await this.boardRepository.find();
    console.log(boards);
    return boards;
  }
  //게시글 생성
  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board = {
      title: title,
      description: description,
    };
    const result = await this.boardRepository.save(board);
    return result;
  }
  //게시글 상세 조회
  async getBoardById(id: number) {
    return await this.boardRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  //게시글 수정
  async updateBoard(id: number, createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board = await this.getBoardById(id);
    if (!board) throw new Error('게시글이 존재하지 않습니다.');
    console.log(board);

    board.title = title;
    board.description = description;
    console.log(board);

    await this.boardRepository.save(board);
    return board;
  }
  //게시글 삭제
  async deleteBoard(id: number) {
    await this.boardRepository.remove(await this.getBoardById(id));
  }
}
