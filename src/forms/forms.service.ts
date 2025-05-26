import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
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
      where: { deletedAt: IsNull() },
      order: { updatedAt: 'DESC' },
    });
  }

  findOne(id: number): Promise<Form | null> {
    return this.formsRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });
  }

  // 查找已删除的表单
  findDeleted(): Promise<Form[]> {
    return this.formsRepository.find({
      where: { deletedAt: Not(IsNull()) },
      order: { deletedAt: 'DESC' },
      withDeleted: true,
    });
  }

  // 查找单个已删除的表单
  findOneDeleted(id: number): Promise<Form | null> {
    return this.formsRepository.findOne({
      where: { id, deletedAt: Not(IsNull()) },
      withDeleted: true,
    });
  }

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const form = this.formsRepository.create({
      ...createFormDto,
      status: createFormDto.status || 'draft',
    });
    return this.formsRepository.save(form);
  }

  async update(id: number, updateFormDto: UpdateFormDto): Promise<Form | null> {
    await this.formsRepository.update(
      { id, deletedAt: IsNull() },
      updateFormDto,
    );
    return this.findOne(id);
  }

  // 逻辑删除
  async remove(id: number): Promise<void> {
    await this.formsRepository.softDelete(id);
  }

  // 恢复删除的表单
  async restore(id: number): Promise<Form | null> {
    await this.formsRepository.restore(id);
    return this.findOne(id);
  }

  // 永久删除表单
  async permanentDelete(id: number): Promise<void> {
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
      status: 'draft',
    });

    return this.formsRepository.save(duplicatedForm);
  }
}
