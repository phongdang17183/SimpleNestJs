import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceDocument = Device & Document;

@Schema({ timestamps: true })
export class Device {
  @Prop({ required: true })
  userId: string;

  @Prop()
  deviceName: string;

  @Prop()
  deviceType: string; // eg: Android, iOS, Web
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
