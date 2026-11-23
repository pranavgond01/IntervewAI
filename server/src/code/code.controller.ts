import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";

import { CodeService } from "./code.service";

import { RunCodeDto } from "./dto/run-code.dto";

@Controller("code")
export class CodeController {
  constructor(
    private readonly codeService: CodeService,
  ) {}

 @Post("run")
async run(
  @Body() dto: RunCodeDto,
) {
  console.log(Body);

  return this.codeService.run(
  dto.language,
  dto.code,
  dto.input,
);
}
}