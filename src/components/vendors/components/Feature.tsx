import Image from 'next/image';

// menu-v-img.png
// orders-v-img.png.png
// payments-v-img.png.png
// scheduled-v-img.png.png
// ratings-v-img.png.png
export const FeatureOne = () => {
  return (
    <div className="min-w-max mx-2 md:mx-6">
      <span className="block relative w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
        <Image
          src="/menu-v-img.png"
          alt="Nana Food Delivery Vendors App"
          fill={true}
          priority={true}
        />
      </span>
    </div>
  );
};

export const FeatureTwo = () => {
  return (
    <div className="min-w-max mx-2 md:mx-6">
      <span className="block relative w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
        <Image
          src="/menu-v-img.png"
          alt="Nana Food Delivery Vendors App"
          fill={true}
          priority={true}
        />
      </span>
    </div>
  );
};
export const FeatureThree = () => {
  return (
    <div className="min-w-max mx-2 md:mx-6">
      <span className="block relative w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
        <Image
          src="/menu-v-img.png"
          alt="Nana Food Delivery Vendors App"
          fill={true}
          priority={true}
          sizes="100vw"
        />
      </span>
    </div>
  );
};
export const FeatureFour = () => {
  return (
    <div className="min-w-max mx-2 md:mx-6">
      <span className="block relative w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
        <Image
          src="/menu-v-img.png"
          alt="Nana Food Delivery Vendors App"
          fill={true}
          priority={true}
        />
      </span>
    </div>
  );
};
