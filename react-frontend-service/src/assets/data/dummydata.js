import { faker } from '@faker-js/faker'

export const createData = () => {
  let dummyProductData = []
  for (var i = 0; i < 119; i++) {
    let mainCategory = 'Computers'
    let subCategory = 'Laptops'
    let brand = 'Asus'
    let tag = 'Featured Products'
    if (i % 2 === 0) {
      mainCategory = 'Entertainment'
      subCategory = 'TVs'
      brand = 'Apple'
      tag = 'Newest Products'
    }

    if (i % 3 === 0) {
      brand = 'Google'
    }

    if (i % 5 === 0) {
      mainCategory = 'Phones'
      subCategory = 'Mobile Devices'
      brand = 'Samsung'
      tag = 'Top Rated Products'
    }
    let data = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      brand: brand,
      image: faker.image.animals(600, 600, true),
      description: faker.commerce.productDescription(),
      category: faker.commerce.productAdjective(),
      mainCategory: mainCategory,
      subCategory: subCategory,
      quantity_in_stock: 10,
      tag: tag,
      Reviews: [
        {
          _id: i,
          name: faker.name.findName(),
          rating: 3.5,
          comment: faker.lorem.paragraph(),
          review_id: i,
        },
        {
          _id: i,
          name: faker.name.findName(),
          rating: 3.5,
          comment: faker.lorem.paragraph(),
          review_id: i,
        },
        {
          _id: i,
          name: faker.name.findName(),
          rating: 3.5,
          comment: faker.lorem.paragraph(),
          review_id: i,
        },
      ],
    }
    dummyProductData.push(data)
  }

  return dummyProductData
}

export const createJapaneseData = () => {
  let dummyProductData = []
  for (var i = 0; i < 119; i++) {
    let mainCategory = 'パソコン'
    let subCategory = 'ノートパソコン'
    let brand = 'Asus'
    let tag = 'おすすめ商品'
    if (i % 2 === 0) {
      mainCategory = '電気機器'
      subCategory = 'テレビ'
      brand = 'Apple'
      tag = '新しい商品'
    }

    if (i % 3 === 0) {
      brand = 'Google'
    }

    if (i % 5 === 0) {
      mainCategory = '電話'
      subCategory = '携帯電話'
      brand = 'Samsung'
      tag = '一番商品'
    }
    let data = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(5000, 150000, 2, ''),
      brand: brand,
      image: faker.image.animals(600, 600, true),
      description: faker.commerce.productDescription(),
      category: faker.commerce.productAdjective(),
      mainCategory: mainCategory,
      subCategory: subCategory,
      quantity_in_stock: 10,
      tag: tag,
      Reviews: [
        {
          _id: i,
          name: faker.name.findName(),
          rating: 3.5,
          comment: faker.lorem.paragraph(),
          review_id: i,
        },
        {
          _id: i,
          name: faker.name.findName(),
          rating: 3.5,
          comment: faker.lorem.paragraph(),
          review_id: i,
        },
        {
          _id: i,
          name: faker.name.findName(),
          rating: 3.5,
          comment: faker.lorem.paragraph(),
          review_id: i,
        },
      ],
    }
    dummyProductData.push(data)
  }

  return dummyProductData
}
