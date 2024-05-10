import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class user {
  id: number;
  session_active: boolean;

  @IsString({
    message:
      'El parámetro *first_name* debe ser una cadena de caracteres (String)',
  })
  @IsNotEmpty({
    message: 'El parámetro *first_name* debe tener por lo menos un caracter',
  })
  first_name: string;

  @IsString({
    message:
      'El parámetro *last_name* debe ser una cadena de caracteres (String)',
  })
  @IsNotEmpty({
    message: 'El parámetro *last_name* debe tener por lo menos un caracter',
  })
  last_name: string;

  @IsString({
    message:
      'El parámetro *date_birth* debe ser una cadena de caracteres (String)',
  })
  @IsNotEmpty({
    message: 'El parámetro *date_birth* debe tener por lo menos un caracter',
  })
  date_birth: string;

  @IsString({
    message: 'El parámetro *email* debe ser una cadena de caracteres (String)',
  })
  @IsEmail({}, {
    message: 'El parámetro *email* debe ser una dirección de correo electrónico válida',
  })
  @IsNotEmpty({
    message: 'El parámetro *email* debe tener por lo menos un caracter',
  })
  email: string;

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

  @IsString({
    message:
      'El parámetro *address* debe ser una cadena de caracteres (String)',
  })
  @IsNotEmpty({
    message: 'El parámetro *address* debe tener por lo menos un caracter',
  })
  address: string;
}
