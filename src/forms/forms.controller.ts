import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FormsService, CreateFormDto, UpdateFormDto } from './forms.service';
import { Form } from '../entities/form.entity';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  findAll(): Promise<Form[]> {
    return this.formsService.findAll();
  }

  @Get('deleted')
  findDeleted(): Promise<Form[]> {
    return this.formsService.findDeleted();
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
  async update(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
  ): Promise<Form> {
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
    return { message: '表单已移至回收站' };
  }

  @Post(':id/restore')
  async restore(
    @Param('id') id: string,
  ): Promise<{ message: string; form: Form }> {
    const deletedForm = await this.formsService.findOneDeleted(+id);
    if (!deletedForm) {
      throw new HttpException('已删除的表单不存在', HttpStatus.NOT_FOUND);
    }
    const restoredForm = await this.formsService.restore(+id);
    if (!restoredForm) {
      throw new HttpException('表单恢复失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      message: '表单恢复成功',
      form: restoredForm,
    };
  }

  @Delete(':id/permanent')
  async permanentDelete(@Param('id') id: string): Promise<{ message: string }> {
    const deletedForm = await this.formsService.findOneDeleted(+id);
    if (!deletedForm) {
      throw new HttpException('已删除的表单不存在', HttpStatus.NOT_FOUND);
    }
    await this.formsService.permanentDelete(+id);
    return { message: '表单已永久删除' };
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
