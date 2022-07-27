import { Injectable } from '@nestjs/common';

@Injectable()
export class OnboardingService {
  getHello(): string {
    return 'Hello World!';
  }

  getSleep(): sleepQuestions[] {
    //in real app a database call would be made here to get this data
    const sleepQuestions: sleepQuestions[] = [
      {
        stepNumber: 0,
        questionType: 'Info',
        question:
          "Let 's start by calaculating your sleep efficiency and examining your concers....",
        answers: [],
      },
      {
        stepNumber: 1,
        questionType: 'Multiple Choice',
        question:
          "Let's say in a few weeks,you're sleeping well.What would you change?",
        answers: [
          'I would go to sleep easily',
          'I would sleep through the night',
          "I'd wake up on time,refreshed",
        ],
      },
      {
        stepNumber: 2,
        questionType: 'Single Choice',
        question:
          "That's a great goal.How long have you been struggling with your sleep?",
        answers: ['less than 2 weeks', '2 to 8 weeks', 'more than 8 weeks'],
      },
      {
        stepNumber: 4,
        questionType: 'Single Time',
        question: 'What time do you go to bed for sleep?',
        answers: [],
      },
      {
        stepNumber: 5,
        questionType: 'Single Time',
        question: 'What time do you get out of bed to start to start your day?',
        answers: [],
      },
      {
        stepNumber: 6,
        questionType: 'Single Number',
        question: 'OK.How many hours sleep do you get in a typical night?',
        answers: ['1hr,2hr,3hr,4hr,5hr,6hr,7hr,8hr,9hr,10hr'],
      },
    ];
    return sleepQuestions;
  }

  saveSleep(sleepAnswers: sleepAnswers[]): string {
    //do some bussiness logic,proccess and save the data
    //and return the score
    return "You Seem to have Sleep Efficiency of 43%,We 'll get this up to 80% 😎...";
  }
}

//For sake of simplicity interfaces are directly declared in the service file

//schema for nosql database
export interface sleepQuestions {
  //id:string //primary key
  stepNumber: number;
  questionType: string;
  question: string; //storing markdown or html for formatting
  answers: Array<string>; //storing markdown or html for formatting
  //onBoardType: string;
  //onBoardType is the type of onboarding, ie. sleep, anxiety?.. etc
  //just an example of how to structure the schema for nosql database
}

export interface sleepAnswers {
  //id:string //primary key
  //userId: string; //fingerprint of the device + nickname? not sure how it is implmented in Wysa
  stepNumber: number;
  questionType: string;
  answers: Array<string>; //better to store the index of the answer incase of mcq
  //onBoardType: string;
}
