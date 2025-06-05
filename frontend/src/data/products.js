 const productsData = {
  products: [
  {
    "_id": "PROD-001",
    "name": "Product 1 Name",
    "description": "This is the description of product 1. Crafted with high-quality materials for lasting comfort and style.",
    "price": 21.5,
    "discountPrice": 19.35,
    "countInStock": 3,
    "sku": "SKU-00001",
    "category": "Bottom Wear",
    "brand": "MetroStyle",
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Summer Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=3",
        "altText": "Product 1 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=4",
        "altText": "Product 1 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 2
  },
  {
    "_id": "PROD-002",
    "name": "Product 2 Name",
    "description": "This is the description of product 2. Crafted with high-quality materials for lasting comfort and style.",
    "price": 23.0,
    "discountPrice": 20.7,
    "countInStock": 6,
    "sku": "SKU-00002",
    "category": "Footwear",
    "brand": "Fashion Hub",
    "sizes": [
      "XS",
      "S",
      "M"
    ],
    "colors": [
      "Green",
      "Blue"
    ],
    "collections": "Winter Collection",
    "material": "Leather",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=5",
        "altText": "Product 2 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=6",
        "altText": "Product 2 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 4
  },
  {
    "_id": "PROD-003",
    "name": "Product 3 Name",
    "description": "This is the description of product 3. Crafted with high-quality materials for lasting comfort and style.",
    "price": 24.5,
    "discountPrice": 22.05,
    "countInStock": 9,
    "sku": "SKU-00003",
    "category": "Accessories",
    "brand": "Style Street",
    "sizes": [
      "L",
      "XL"
    ],
    "colors": [
      "Yellow",
      "Pink"
    ],
    "collections": "Sportswear",
    "material": "Denim",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=7",
        "altText": "Product 3 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=8",
        "altText": "Product 3 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 6
  },
  {
    "_id": "PROD-004",
    "name": "Product 4 Name",
    "description": "This is the description of product 4. Crafted with high-quality materials for lasting comfort and style.",
    "price": 26.0,
    "discountPrice": 23.4,
    "countInStock": 12,
    "sku": "SKU-00004",
    "category": "Outerwear",
    "brand": "Elite Apparel",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Formal",
    "material": "Wool",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=9",
        "altText": "Product 4 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=10",
        "altText": "Product 4 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 8
  },
  {
    "_id": "PROD-005",
    "name": "Product 5 Name",
    "description": "This is the description of product 5. Crafted with high-quality materials for lasting comfort and style.",
    "price": 27.5,
    "discountPrice": 24.75,
    "countInStock": 15,
    "sku": "SKU-00005",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=11",
        "altText": "Product 5 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=12",
        "altText": "Product 5 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 10
  },
  {
    "_id": "PROD-006",
    "name": "Product 6 Name",
    "description": "This is the description of product 6. Crafted with high-quality materials for lasting comfort and style.",
    "price": 29.0,
    "discountPrice": 26.1,
    "countInStock": 18,
    "sku": "SKU-00006",
    "category": "Bottom Wear",
    "brand": "MetroStyle",
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Summer Collection",
    "material": "Polyester",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=13",
        "altText": "Product 6 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=14",
        "altText": "Product 6 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 12
  },
  {
    "_id": "PROD-007",
    "name": "Product 7 Name",
    "description": "This is the description of product 7. Crafted with high-quality materials for lasting comfort and style.",
    "price": 30.5,
    "discountPrice": 27.45,
    "countInStock": 21,
    "sku": "SKU-00007",
    "category": "Footwear",
    "brand": "Fashion Hub",
    "sizes": [
      "XS",
      "S",
      "M"
    ],
    "colors": [
      "Green",
      "Blue"
    ],
    "collections": "Winter Collection",
    "material": "Leather",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=15",
        "altText": "Product 7 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=16",
        "altText": "Product 7 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 14
  },
  {
    "_id": "PROD-008",
    "name": "Product 8 Name",
    "description": "This is the description of product 8. Crafted with high-quality materials for lasting comfort and style.",
    "price": 32.0,
    "discountPrice": 28.8,
    "countInStock": 24,
    "sku": "SKU-00008",
    "category": "Accessories",
    "brand": "Style Street",
    "sizes": [
      "L",
      "XL"
    ],
    "colors": [
      "Yellow",
      "Pink"
    ],
    "collections": "Sportswear",
    "material": "Denim",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=17",
        "altText": "Product 8 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=18",
        "altText": "Product 8 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 16
  },
  {
    "_id": "PROD-009",
    "name": "Product 9 Name",
    "description": "This is the description of product 9. Crafted with high-quality materials for lasting comfort and style.",
    "price": 33.5,
    "discountPrice": 30.15,
    "countInStock": 27,
    "sku": "SKU-00009",
    "category": "Outerwear",
    "brand": "Elite Apparel",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Formal",
    "material": "Wool",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=19",
        "altText": "Product 9 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=20",
        "altText": "Product 9 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 18
  },
  {
    "_id": "PROD-010",
    "name": "Product 10 Name",
    "description": "This is the description of product 10. Crafted with high-quality materials for lasting comfort and style.",
    "price": 35.0,
    "discountPrice": 31.5,
    "countInStock": 30,
    "sku": "SKU-00010",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=21",
        "altText": "Product 10 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=22",
        "altText": "Product 10 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 20
  },
  {
    "_id": "PROD-011",
    "name": "Product 11 Name",
    "description": "This is the description of product 11. Crafted with high-quality materials for lasting comfort and style.",
    "price": 36.5,
    "discountPrice": 32.85,
    "countInStock": 33,
    "sku": "SKU-00011",
    "category": "Bottom Wear",
    "brand": "MetroStyle",
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Summer Collection",
    "material": "Polyester",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=23",
        "altText": "Product 11 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=24",
        "altText": "Product 11 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 22
  },
  {
    "_id": "PROD-012",
    "name": "Product 12 Name",
    "description": "This is the description of product 12. Crafted with high-quality materials for lasting comfort and style.",
    "price": 38.0,
    "discountPrice": 34.2,
    "countInStock": 36,
    "sku": "SKU-00012",
    "category": "Footwear",
    "brand": "Fashion Hub",
    "sizes": [
      "XS",
      "S",
      "M"
    ],
    "colors": [
      "Green",
      "Blue"
    ],
    "collections": "Winter Collection",
    "material": "Leather",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=25",
        "altText": "Product 12 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=26",
        "altText": "Product 12 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 24
  },
  {
    "_id": "PROD-013",
    "name": "Product 13 Name",
    "description": "This is the description of product 13. Crafted with high-quality materials for lasting comfort and style.",
    "price": 39.5,
    "discountPrice": 35.55,
    "countInStock": 39,
    "sku": "SKU-00013",
    "category": "Accessories",
    "brand": "Style Street",
    "sizes": [
      "L",
      "XL"
    ],
    "colors": [
      "Yellow",
      "Pink"
    ],
    "collections": "Sportswear",
    "material": "Denim",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=27",
        "altText": "Product 13 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=28",
        "altText": "Product 13 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 26
  },
  {
    "_id": "PROD-014",
    "name": "Product 14 Name",
    "description": "This is the description of product 14. Crafted with high-quality materials for lasting comfort and style.",
    "price": 41.0,
    "discountPrice": 36.9,
    "countInStock": 42,
    "sku": "SKU-00014",
    "category": "Outerwear",
    "brand": "Elite Apparel",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Formal",
    "material": "Wool",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=29",
        "altText": "Product 14 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=30",
        "altText": "Product 14 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 28
  },
  {
    "_id": "PROD-015",
    "name": "Product 15 Name",
    "description": "This is the description of product 15. Crafted with high-quality materials for lasting comfort and style.",
    "price": 42.5,
    "discountPrice": 38.25,
    "countInStock": 45,
    "sku": "SKU-00015",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=31",
        "altText": "Product 15 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=32",
        "altText": "Product 15 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 0
  },
  {
    "_id": "PROD-016",
    "name": "Product 16 Name",
    "description": "This is the description of product 16. Crafted with high-quality materials for lasting comfort and style.",
    "price": 44.0,
    "discountPrice": 39.6,
    "countInStock": 48,
    "sku": "SKU-00016",
    "category": "Bottom Wear",
    "brand": "MetroStyle",
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Summer Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=33",
        "altText": "Product 16 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=34",
        "altText": "Product 16 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 2
  },
  {
    "_id": "PROD-017",
    "name": "Product 17 Name",
    "description": "This is the description of product 17. Crafted with high-quality materials for lasting comfort and style.",
    "price": 45.5,
    "discountPrice": 40.95,
    "countInStock": 1,
    "sku": "SKU-00017",
    "category": "Footwear",
    "brand": "Fashion Hub",
    "sizes": [
      "XS",
      "S",
      "M"
    ],
    "colors": [
      "Green",
      "Blue"
    ],
    "collections": "Winter Collection",
    "material": "Leather",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=35",
        "altText": "Product 17 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=36",
        "altText": "Product 17 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 4
  },
  {
    "_id": "PROD-018",
    "name": "Product 18 Name",
    "description": "This is the description of product 18. Crafted with high-quality materials for lasting comfort and style.",
    "price": 47.0,
    "discountPrice": 42.3,
    "countInStock": 4,
    "sku": "SKU-00018",
    "category": "Accessories",
    "brand": "Style Street",
    "sizes": [
      "L",
      "XL"
    ],
    "colors": [
      "Yellow",
      "Pink"
    ],
    "collections": "Sportswear",
    "material": "Denim",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=37",
        "altText": "Product 18 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=38",
        "altText": "Product 18 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 6
  },
  {
    "_id": "PROD-019",
    "name": "Product 19 Name",
    "description": "This is the description of product 19. Crafted with high-quality materials for lasting comfort and style.",
    "price": 48.5,
    "discountPrice": 43.65,
    "countInStock": 7,
    "sku": "SKU-00019",
    "category": "Outerwear",
    "brand": "Elite Apparel",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Formal",
    "material": "Wool",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=39",
        "altText": "Product 19 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=40",
        "altText": "Product 19 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 8
  },
  {
    "_id": "PROD-020",
    "name": "Product 20 Name",
    "description": "This is the description of product 20. Crafted with high-quality materials for lasting comfort and style.",
    "price": 50.0,
    "discountPrice": 45.0,
    "countInStock": 10,
    "sku": "SKU-00020",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=41",
        "altText": "Product 20 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=42",
        "altText": "Product 20 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 10
  },
  {
    "_id": "PROD-021",
    "name": "Product 21 Name",
    "description": "This is the description of product 21. Crafted with high-quality materials for lasting comfort and style.",
    "price": 51.5,
    "discountPrice": 46.35,
    "countInStock": 13,
    "sku": "SKU-00021",
    "category": "Bottom Wear",
    "brand": "MetroStyle",
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Summer Collection",
    "material": "Polyester",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=43",
        "altText": "Product 21 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=44",
        "altText": "Product 21 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 12
  },
  {
    "_id": "PROD-022",
    "name": "Product 22 Name",
    "description": "This is the description of product 22. Crafted with high-quality materials for lasting comfort and style.",
    "price": 53.0,
    "discountPrice": 47.7,
    "countInStock": 16,
    "sku": "SKU-00022",
    "category": "Footwear",
    "brand": "Fashion Hub",
    "sizes": [
      "XS",
      "S",
      "M"
    ],
    "colors": [
      "Green",
      "Blue"
    ],
    "collections": "Winter Collection",
    "material": "Leather",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=45",
        "altText": "Product 22 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=46",
        "altText": "Product 22 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 14
  },
  {
    "_id": "PROD-023",
    "name": "Product 23 Name",
    "description": "This is the description of product 23. Crafted with high-quality materials for lasting comfort and style.",
    "price": 54.5,
    "discountPrice": 49.05,
    "countInStock": 19,
    "sku": "SKU-00023",
    "category": "Accessories",
    "brand": "Style Street",
    "sizes": [
      "L",
      "XL"
    ],
    "colors": [
      "Yellow",
      "Pink"
    ],
    "collections": "Sportswear",
    "material": "Denim",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=47",
        "altText": "Product 23 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=48",
        "altText": "Product 23 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 16
  },
  {
    "_id": "PROD-024",
    "name": "Product 24 Name",
    "description": "This is the description of product 24. Crafted with high-quality materials for lasting comfort and style.",
    "price": 56.0,
    "discountPrice": 50.4,
    "countInStock": 22,
    "sku": "SKU-00024",
    "category": "Outerwear",
    "brand": "Elite Apparel",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Formal",
    "material": "Wool",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=49",
        "altText": "Product 24 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=50",
        "altText": "Product 24 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 18
  },
  {
    "_id": "PROD-025",
    "name": "Product 25 Name",
    "description": "This is the description of product 25. Crafted with high-quality materials for lasting comfort and style.",
    "price": 57.5,
    "discountPrice": 51.75,
    "countInStock": 25,
    "sku": "SKU-00025",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=51",
        "altText": "Product 25 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=52",
        "altText": "Product 25 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 20
  },
  {
    "_id": "PROD-026",
    "name": "Product 26 Name",
    "description": "This is the description of product 26. Crafted with high-quality materials for lasting comfort and style.",
    "price": 59.0,
    "discountPrice": 53.1,
    "countInStock": 28,
    "sku": "SKU-00026",
    "category": "Bottom Wear",
    "brand": "MetroStyle",
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Summer Collection",
    "material": "Polyester",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=53",
        "altText": "Product 26 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=54",
        "altText": "Product 26 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 22
  },
  {
    "_id": "PROD-027",
    "name": "Product 27 Name",
    "description": "This is the description of product 27. Crafted with high-quality materials for lasting comfort and style.",
    "price": 60.5,
    "discountPrice": 54.45,
    "countInStock": 31,
    "sku": "SKU-00027",
    "category": "Footwear",
    "brand": "Fashion Hub",
    "sizes": [
      "XS",
      "S",
      "M"
    ],
    "colors": [
      "Green",
      "Blue"
    ],
    "collections": "Winter Collection",
    "material": "Leather",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=55",
        "altText": "Product 27 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=56",
        "altText": "Product 27 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 24
  },
  {
    "_id": "PROD-028",
    "name": "Product 28 Name",
    "description": "This is the description of product 28. Crafted with high-quality materials for lasting comfort and style.",
    "price": 62.0,
    "discountPrice": 55.8,
    "countInStock": 34,
    "sku": "SKU-00028",
    "category": "Accessories",
    "brand": "Style Street",
    "sizes": [
      "L",
      "XL"
    ],
    "colors": [
      "Yellow",
      "Pink"
    ],
    "collections": "Sportswear",
    "material": "Denim",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=57",
        "altText": "Product 28 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=58",
        "altText": "Product 28 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 26
  },
  {
    "_id": "PROD-029",
    "name": "Product 29 Name",
    "description": "This is the description of product 29. Crafted with high-quality materials for lasting comfort and style.",
    "price": 63.5,
    "discountPrice": 57.15,
    "countInStock": 37,
    "sku": "SKU-00029",
    "category": "Outerwear",
    "brand": "Elite Apparel",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Formal",
    "material": "Wool",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=59",
        "altText": "Product 29 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=60",
        "altText": "Product 29 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 28
  },
  {
    "_id": "PROD-030",
    "name": "Product 30 Name",
    "description": "This is the description of product 30. Crafted with high-quality materials for lasting comfort and style.",
    "price": 65.0,
    "discountPrice": 58.5,
    "countInStock": 40,
    "sku": "SKU-00030",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=61",
        "altText": "Product 30 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=62",
        "altText": "Product 30 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 0
  },
  {
    "_id": "PROD-031",
    "name": "Product 31 Name",
    "description": "This is the description of product 31. Crafted with high-quality materials for lasting comfort and style.",
    "price": 66.5,
    "discountPrice": 59.85,
    "countInStock": 43,
    "sku": "SKU-00031",
    "category": "Bottom Wear",
    "brand": "MetroStyle",
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Summer Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=63",
        "altText": "Product 31 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=64",
        "altText": "Product 31 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 2
  },
  {
    "_id": "PROD-032",
    "name": "Product 32 Name",
    "description": "This is the description of product 32. Crafted with high-quality materials for lasting comfort and style.",
    "price": 68.0,
    "discountPrice": 61.2,
    "countInStock": 46,
    "sku": "SKU-00032",
    "category": "Footwear",
    "brand": "Fashion Hub",
    "sizes": [
      "XS",
      "S",
      "M"
    ],
    "colors": [
      "Green",
      "Blue"
    ],
    "collections": "Winter Collection",
    "material": "Leather",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=65",
        "altText": "Product 32 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=66",
        "altText": "Product 32 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 4
  },
  {
    "_id": "PROD-033",
    "name": "Product 33 Name",
    "description": "This is the description of product 33. Crafted with high-quality materials for lasting comfort and style.",
    "price": 69.5,
    "discountPrice": 62.55,
    "countInStock": 49,
    "sku": "SKU-00033",
    "category": "Accessories",
    "brand": "Style Street",
    "sizes": [
      "L",
      "XL"
    ],
    "colors": [
      "Yellow",
      "Pink"
    ],
    "collections": "Sportswear",
    "material": "Denim",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=67",
        "altText": "Product 33 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=68",
        "altText": "Product 33 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 6
  },
  {
    "_id": "PROD-034",
    "name": "Product 34 Name",
    "description": "This is the description of product 34. Crafted with high-quality materials for lasting comfort and style.",
    "price": 71.0,
    "discountPrice": 63.9,
    "countInStock": 2,
    "sku": "SKU-00034",
    "category": "Outerwear",
    "brand": "Elite Apparel",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Formal",
    "material": "Wool",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=69",
        "altText": "Product 34 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=70",
        "altText": "Product 34 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 8
  },
  {
    "_id": "PROD-035",
    "name": "Product 35 Name",
    "description": "This is the description of product 35. Crafted with high-quality materials for lasting comfort and style.",
    "price": 72.5,
    "discountPrice": 65.25,
    "countInStock": 5,
    "sku": "SKU-00035",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=71",
        "altText": "Product 35 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=72",
        "altText": "Product 35 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 10
  },
  {
    "_id": "PROD-036",
    "name": "Product 36 Name",
    "description": "This is the description of product 36. Crafted with high-quality materials for lasting comfort and style.",
    "price": 74.0,
    "discountPrice": 66.6,
    "countInStock": 8,
    "sku": "SKU-00036",
    "category": "Bottom Wear",
    "brand": "MetroStyle",
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Summer Collection",
    "material": "Polyester",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=73",
        "altText": "Product 36 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=74",
        "altText": "Product 36 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 12
  },
  {
    "_id": "PROD-037",
    "name": "Product 37 Name",
    "description": "This is the description of product 37. Crafted with high-quality materials for lasting comfort and style.",
    "price": 75.5,
    "discountPrice": 67.95,
    "countInStock": 11,
    "sku": "SKU-00037",
    "category": "Footwear",
    "brand": "Fashion Hub",
    "sizes": [
      "XS",
      "S",
      "M"
    ],
    "colors": [
      "Green",
      "Blue"
    ],
    "collections": "Winter Collection",
    "material": "Leather",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=75",
        "altText": "Product 37 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=76",
        "altText": "Product 37 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 14
  },
  {
    "_id": "PROD-038",
    "name": "Product 38 Name",
    "description": "This is the description of product 38. Crafted with high-quality materials for lasting comfort and style.",
    "price": 77.0,
    "discountPrice": 69.3,
    "countInStock": 14,
    "sku": "SKU-00038",
    "category": "Accessories",
    "brand": "Style Street",
    "sizes": [
      "L",
      "XL"
    ],
    "colors": [
      "Yellow",
      "Pink"
    ],
    "collections": "Sportswear",
    "material": "Denim",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=77",
        "altText": "Product 38 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=78",
        "altText": "Product 38 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 16
  },
  {
    "_id": "PROD-039",
    "name": "Product 39 Name",
    "description": "This is the description of product 39. Crafted with high-quality materials for lasting comfort and style.",
    "price": 78.5,
    "discountPrice": 70.65,
    "countInStock": 17,
    "sku": "SKU-00039",
    "category": "Outerwear",
    "brand": "Elite Apparel",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Formal",
    "material": "Wool",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=79",
        "altText": "Product 39 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=80",
        "altText": "Product 39 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 18
  },
  {
    "_id": "PROD-040",
    "name": "Product 40 Name",
    "description": "This is the description of product 40. Crafted with high-quality materials for lasting comfort and style.",
    "price": 80.0,
    "discountPrice": 72.0,
    "countInStock": 20,
    "sku": "SKU-00040",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=81",
        "altText": "Product 40 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=82",
        "altText": "Product 40 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 20
  },
  {
    "_id": "PROD-041",
    "name": "Product 41 Name",
    "description": "This is the description of product 41. Crafted with high-quality materials for lasting comfort and style.",
    "price": 81.5,
    "discountPrice": 73.35,
    "countInStock": 23,
    "sku": "SKU-00041",
    "category": "Bottom Wear",
    "brand": "MetroStyle",
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Summer Collection",
    "material": "Polyester",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=83",
        "altText": "Product 41 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=84",
        "altText": "Product 41 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 22
  },
  {
    "_id": "PROD-042",
    "name": "Product 42 Name",
    "description": "This is the description of product 42. Crafted with high-quality materials for lasting comfort and style.",
    "price": 83.0,
    "discountPrice": 74.7,
    "countInStock": 26,
    "sku": "SKU-00042",
    "category": "Footwear",
    "brand": "Fashion Hub",
    "sizes": [
      "XS",
      "S",
      "M"
    ],
    "colors": [
      "Green",
      "Blue"
    ],
    "collections": "Winter Collection",
    "material": "Leather",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=85",
        "altText": "Product 42 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=86",
        "altText": "Product 42 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 24
  },
  {
    "_id": "PROD-043",
    "name": "Product 43 Name",
    "description": "This is the description of product 43. Crafted with high-quality materials for lasting comfort and style.",
    "price": 84.5,
    "discountPrice": 76.05,
    "countInStock": 29,
    "sku": "SKU-00043",
    "category": "Accessories",
    "brand": "Style Street",
    "sizes": [
      "L",
      "XL"
    ],
    "colors": [
      "Yellow",
      "Pink"
    ],
    "collections": "Sportswear",
    "material": "Denim",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=87",
        "altText": "Product 43 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=88",
        "altText": "Product 43 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 26
  },
  {
    "_id": "PROD-044",
    "name": "Product 44 Name",
    "description": "This is the description of product 44. Crafted with high-quality materials for lasting comfort and style.",
    "price": 86.0,
    "discountPrice": 77.4,
    "countInStock": 32,
    "sku": "SKU-00044",
    "category": "Outerwear",
    "brand": "Elite Apparel",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Formal",
    "material": "Wool",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=89",
        "altText": "Product 44 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=90",
        "altText": "Product 44 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 28
  },
  {
    "_id": "PROD-045",
    "name": "Product 45 Name",
    "description": "This is the description of product 45. Crafted with high-quality materials for lasting comfort and style.",
    "price": 87.5,
    "discountPrice": 78.75,
    "countInStock": 35,
    "sku": "SKU-00045",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=91",
        "altText": "Product 45 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=92",
        "altText": "Product 45 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 0
  },
  {
    "_id": "PROD-046",
    "name": "Product 46 Name",
    "description": "This is the description of product 46. Crafted with high-quality materials for lasting comfort and style.",
    "price": 89.0,
    "discountPrice": 80.1,
    "countInStock": 38,
    "sku": "SKU-00046",
    "category": "Bottom Wear",
    "brand": "MetroStyle",
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Summer Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=93",
        "altText": "Product 46 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=94",
        "altText": "Product 46 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 2
  },
  {
    "_id": "PROD-047",
    "name": "Product 47 Name",
    "description": "This is the description of product 47. Crafted with high-quality materials for lasting comfort and style.",
    "price": 90.5,
    "discountPrice": 81.45,
    "countInStock": 41,
    "sku": "SKU-00047",
    "category": "Footwear",
    "brand": "Fashion Hub",
    "sizes": [
      "XS",
      "S",
      "M"
    ],
    "colors": [
      "Green",
      "Blue"
    ],
    "collections": "Winter Collection",
    "material": "Leather",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=95",
        "altText": "Product 47 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=96",
        "altText": "Product 47 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 4
  },
  {
    "_id": "PROD-048",
    "name": "Product 48 Name",
    "description": "This is the description of product 48. Crafted with high-quality materials for lasting comfort and style.",
    "price": 92.0,
    "discountPrice": 82.8,
    "countInStock": 44,
    "sku": "SKU-00048",
    "category": "Accessories",
    "brand": "Style Street",
    "sizes": [
      "L",
      "XL"
    ],
    "colors": [
      "Yellow",
      "Pink"
    ],
    "collections": "Sportswear",
    "material": "Denim",
    "gender": "Men",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=97",
        "altText": "Product 48 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=98",
        "altText": "Product 48 image back"
      }
    ],
    "rating": 3.5,
    "numReviews": 6
  },
  {
    "_id": "PROD-049",
    "name": "Product 49 Name",
    "description": "This is the description of product 49. Crafted with high-quality materials for lasting comfort and style.",
    "price": 93.5,
    "discountPrice": 84.15,
    "countInStock": 47,
    "sku": "SKU-00049",
    "category": "Outerwear",
    "brand": "Elite Apparel",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Formal",
    "material": "Wool",
    "gender": "Women",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=99",
        "altText": "Product 49 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=100",
        "altText": "Product 49 image back"
      }
    ],
    "rating": 4.5,
    "numReviews": 8
  },
  {
    "_id": "PROD-050",
    "name": "Product 50 Name",
    "description": "This is the description of product 50. Crafted with high-quality materials for lasting comfort and style.",
    "price": 95.0,
    "discountPrice": 85.5,
    "countInStock": 0,
    "sku": "SKU-00050",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Unisex",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=101",
        "altText": "Product 50 image front"
      },
      {
        "url": "https://picsum.photos/500/500?random=102",
        "altText": "Product 50 image back"
      }
    ],
    "rating": 5.5,
    "numReviews": 10
  }
]
};


export default productsData;