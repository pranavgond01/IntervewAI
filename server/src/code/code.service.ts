import { Injectable, BadRequestException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { AxiosResponse } from "axios";

@Injectable()
export class CodeService {
  constructor(
    private readonly http: HttpService,
  ) {}

  private readonly API =
    "https://judge0-ce.p.rapidapi.com";

  private readonly headers = {
    "X-RapidAPI-Key":
      process.env.RAPID_API_KEY,

    "X-RapidAPI-Host":
      "judge0-ce.p.rapidapi.com",

    "Content-Type":
      "application/json",
  };

  private getLanguageId(
    language: string,
  ): number {
    switch (
      language.toLowerCase()
    ) {
      case "cpp":
      case "c++":
        return 54;

      case "c":
        return 50;

      case "java":
        return 62;

      case "python":
        return 71;

      case "javascript":
        return 63;

      case "typescript":
        return 74;

      case "go":
        return 60;

      case "rust":
        return 73;

      default:
        throw new BadRequestException(
          "Unsupported language",
        );
    }
  }

  async run(
  language: string,
  code: string,
  input = "",
) {
  try {
    const languageId =
      this.getLanguageId(language);

    console.log("Running code...");
    console.log({
      language,
      languageId,
      code,
      input,
    });

    console.log("Rapid API Key:", process.env.RAPID_API_KEY);

    const submit = await firstValueFrom(
      this.http.post(
        `${this.API}/submissions?base64_encoded=false&wait=false`,
        {
          source_code: code,
          language_id: languageId,
          stdin: input,
        },
        {
          headers: this.headers,
        },
      ),
    );

    console.log("Submit Response:");
    console.log(submit.data);

    const token = submit.data.token;

    await new Promise((r) => setTimeout(r, 2000));

    const result = await firstValueFrom(
      this.http.get(
        `${this.API}/submissions/${token}?base64_encoded=false`,
        {
          headers: this.headers,
        },
      ),
    );

    console.log("Judge0 Result:");
    console.log(result.data);

    return result.data;
  } catch (err: any) {
    console.log("============== ERROR ==============");
    console.log("Message:", err.message);
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
    console.log("===================================");

    throw err;
  }
}
}