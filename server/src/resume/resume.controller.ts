import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import {
  diskStorage,
} from 'multer';

import {
  extname,
} from 'path';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ResumeService } from './resume.service';

@Controller('resume')
@UseGuards(JwtAuthGuard)
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
  ) {}

  @Post("upload")
@UseInterceptors(
  FileInterceptor("resume", {
    storage: diskStorage({
      destination: "./uploads",

      filename(req, file, cb) {
        cb(
          null,
          Date.now() +
            extname(file.originalname),
        );
      },
    }),
  }),
)
async upload(
  @UploadedFile()
  file: Express.Multer.File,

  @Req()
  req: any,
) {
  return this.resumeService.analyzeResume(
    file,
    req.user.id,
  );
}

  @Get("history")
history(
  @Req() req: any,
) {
  return this.resumeService.getHistory(req.user.id);

}

  @Get(':id')
  async getOne(
    @Param('id')
    id: string,
  ) {
    return this.resumeService.getOne(id);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    return this.resumeService.delete(id);
  }
}