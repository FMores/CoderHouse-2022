import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Render,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { CreateMsgDTO, MessageDTO } from './DTOs/message.dto';
import { MessagesService } from './messages.service';

@Controller('api/messages')
export class MessagesController {
  /**
   * Para poder utilizar el service de productss, debemos inicializar el servicio dentro del constructor
   */
  constructor(private readonly msgService: MessagesService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  getAllMessages(): Promise<MessageDTO[]> {
    return this.msgService.getAllMessages();
  }

  // Es fundamental agregar @UsePipes(ValidationPipe) para que funcionen las validadaciones en el DTO
  @UseGuards(AuthenticatedGuard)
  @Post()
  @UsePipes(ValidationPipe)
  saveMessage(@Body() message: CreateMsgDTO): Promise<MessageDTO> {
    return this.msgService.saveMessage(message);
  }
}
