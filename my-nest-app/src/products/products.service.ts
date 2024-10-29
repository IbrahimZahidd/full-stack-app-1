/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async scrapeProducts() {
    const products = [];

    for (let i = 1; i <= 48; i++) {
      const { data } = await axios.get(`https://scrapeme.live/shop/page/${i}/`);
      const $ = cheerio.load(data);

      $('.products .product').each((index, element) => {
        const imageUrl = $(element).find('img').attr('src');
        const price = $(element).find('.price').text().trim();
        const description = $(element)
          .find('.woocommerce-loop-product__title')
          .text()
          .trim();

        products.push({ imageUrl, price, description });
      });
    }

    // Save products to the database
    await this.productsRepository.save(products);
    return products;
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
}
