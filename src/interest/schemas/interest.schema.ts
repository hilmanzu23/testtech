import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Interest {
  @Prop()
  name: string;
  @Prop()
  idUser: string;
}

export const InterestSchema = SchemaFactory.createForClass(Interest);
