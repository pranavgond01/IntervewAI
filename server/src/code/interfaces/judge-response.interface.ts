export interface JudgeResponse {
  stdout?: string;

  stderr?: string;

  compile_output?: string;

  message?: string;

  status: {
    id: number;

    description: string;
  };

  time?: string;

  memory?: number;

  token?: string;
}