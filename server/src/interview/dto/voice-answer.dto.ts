import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class VoiceAnswerDto {
  @IsString()
  @IsNotEmpty()
  transcript: string;
}