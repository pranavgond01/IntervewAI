import {
Body,
Controller,
Get,
Post,
Req,
} from "@nestjs/common";

import { CandidateService } from "./candidate.service";

@Controller("candidate")
export class CandidateController{

constructor(
private readonly candidateService:CandidateService,
){}

@Post()

create(

@Body() dto:any,

@Req() req:any,

){

return this.candidateService.create(

dto,

req.user?.id ?? "demo-user",

);

}

@Get()

get(

@Req() req:any,

){

return this.candidateService.get(

req.user?.id ?? "demo-user",

);

}

}