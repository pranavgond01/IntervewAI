import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Candidate, CandidateDocument } from "./schemas/candidate.schema";

@Injectable()
export class CandidateService {

constructor(
@InjectModel(Candidate.name)
private readonly candidateModel: Model<CandidateDocument>,
){}

async create(dto:any,userId:string){

return this.candidateModel.create({

userId,

...dto

});

}

async get(userId:string){

return this.candidateModel.findOne({

userId

});

}

}