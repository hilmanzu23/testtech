import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop()
  fullName: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: string;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  height: string;

  @Prop()
  weight: string;

  @Prop()
  imagePhoto: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';
}

export const UserSchema = SchemaFactory.createForClass(User);
