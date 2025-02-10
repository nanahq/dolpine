import React from 'react';
import FoodCard from '../components/marketplace/FoodCard';
import {getMarketPlace} from "@/lib/marketplace";

const Marketplace = async () => {
  const data = await getMarketPlace()

  return (
    <main className="p-4 md:p-6 mx-auto max-w-[100rem] mt-24">
      <h2 className="text-[1.375rem] md:text-[1.5rem] lg:text-[1.75rem] py-4 mb-4 ">
        Restaurants Near Me
      </h2>
      {/*<div>*/}
      {/*  <h3 className="text-xl font-bold py-4">Homemade vendors</h3>*/}
      {/*  <div className="flex flex-1 gap-2 md:gap-6 snap-x overflow-x-scroll no-scrollbar p-4">*/}
      {/*    {data.homeMadeChefs.map(vendor => (*/}
      {/*        <FoodCard*/}
      {/*            friendlyUrl={vendor.businessName.split(' ').join('-').toLowerCase()}*/}
      {/*            key={vendor._id}*/}
      {/*            chefName={vendor.businessName}*/}
      {/*            deliveryTime="25-30"*/}
      {/*            description="A nice selection of bread filled with your favourite fillings!"*/}
      {/*            imageUrl={vendor.businessImage}*/}
      {/*            rating={vendor.ratings.totalReviews}*/}
      {/*        />*/}
      {/*    ))}*/}
      {/*    {data.homeMadeChefs.map(vendor => (*/}
      {/*        <FoodCard*/}
      {/*            friendlyUrl={vendor.businessName.split(' ').join('-').toLowerCase()}*/}
      {/*            key={vendor._id}*/}
      {/*            chefName={vendor.businessName}*/}
      {/*            deliveryTime="25-30"*/}
      {/*            description="A nice selection of bread filled with your favourite fillings!"*/}
      {/*            imageUrl={vendor.businessImage}*/}
      {/*            rating={vendor.ratings.totalReviews}*/}
      {/*        />*/}
      {/*    ))}*/}
      {/*    {data.homeMadeChefs.map(vendor => (*/}
      {/*        <FoodCard*/}
      {/*            friendlyUrl={vendor.businessName.split(' ').join('-').toLowerCase()}*/}
      {/*            key={vendor._id}*/}
      {/*            chefName={vendor.businessName}*/}
      {/*            deliveryTime="25-30"*/}
      {/*            description="A nice selection of bread filled with your favourite fillings!"*/}
      {/*            imageUrl={vendor.businessImage}*/}
      {/*            rating={vendor.ratings.totalReviews}*/}
      {/*        />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="py-4 md:py-6">
        <h2 className="text-[1.375rem] md:text-[1.5rem] font-bold lg:text-[1.75rem] py-4 mb-4">
          All Restaurants
        </h2>
        <div className="max-w-[90rem] mx-auto grid md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-[repeat(3, minmax(0px, 1fr))] gap-4">
          {data.allVendors.map(vendor => (
              <FoodCard
                  friendlyUrl={vendor.businessName.split(' ').join('-').toLowerCase()}
                  key={vendor._id}
                  chefName={vendor.businessName}
                  deliveryTime="25-30"
                  imageUrl={vendor.businessImage}
                  rating={vendor.ratings.totalReviews}
              />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Marketplace;
