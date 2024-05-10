import { IsNotEmpty, IsString } from 'class-validator';

export class signInDto {
  @IsString({
    message:
      'El parámetro *mobile_phone* debe ser una cadena de caracteres (String)',
  })
  @IsNotEmpty({
    message: 'El parámetro *mobile_phone* debe tener por lo menos un caracter',
  })
  mobile_phone: string;

  @IsString({
    message:
      'El parámetro *password* debe ser una cadena de caracteres (String)',
  })
  @IsNotEmpty({
    message: 'El parámetro *password* debe tener por lo menos un caracter',
  })
  password: string;
}