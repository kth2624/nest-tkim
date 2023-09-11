import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/')
  async getBoard() {
    return await this.boardService.getBoard();
  }

  @Post('/')
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string) {
    return this.boardService.getBoardById(+id);
  }

  @Patch('/:id')
  async updateBoard(
    @Param('id') id: string,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    return await this.boardService.updateBoard(+id, createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardService.deleteBoard(+id);
  }
}
