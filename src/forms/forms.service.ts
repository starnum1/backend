import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from '../entities/form.entity';

export interface CreateFormDto {
  name: string;
  description?: string;
  content: string;
  status?: string;
}

export interface UpdateFormDto {
  name?: string;
  description?: string;
  content?: string;
  status?: string;
}

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
  ) {}

  findAll(): Promise<Form[]> {
    return this.formsRepository.find({
      order: { updatedAt: 'DESC' }
    });
  }

  findOne(id: number): Promise<Form | null> {
    return this.formsRepository.findOneBy({ id });
  }

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const form = this.formsRepository.create({
      ...createFormDto,
      status: createFormDto.status || 'draft'
    });
    return this.formsRepository.save(form);
  }

  async update(id: number, updateFormDto: UpdateFormDto): Promise<Form | null> {
    await this.formsRepository.update(id, updateFormDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.formsRepository.delete(id);
  }

  async duplicate(id: number): Promise<Form | null> {
    const originalForm = await this.findOne(id);
    if (!originalForm) {
      return null;
    }

    const duplicatedForm = this.formsRepository.create({
      name: `${originalForm.name} (副本)`,
      description: originalForm.description,
      content: originalForm.content,
      status: 'draft'
    });

    return this.formsRepository.save(duplicatedForm);
  }
}
