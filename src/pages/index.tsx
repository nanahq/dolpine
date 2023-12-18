import { PageWrapper } from '@/components/Pagewrapper';
import {HomePageHero} from "@/components/Home/Hero";
import {GetStarted} from "@/components/Home/GetStarted";
import {SimpleSteps} from "@/components/Home/SimpleSteps";
import {FaqComponent} from "@/components/Home/Faq";

export default function Home() {
  return (
    <PageWrapper>
      <HomePageHero />
        <GetStarted />
        <SimpleSteps />
      <FaqComponent />
    </PageWrapper>
  );
}
