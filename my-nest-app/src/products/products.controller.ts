/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('scrape')
  async scrape() {
    const products = await this.productsService.scrapeProducts();
    return { message: 'Products scraped successfully!', products };
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('search')
  async search(@Query('q') query: string): Promise<Product[]> {
    return this.productsService.searchProducts(query);
  }
}
