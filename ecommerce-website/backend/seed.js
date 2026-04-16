const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Sample products
const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    price: 199.99,
    discountPrice: 149.99,
    stock: 25,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    tags: ["electronics", "audio", "headphones"]
  },
  {
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health tracking",
    category: "Electronics",
    price: 299.99,
    discountPrice: 249.99,
    stock: 15,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    tags: ["electronics", "wearable", "watch"]
  },
  {
    name: "Premium T-Shirt",
    description: "100% organic cotton comfortable t-shirt",
    category: "Clothing",
    price: 49.99,
    discountPrice: 34.99,
    stock: 50,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    tags: ["clothing", "casual", "comfortable"]
  },
  {
    name: "Denim Jeans",
    description: "Stylish and comfortable denim jeans",
    category: "Clothing",
    price: 89.99,
    discountPrice: 69.99,
    stock: 40,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1542272604-787c62fef53f?w=400",
    tags: ["clothing", "denim", "pants"]
  },
  {
    name: "Web Development Guide",
    description: "Complete guide to modern web development",
    category: "Books",
    price: 39.99,
    discountPrice: 29.99,
    stock: 100,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1532521914357-62181ebb722f?w=400",
    tags: ["books", "programming", "web"]
  },
  {
    name: "Coffee Maker",
    description: "Automated coffee maker with programmable settings",
    category: "Home",
    price: 129.99,
    discountPrice: 99.99,
    stock: 20,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=400",
    tags: ["home", "kitchen", "appliances"]
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat for exercise and meditation",
    category: "Sports",
    price: 44.99,
    discountPrice: 34.99,
    stock: 35,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    tags: ["sports", "fitness", "yoga"]
  },
  {
    name: "Running Shoes",
    description: "Professional running shoes with gel cushioning",
    category: "Sports",
    price: 149.99,
    discountPrice: 119.99,
    stock: 30,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    tags: ["sports", "shoes", "running"]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('✅ Sample products added successfully!');
    console.log(`Total products: ${sampleProducts.length}`);

    // Display added products
    const products = await Product.find();
    console.log('\nAdded Products:');
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - $${p.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
