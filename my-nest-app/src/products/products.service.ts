/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types'; // Adjust the path if necessary

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly elasticsearchService: ElasticsearchService,
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

        const product = { imageUrl, price, description };
        products.push(product);

        // Index the product into Elasticsearch
        this.elasticsearchService.index({
          index: 'products',
          body: product,
        });
      });
    }

    // Save products to the database
    await this.productsRepository.save(products);
    return products;
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response: SearchResponse<Product> =
      await this.elasticsearchService.search<Product>({
        index: 'products',
        body: {
          query: {
            multi_match: {
              query,
              fields: ['description', 'price'],
            },
          },
        },
      });

    // Check if there are hits before mapping
    return response.hits.hits.map((hit) => hit._source);
  }
}
