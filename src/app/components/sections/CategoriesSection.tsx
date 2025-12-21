'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, UtensilsCrossed, ShoppingBag, Package as PackageIcon, Coffee } from 'lucide-react';

const categories = [
  {
    id: 'food',
    name: 'Food & Restaurants',
    description: 'Order from your favorite restaurants and local chefs',
    icon: UtensilsCrossed,
    color: 'bg-[#FF7043]',
    image: '/menu-v-img.png',
    comingSoon: false,
  },
  {
    id: 'groceries',
    name: 'Groceries',
    description: 'Fresh produce, pantry essentials, and daily needs',
    icon: ShoppingBag,
    color: 'bg-[#F4C430]',
    image: '/orders-v-img.png',
    comingSoon: false,
  },
  {
    id: 'parcel',
    name: 'Parcel Delivery',
    description: 'Send and receive packages quickly and safely',
    icon: PackageIcon,
    color: 'bg-[#24A148]',
    image: '/payments-v-img.png',
    comingSoon: false,
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Coffee, drinks, and refreshments delivered fresh',
    icon: Coffee,
    color: 'bg-[#0077B6]',
    image: '/scheduled-v-img.png',
    comingSoon: true,
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background-secondary to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block bg-nana-blue/10 text-nana-blue px-4 py-2 rounded-md mb-4 text-sm font-semibold">
            Categories
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Shop by Category
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Everything you need, delivered to your doorstep
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={category.comingSoon ? '#' : `/${category.id}`}
                className="group relative bg-white rounded-md overflow-hidden border border-border-light hover:border-nana-blue/50 transition-all hover:shadow-lg"
              >
                {/* Image with Overlay */}
                <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {category.comingSoon && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                      <span className="bg-white text-text-primary px-4 py-2 rounded-md font-semibold text-sm">
                        Coming Soon
                      </span>
                    </div>
                  )}
                  {/* Category Icon Overlay */}
                  <div className={`absolute bottom-4 left-4 ${category.color} w-14 h-14 rounded-md flex items-center justify-center shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-nana-blue transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  {!category.comingSoon && (
                    <div className="flex items-center text-nana-blue font-semibold text-sm">
                      Explore
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

