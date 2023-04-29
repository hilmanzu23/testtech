import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateInterestDto } from './dto/create-interest.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InterestService {
  private interest: any[] = [];

  get(name: string, createdAt: string): any[] {
    const data = this.interest.filter((items) => {
      let isMatch = true;
      if (name && items.name != name) {
        isMatch = false;
      }
      if (createdAt && items.createdAt != createdAt) {
        isMatch = false;
      }
      return isMatch;
    });
    return data;
  }

  getById(id: string): any[] {
    const data = this.findById(id);
    return this.interest[data];
  }

  async created(createInterestDto: CreateInterestDto) {
    const { name, createdAt, password } = createInterestDto;
    const userSalt = await bcrypt.genSalt();
    return this.interest.push({
      id: uuidv4(),
      name,
      createdAt,
      salt: userSalt,
      password: await bcrypt.hash(password, userSalt),
    });
  }

  update(id: string, name: string, createdAt: string) {
    const data = this.findById(id);
    this.interest[data].name = name;
    this.interest[data].createdAt = createdAt;
  }

  findById(id: string) {
    const data = this.interest.findIndex((items) => items.id === id);
    return data;
  }

  delete(id: string) {
    const data = this.findById(id);
    return this.interest.splice(data, 1);
  }
}
