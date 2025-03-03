import { db } from "."

const check = async () => {
  try {
    console.log(
      "yo",
      await db.any(
        `WITH product_data AS (
  SELECT 
    jsonb_array_elements(
      '[
        {
            "id": 154,
            "title": "Black Sun Glasses",
            "price": 29,
            "stock": 100,
            "category": "sunglasses",
            "description": "The Black Sun Glasses are a classic and stylish choice, featuring a sleek black frame and tinted lenses. They provide both UV protection and a fashionable look.",
            "rating": 3.23,
            "image": 
                "https://cdn.dummyjson.com/products/images/sunglasses/Black%20Sun%20Glasses/1.png"
        },
        {
            "id": 155,
            "title": "Classic Sun Glasses",
            "price": 24,
            "stock": 100,
            "category": "sunglasses",
            "description": "The Classic Sun Glasses offer a timeless design with a neutral frame and UV-protected lenses. These sunglasses are versatile and suitable for various occasions.",
            "rating": 2.99,
            "image": 
                "https://cdn.dummyjson.com/products/images/sunglasses/Classic%20Sun%20Glasses/1.png"
        },
        {
            "id": 156,
            "title": "Green and Black Glasses",
            "price": 34,
            "stock": 74,
            "category": "sunglasses",
            "description": "The Green and Black Glasses feature a bold combination of green and black colors, adding a touch of vibrancy to your eyewear collection. They are both stylish and eye-catching.",
            "rating": 2.84,
            "image": 
                "https://cdn.dummyjson.com/products/images/sunglasses/Green%20and%20Black%20Glasses/1.png"
        },
        {
            "id": 157,
            "title": "Party Glasses",
            "price": 19,
            "stock": 35,
            "category": "sunglasses",
            "description": "The Party Glasses are designed to add flair to your party outfit. With unique shapes or colorful frames, they''re perfect for adding a playful touch to your look during celebrations.",
            "rating": 3.21,
            "image": 
                "https://cdn.dummyjson.com/products/images/sunglasses/Party%20Glasses/1.png"
        },
        {
            "id": 158,
            "title": "Sunglasses",
            "price": 22,
            "stock": 59,
            "category": "sunglasses",
            "description": "The Sunglasses offer a classic and simple design with a focus on functionality. These sunglasses provide essential UV protection while maintaining a timeless look.",
            "rating": 2.58,
            "image": 
                "https://cdn.dummyjson.com/products/images/sunglasses/Sunglasses/1.png"
        }
      ]'::jsonb
    ) as product
)
INSERT INTO product(title, price, stock, category, description, rating, image)
SELECT 
  product->>'title',
  (product->>'price')::integer,
  (product->>'stock')::integer,
  product->>'category',
  product->>'description',
  (product->>'rating')::real,
  product->>'image'
FROM product_data;`
      )
    )
  } catch (error) {
    console.log(error)
  }
}

export { check }
