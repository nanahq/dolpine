import React from 'react';
import Image from 'next/image';
import TestImage from '@/assets/test-card-image.jpg';
import ThreeDImage from '@/assets/1.png';
import LogoWhite from '@/assets/logo-white.png';
import LogoBlue from '@/assets/logo-blue.png';
import TestBg from '@/assets/About-page.jpg';
import { OrderPreviewCard } from '../components/marketplace/OrderPreviewCard';
import { CategoriesCard } from '../components/marketplace/CategoriesCard';
import FoodCard from '../components/marketplace/FoodCard';

const Marketplace = () => {
  return (
    <main className="p-4 md:p-8 mx-auto max-w-[90rem] mt-24">
      <h2 className="text-2xl font-bold py-4">Restaurants Near Me</h2>
      <div>
        <h3 className="text-xl font-bold py-4">Categories</h3>
        <div className="flex flex-1 gap-2 snap-x overflow-x-scroll no-scrollbar p-4">
          <CategoriesCard
            title="Shawarma"
            description="1200 Places"
            imageUrl={TestImage}
          />
          <CategoriesCard
            title="Burger"
            description="20 Places"
            imageUrl={TestBg}
          />
          <CategoriesCard
            title="Pizza"
            description="29 Places"
            imageUrl={TestBg}
          />
          <CategoriesCard
            title="Suya"
            description="370 Places"
            imageUrl={TestBg}
          />
          <CategoriesCard
            title="Jollof Rice"
            description="321 Places"
            imageUrl={TestImage}
          />
          <CategoriesCard
            title="Masa"
            description="108 Places"
            imageUrl={TestBg}
          />
          <CategoriesCard
            title="Laptops"
            description="326 Places"
            imageUrl={TestBg}
          />
          <CategoriesCard
            title="Gurasa"
            description="1308 Places"
            imageUrl={TestBg}
          />
        </div>
      </div>
      <div className="py-4 md:py-6">
        <h2 className="font-bold text-3xl py-4 mb-4">All Restaurants</h2>
        <div className="max-w-[90rem]  mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <FoodCard
            chefName="Chef Uswat"
            deliveryTime="25-30"
            description="A nice selection of bread filled with your favourite fillings!"
            imageUrl={TestBg}
            rating={9.2}
          />
          <FoodCard
            chefName="Chef Usee"
            deliveryTime="25-30"
            description="a nice selection of bread filled with your favourite fillings!"
            imageUrl={TestBg}
            rating={9.2}
          />
          <FoodCard
            chefName="Chef Uswat"
            deliveryTime="25-30"
            description="a nice selection of bread filled with your favourite fillings!"
            imageUrl={TestBg}
            rating={9.2}
          />
          <FoodCard
            chefName="Chef Uswat"
            deliveryTime="25-30"
            description="a nice selection of bread filled with your favourite fillings!"
            imageUrl={TestBg}
            rating={9.2}
          />
          <FoodCard
            chefName="Chef Uswat"
            deliveryTime="25-30"
            description="a nice selection of bread filled with your favourite fillings!"
            imageUrl={TestBg}
            rating={9.2}
          />
          <FoodCard
            chefName="Chef Uswat"
            deliveryTime="25-30"
            description="a nice selection of bread filled with your favourite fillings!"
            imageUrl={TestBg}
            rating={9.2}
          />
        </div>
      </div>
      <div className="py-4 md:p-6 md:flex md:flex-col md:items-center">
        <h2 className="font-bold text-3xl py-4 mb-4">All Menu</h2>
        <div className=" max-w-[90rem]  mx-auto grid md:grid-cols-2 lg:grid-cols-3 grid-cols-[repeat(3, minmax(0px, 1fr))] gap-4">
          {' '}
          <OrderPreviewCard
            title="Bacon &amp; Jalapeño Coins"
            description=" Bursting with savory cheese, beef, pickled cucumbers, and onions, all wrapped in a crispy coating. A nice selection of bread filled with your favourite fillings! ipsum dolor sitamet."
            price="N400"
            imageUrl={TestBg}
          />
          <OrderPreviewCard
            title="Bacon &amp; Jalapeño Coins"
            description=" Bursting with savory cheese, beef, pickled cucumbers, and onions, all wrapped in a crispy coating. Lorem ipsum dolor sitamet."
            price="N400"
            imageUrl={TestBg}
          />
          <OrderPreviewCard
            title="Bacon &amp; Jalapeño Coins"
            description=" Bursting with savory cheese, beef, pickled cucumbers, and onions, all wrapped in a crispy coating. Lorem ipsum dolor sitamet."
            price="N400"
            imageUrl={TestBg}
          />
          <OrderPreviewCard
            title="Bacon &amp; Jalapeño Coins"
            description=" Bursting with savory cheese, beef, pickled cucumbers, and onions, all wrapped in a crispy coating. Lorem ipsum dolor sitamet."
            price="N400"
            imageUrl={TestBg}
          />
          <OrderPreviewCard
            title="Bacon &amp; Jalapeño Coins"
            description=" Bursting with savory cheese, beef, pickled cucumbers, and onions, all wrapped in a crispy coating. Lorem ipsum dolor sitamet."
            price="N400"
            imageUrl={TestBg}
          />
          <OrderPreviewCard
            title="Bacon &amp; Jalapeño Coins"
            description=" Bursting with savory cheese, beef, pickled cucumbers, and onions, all wrapped in a crispy coating. Lorem ipsum dolor sitamet."
            price="N400"
            imageUrl={TestBg}
          />
          <OrderPreviewCard
            title="Bacon &amp; Jalapeño Coins"
            description=" Bursting with savory cheese, beef, pickled cucumbers, and onions, all wrapped in a crispy coating. Lorem ipsum dolor sitamet."
            price="N400"
            imageUrl={TestBg}
          />
          <OrderPreviewCard
            title="Bacon &amp; Jalapeño Coins"
            description=" Bursting with savory cheese, beef, pickled cucumbers, and onions, all wrapped in a crispy coating. Lorem ipsum dolor sitamet."
            price="N400"
            imageUrl={TestBg}
          />
        </div>
      </div>
    </main>
  );
};

export default Marketplace;
