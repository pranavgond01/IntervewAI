import {
  IsOptional,
  IsString,
} from "class-validator";

export class RunCodeDto {
  @IsString()
  language: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  input?: string;
}