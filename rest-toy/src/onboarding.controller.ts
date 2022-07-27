import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  OnboardingService,
  sleepAnswers,
  sleepQuestions,
} from './onboarding.service';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly appService: OnboardingService) {}

  @Get()
  getTest(@Query('type') type: string): sleepQuestions[] {
    //in real app a database call could be made here to request other type
    if (type == 'sleep') {
      return this.appService.getSleep();
    } else throw new BadRequestException('Invalid type of onboarding');
  }

  @Post('/sleep')
  saveSleep(@Body() saveSleepData: sleepAnswers[]): string {
    //maybe do some bussiness logic and checks
    console.log(saveSleepData);
    return this.appService.saveSleep(saveSleepData);
  }
}
