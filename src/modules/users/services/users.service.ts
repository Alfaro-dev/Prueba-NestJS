import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(email: string): Promise<User | undefined> {
        return await this.usersRepository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User> {
        return this.usersRepository.findOne({ where: { id } });
    }


    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = hashedPassword;

        return await this.usersRepository.save(user);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (user) {
            user.name = updateUserDto.name;
            user.email = updateUserDto.email;

            return await this.usersRepository.save(user);
        }

        return undefined;
    }

    async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
