import {PageWrapper} from "@/components/Pagewrapper";

const  CompanyPage  = () => {
    return (
        <PageWrapper defaultTitle="About Nana" location="/company" page={{
            seo: {
                title: "About Nana",
                description: "Who we are and what we do"
            }
        }}>
            <div className="flex flex-col flex-1">
                <section className="p-10 mt-[6rem] rounded-[20px] bg-nana-stone h-[30rem]">
                    <div>
                        <h1 className="text-white md:text-[30px] lg:text-[50px]">About US</h1>
                        <p className=" w-full md:w-1/2 text-white text-lg">
                            Nana is the leading food delivery platform revolutionizing how consumers in underrepresented cities experience dining. With a seamless mobile app, we connect users to their favorite local restaurants, bringing convenience and delicious meals straight to their doorstep. As a child company of <span className="font-bold text-xl">Imagyne Ventures</span>, we benefit from the support and expertise of a seasoned high tech infrastructure, propelling us to new heights in the food delivery industry.
                        </p>
                    </div>
                </section>
                <section className="p-10 mt-[6rem] rounded-[20px] bg-nana-lime h-[30rem]">
                    <div>
                        <h1 className="text-white md:text-[30px] lg:text-[50px]">Our Mission</h1>
                        <p className=" w-full md:w-1/2 text-white text-lg">
                            At Nana, our mission is simple yet impactful: to empower communities in underrepresented cities by providing easy access to diverse culinary experiences. Through innovation and technology, we strive to bridge the gap between local restaurants and customers, fostering economic growth and culinary appreciation in every neighborhood we serve. Together, we're redefining the way people eat, one delivery at a time.
                        </p>
                    </div>
                </section>
            </div>
        </PageWrapper>
    )
}


export default CompanyPage
