import fs from 'node:fs';

const source = new URL('../app/products.json', import.meta.url);
const destination = new URL('../app/product-summaries.json', import.meta.url);
const displayMapSource = new URL('../app/product-display-map.json', import.meta.url);
const displayFitMapSource = new URL('../app/product-display-fit-map.json', import.meta.url);
const products = JSON.parse(fs.readFileSync(source, 'utf8'));
const displayMap = JSON.parse(fs.readFileSync(displayMapSource, 'utf8'));
const displayFitMap = JSON.parse(fs.readFileSync(displayFitMapSource, 'utf8'));

const summaries = products.map(({
  id, name, category, price, sku, image, images, description, specs, badge, featured, priority, accuracy,
}) => ({
  id,
  name,
  category,
  price,
  sku,
  image: (() => {
    const sourceImage = images?.[0] ?? image ?? null;
    return sourceImage ? (displayMap[sourceImage] ?? sourceImage) : null;
  })(),
  imageFit: (() => {
    const sourceImage = images?.[0] ?? image ?? null;
    return sourceImage ? (displayFitMap[sourceImage] ?? 'contain') : 'contain';
  })(),
  imageCount: images?.length ?? (image ? 1 : 0),
  description,
  specs,
  badge,
  featured,
  priority,
  accuracy,
}));

fs.writeFileSync(destination, `${JSON.stringify(summaries, null, 2)}\n`, 'utf8');
