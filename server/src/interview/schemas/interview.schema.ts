import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InterviewDocument = HydratedDocument<Interview>;

@Schema({
  timestamps: true,
})
export class Interview {
  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
  })
  resumeId: string;

  @Prop({
    required: true,
  })
  role: string;

  @Prop({
    default: 'Easy',
  })
  difficulty: string;

  @Prop({
    default: 'pending',
  })
  status: string;

  @Prop({
  type: [
    {
      text: {
        type: String,
      },

      type: {
        type: String,
        default: "technical",
      },

      difficulty: {
        type: String,
        default: "Easy",
      },
    },
  ],

  default: [],
})

questions: {
  text: string;

  type: string;

  difficulty: string;

}[];



@Prop({
  type: [String],
  default: [],
})
idealAnswers: string[];

@Prop({
  type: [[String]],
  default: [],
})
learningResources: string[][];



  @Prop({
    type: [String],
    default: [],
  })
  answers: string[];


@Prop({
  default: "",
})
hireDecision: string;

@Prop({
  default: 0,
})
hiringConfidence: number;

@Prop({
  default: "",
})
recruiterSummary: string;

@Prop({
  type: [String],
  default: [],
})
recommendedCompanies: string[];

@Prop({
  default: "",
})
expectedSalary: string;
  






 @Prop({
  type: {
    currentLevel: String,

    readiness: Number,

    missingSkills: [String],

    roadmap: [
      {
        week: Number,
        title: String,
        tasks: [String],
      },
    ],

    courses: [
      {
        title: String,
        platform: String,
        url: String,
      },
    ],

    companies: [String],
  },

  default: {},
})
careerRoadmap: any;

  @Prop({
    type: [Number],
    default: [],
  })
  scores: number[];

  @Prop({
    type: [String],
    default: [],
  })
  strengths: string[];

  @Prop({
    type: [String],
    default: [],
  })
  weaknesses: string[];

  @Prop({
    default: '',
  })
  recommendation: string;

  @Prop({
    default: '',
  })
  feedback: string;

  @Prop({
    default: 0,
  })
  currentQuestion: number;

  @Prop({
    default: 0,
  })
  overallScore: number;

  @Prop({
    default: false,
  })
  completed: boolean;

  @Prop()
  startedAt: Date;

  @Prop()
  completedAt: Date;

  @Prop({
  default:0,
})
communication:number;

@Prop({
  default:0,
})
technical:number;

@Prop({
  default:0,
})
problemSolving:number;

@Prop({
  default:0,
})
confidence:number;

@Prop({
  default:0,
})
clarity:number;

@Prop({
  default:0,
})
fluency:number;

@Prop({
  default:0,
})
vocabulary:number;



@Prop({
default:[],
})
violations:string[];

@Prop({
default:0,
})
violationCount:number;

@Prop({
default:false,
})
autoSubmitted:boolean;



@Prop({
  type: [
    {
      role: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
  default: [],
})
conversationHistory: {
  role: string;
  content: string;
}[];
  
}







export const InterviewSchema =
  SchemaFactory.createForClass(Interview);