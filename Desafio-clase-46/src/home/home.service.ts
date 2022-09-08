import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  get(): string {
    return 'Hola desde HOME';
  }
}
