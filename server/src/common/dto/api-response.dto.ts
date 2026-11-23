import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = unknown> {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Request completed successfully.',
  })
  message: string;

  @ApiProperty({
    example: {},
    required: false,
  })
  data?: T;

  @ApiProperty({
    example: null,
    nullable: true,
    required: false,
  })
  meta?: unknown;

  constructor(
    success: boolean,
    statusCode: number,
    message: string,
    data?: T,
    meta?: unknown,
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }

  static success<T>(
    message: string,
    data?: T,
    statusCode = 200,
    meta?: unknown,
  ): ApiResponseDto<T> {
    return new ApiResponseDto<T>(
      true,
      statusCode,
      message,
      data,
      meta,
    );
  }

  static created<T>(
    message: string,
    data?: T,
  ): ApiResponseDto<T> {
    return new ApiResponseDto<T>(
      true,
      201,
      message,
      data,
    );
  }

  static error(
    message: string,
    statusCode = 500,
    data?: unknown,
  ): ApiResponseDto {
    return new ApiResponseDto(
      false,
      statusCode,
      message,
      data,
    );
  }
}