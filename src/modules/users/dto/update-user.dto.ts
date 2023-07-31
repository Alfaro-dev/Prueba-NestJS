import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;
}