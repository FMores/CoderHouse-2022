import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { CreateMsgDTO, MessageDTO } from './DTOs/message.dto';

@Injectable()
export class MessagesService {
  // Inyectamos la entidad/modelo "message" creado en app.module.ts
  constructor(
    @InjectModel('Message') private readonly msgModel: Model<MessageDTO>,
  ) {}

  // @ApiOperation y @ApiResponse tienen la funcion de describir la operecion para que swagger
  // puega generar la documentacion en base a esos datos.

  /**
   * -----------------------------------------------
   * ------------------- GET ALL -------------------
   * -----------------------------------------------
   */
  @ApiOperation({
    description: 'Retorna un array de mensajes',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna un array de mensajes correctamente',
    type: MessageDTO,
  })
  async getAllMessages(): Promise<MessageDTO[]> {
    return await this.msgModel.find();
  }

  /**
   * -----------------------------------------------
   * --------------------- POST --------------------
   * -----------------------------------------------
   */
  @Post()
  async saveMessage(message: CreateMsgDTO): Promise<MessageDTO> {
    const msgToSave = {
      author: {
        email: message.email,
        name: message.name,
        surname: message.surname,
        age: message.age,
        alias: message.alias,
        avatar: message.avatar,
      },
      text: message.text,
    };

    const newMessage = new this.msgModel(msgToSave);

    newMessage.save();

    return newMessage;
  }
}
