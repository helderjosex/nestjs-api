// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiResponse({
    status: 201,
    description: 'A record has been successfully created',
  })
  @ApiResponse({
    status: 422,
    description: 'Validation errors',
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  @ApiResponse({
    status: 200,
    description: 'Request been successfully',
  })
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a record that exists in the database',
  })
  @ApiResponse({
    status: 200,
    description: 'A record has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'A record with given id does not exist.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id).catch((e) => {
      throw new NotFoundException(e.message);
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
