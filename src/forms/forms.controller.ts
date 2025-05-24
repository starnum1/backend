import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FormsService, CreateFormDto, UpdateFormDto } from './forms.service';
import { Form } from '../entities/form.entity';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  findAll(): Promise<Form[]> {
    return this.formsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Form> {
    const form = await this.formsService.findOne(+id);
    if (!form) {
      throw new HttpException('表单不存在', HttpStatus.NOT_FOUND);
    }
    return form;
  }

  @Post()
  create(@Body() createFormDto: CreateFormDto): Promise<Form> {
    return this.formsService.create(createFormDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto): Promise<Form> {
    const form = await this.formsService.update(+id, updateFormDto);
    if (!form) {
      throw new HttpException('表单不存在', HttpStatus.NOT_FOUND);
    }
    return form;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const form = await this.formsService.findOne(+id);
    if (!form) {
      throw new HttpException('表单不存在', HttpStatus.NOT_FOUND);
    }
    await this.formsService.remove(+id);
    return { message: '表单删除成功' };
  }

  @Post(':id/duplicate')
  async duplicate(@Param('id') id: string): Promise<Form> {
    const duplicatedForm = await this.formsService.duplicate(+id);
    if (!duplicatedForm) {
      throw new HttpException('表单不存在', HttpStatus.NOT_FOUND);
    }
    return duplicatedForm;
  }
}
