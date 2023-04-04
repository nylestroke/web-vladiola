import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../classes/product';

@Pipe({
  name: 'catFilter',
  pure: true,
})
export class CatFilterPipe implements PipeTransform {
  transform(products: Product[], category: string, flag = false): Product[] {
    if (category === 'all') return products;

    let categoryId: number[];
    if (category === 'watches')
      categoryId = [
        6, 7, 16, 24, 30, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 108, 109, 110, 111,
        112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129,
        130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 142, 143, 144, 145, 146, 147, 148,
        149, 150, 151, 152, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 176, 177,
        178, 179, 180, 182, 183, 184, 185, 186, 187, 189, 190, 191, 192, 193, 194, 195, 196, 197,
        198,
      ];
    if (category === 'bracelets') categoryId = [3, 10];
    if (category === 'boxes') categoryId = [9];

    return products.filter((item) => {
      for (let i = 0; i < category.length; i++) {
        if (categoryId.includes(item?.category.id ?? 0)) {
          if (!flag) return true;
          else if (flag) return false;
        }
      }

      return flag;
    });
  }
}
