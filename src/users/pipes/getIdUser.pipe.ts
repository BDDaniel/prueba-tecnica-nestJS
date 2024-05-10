import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class getIdUser implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const id = parseInt(value.toString());

    if (isNaN(id) || id <= 0){
      throw new HttpException('*id_user* debe ser un número entero positivo.', HttpStatus.BAD_REQUEST)
    }

    return id;
  }
}
