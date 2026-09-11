import summariesJson from '../product-summaries.json';
import type { Product } from './products';

export const productSummaries = summariesJson as (Product & { imageCount?: number })[];
