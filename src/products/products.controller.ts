import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthorizeRoles } from 'src/utilities/customDecorators/authrize-role.decorator';
import { UserRoleEnums } from 'src/utilities/enums/role.enum';
import { RoleGuard } from 'src/utilities/guards/authrization.guard';
import { AuthGuard } from 'src/utilities/guards/authentication.guard';


@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBody({ type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto) :Promise<{ message: string; body: ProductEntity }>{
    console.log('kdcicuhdohdkhs',createProductDto);
    const data = await this.productsService.create(createProductDto);
    console.log('kdcicuhdohdkhs',data);

    return data;
  }
  
  @UseGuards(AuthGuard, RoleGuard)
  @AuthorizeRoles(UserRoleEnums.ADMIN)
  @Get()
  async findAll() {
     const data = await this.productsService.findAll();
     return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productsService.findOne(+id);
    return data;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
