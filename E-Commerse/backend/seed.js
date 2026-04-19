const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@shopsphere.com',
      password: 'admin123',
      role: 'admin',
    });

    // Create test customer
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'customer123',
      role: 'customer',
    });

    // Sample products
    const products = [
      {
        name: 'Premium Wireless Headphones',
        description: 'Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 40-hour battery life, and ultra-comfortable ear cushions. Perfect for music lovers and professionals.',
        price: 2999,
        originalPrice: 4999,
        category: 'Electronics',
        brand: 'SoundMax',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
        stock: 50,
        rating: 4.5,
        numReviews: 128,
        featured: true,
        seller: 'ShopSphere',
      },
      {
        name: 'Smart Watch Pro X',
        description: 'Stay connected with the Smart Watch Pro X. Track your fitness, receive notifications, and monitor your health with SpO2 and heart rate sensors. Water resistant up to 50m.',
        price: 4999,
        originalPrice: 7999,
        category: 'Electronics',
        brand: 'TechFit',
        images: ['https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=500'],
        stock: 30,
        rating: 4.3,
        numReviews: 89,
        featured: true,
        seller: 'ShopSphere',
      },
      {
        name: 'Ultra Slim Laptop 15"',
        description: 'Powerful and portable. 11th Gen Intel i7 processor, 16GB RAM, 512GB SSD, stunning 15.6" 4K display. Perfect for work and play.',
        price: 54999,
        originalPrice: 69999,
        category: 'Electronics',
        brand: 'TechPro',
        images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'],
        stock: 15,
        rating: 4.7,
        numReviews: 234,
        featured: true,
        seller: 'ShopSphere',
      },
      {
        name: 'Classic Denim Jacket',
        description: 'Timeless style meets modern comfort. Made from premium denim with a relaxed fit. Features brass buttons and multiple pockets. Available in all sizes.',
        price: 1899,
        originalPrice: 2999,
        category: 'Fashion',
        brand: 'UrbanStyle',
        images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500'],
        stock: 100,
        rating: 4.2,
        numReviews: 67,
        featured: false,
        seller: 'ShopSphere',
      },
      {
        name: 'Running Shoes - Air Max',
        description: 'Lightweight running shoes with air cushion technology. Breathable mesh upper, responsive cushioning, and durable rubber outsole. Ideal for daily runs.',
        price: 3499,
        originalPrice: 5499,
        category: 'Sports',
        brand: 'SprintMax',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
        stock: 75,
        rating: 4.6,
        numReviews: 156,
        featured: true,
        seller: 'ShopSphere',
      },
      {
        name: 'Organic Green Tea Set',
        description: '100% organic green tea collection. Includes 5 premium varieties: Matcha, Sencha, Jasmine, Mint, and Classic Green. 50 individually wrapped sachets.',
        price: 699,
        originalPrice: 999,
        category: 'Grocery',
        brand: 'TeaHaven',
        images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500'],
        stock: 200,
        rating: 4.4,
        numReviews: 312,
        featured: false,
        seller: 'ShopSphere',
      },
      {
        name: 'Bestseller Novel Collection',
        description: 'A curated collection of 5 bestselling novels from award-winning authors. Includes hardcover editions with beautiful dust jackets. Perfect gift for book lovers.',
        price: 1299,
        originalPrice: 1999,
        category: 'Books',
        brand: 'PageTurner',
        images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'],
        stock: 45,
        rating: 4.8,
        numReviews: 89,
        featured: false,
        seller: 'ShopSphere',
      },
      {
        name: 'Professional Camera DSLR',
        description: '24.2MP DSLR camera with 18-55mm kit lens. Full HD video recording, 3" LCD screen, Wi-Fi connectivity. Perfect for photography enthusiasts and professionals.',
        price: 32999,
        originalPrice: 44999,
        category: 'Electronics',
        brand: 'SnapPro',
        images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500'],
        stock: 20,
        rating: 4.5,
        numReviews: 178,
        featured: true,
        seller: 'ShopSphere',
      },
      {
        name: 'Luxury Skincare Gift Set',
        description: 'Premium skincare set with cleanser, toner, serum, moisturizer, and eye cream. Enriched with natural ingredients. Suitable for all skin types.',
        price: 2499,
        originalPrice: 3999,
        category: 'Beauty',
        brand: 'GlowUp',
        images: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500'],
        stock: 60,
        rating: 4.3,
        numReviews: 94,
        featured: false,
        seller: 'ShopSphere',
      },
      {
        name: 'Smart Home Speaker',
        description: 'Voice-controlled smart speaker with premium sound quality. Control your smart home, play music, set reminders, and more. Compatible with all major platforms.',
        price: 3999,
        originalPrice: 5999,
        category: 'Electronics',
        brand: 'SoundMax',
        images: ['https://images.unsplash.com/photo-1543512214-318c7553f230?w=500'],
        stock: 40,
        rating: 4.1,
        numReviews: 203,
        featured: false,
        seller: 'ShopSphere',
      },
      {
        name: 'Yoga Mat Premium',
        description: 'Extra thick 6mm yoga mat with non-slip surface. Made from eco-friendly TPE material. Includes carrying strap. Available in multiple colors.',
        price: 999,
        originalPrice: 1499,
        category: 'Sports',
        brand: 'FlexFit',
        images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'],
        stock: 120,
        rating: 4.4,
        numReviews: 67,
        featured: false,
        seller: 'ShopSphere',
      },
      {
        name: 'Kids Building Blocks Set',
        description: '500+ piece colorful building blocks set. Develops creativity and motor skills. Compatible with major brands. Suitable for ages 4+.',
        price: 1499,
        originalPrice: 2199,
        category: 'Toys',
        brand: 'BlockMaster',
        images: ['https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=500'],
        stock: 80,
        rating: 4.6,
        numReviews: 145,
        featured: false,
        seller: 'ShopSphere',
      },
      {
        name: 'Stainless Steel Cookware Set',
        description: '10-piece premium stainless steel cookware set. Includes pots, pans, and lids. Induction compatible. Dishwasher safe. Lifetime warranty.',
        price: 4999,
        originalPrice: 7999,
        category: 'Home & Kitchen',
        brand: 'ChefElite',
        images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'],
        stock: 25,
        rating: 4.7,
        numReviews: 89,
        featured: true,
        seller: 'ShopSphere',
      },
      {
        name: 'Men Casual Sneakers',
        description: 'Comfortable everyday sneakers with memory foam insole. Lightweight and breathable. Modern design suitable for casual and semi-formal occasions.',
        price: 1799,
        originalPrice: 2499,
        category: 'Fashion',
        brand: 'UrbanStep',
        images: ['https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'],
        stock: 90,
        rating: 4.2,
        numReviews: 112,
        featured: false,
        seller: 'ShopSphere',
      },
      {
        name: 'Wireless Gaming Mouse',
        description: 'High-precision wireless gaming mouse with 16000 DPI sensor, RGB lighting, and programmable buttons. Ultra-low latency. 70-hour battery life.',
        price: 1999,
        originalPrice: 3499,
        category: 'Electronics',
        brand: 'GamePro',
        images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'],
        stock: 55,
        rating: 4.5,
        numReviews: 198,
        featured: false,
        seller: 'ShopSphere',
      },
      {
        name: 'Aromatherapy Essential Oils Set',
        description: 'Set of 12 pure essential oils. Includes lavender, eucalyptus, tea tree, peppermint, and more. Perfect for diffusers and massage. 100% natural.',
        price: 899,
        originalPrice: 1299,
        category: 'Beauty',
        brand: 'AromaBliss',
        images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'],
        stock: 70,
        rating: 4.3,
        numReviews: 76,
        featured: false,
        seller: 'ShopSphere',
      },
    ];

    await Product.insertMany(products);

    console.log('✅ Seed data inserted successfully!');
    console.log(`   - 2 users created (admin@shopsphere.com / admin123)`);
    console.log(`   - ${products.length} products created`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
