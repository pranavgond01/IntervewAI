import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
}

@Schema({
  
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  firstName: string;

  @Prop({
    required: true,
    trim: true,
  })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Prop({
    default: false,
  })
  isEmailVerified: boolean;

  @Prop({
    default: true,
  })
  isActive: boolean;

 @Prop({
  type: String,
  default: null,
})
refreshToken: string | null;

  @Prop({
  type: String,
  default: "",
})
avatar: string;

  @Prop({
    type: [String],
    default: [],
  })
  skills: string[];

 @Prop({
  type: Date,
  default: null,
})
lastLogin: Date | null;





 

  

  

  @Prop()
  experience: string;

  @Prop({
    default: false,
  })
  verified: boolean;

  

  @Prop({
    default: "",
  })
  provider: string;


}
export const UserSchema =
  SchemaFactory.createForClass(User);
