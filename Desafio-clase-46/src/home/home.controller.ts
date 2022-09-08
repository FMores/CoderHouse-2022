import { Controller, Get, Render } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Holaaaaa' };
    //return this.homeService.get();
  }
}
