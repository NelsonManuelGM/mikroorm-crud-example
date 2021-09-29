import {
  PipeTransform,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ObjectId } from "mongodb";

export class ObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!ObjectId.isValid(value)) {
      throw new HttpException("Invalid Id", HttpStatus.BAD_REQUEST);
    }
    return ObjectId.createFromHexString(value);
  }
}