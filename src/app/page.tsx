"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import VantaFog from "@/components/VantaFog";
import { AuroraText } from "@/components/magicui/aurora-text";
import Link from "next/link";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import travelIllustration from "../../public/images/ivana-cajina-TUXUCVXmjQk-unsplash.jpg";
import { CardContent, CardHeader } from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";
import profile from '../../public/images/profile.jpg'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
    {
        name: "Rahul Sharma",
        username: "@rahul_explorer",
        body: "The Personal Guide Agent helped me plan a 7-day Japan trip in minutes — complete with hidden spots only locals know about."
    },
    {
        name: "Aisha Khan",
        username: "@aisha_travels",
        body: "It created a day-by-day itinerary based on my food preferences and budget. I’ve never had such a tailored travel plan!"
    },
    {
        name: "Manav Verma",
        username: "@manav_nomad",
        body: "Instead of juggling multiple websites, I had my sightseeing, dining, and transportation details all in one place."
    },
    {
        name: "Sana Iqbal",
        username: "@sana_wanderlust",
        body: "The cultural tips and language suggestions made me feel prepared and confident before stepping foot in a new country."
    },
    {
        name: "David Lee",
        username: "@david_globetrotter",
        body: "Even last-minute plan changes were handled smoothly — it reworked my schedule in seconds."
    },
    {
        name: "Priya Mehta",
        username: "@priya_adventurer",
        body: "I usually spend days researching, but this felt like having a local friend guiding me every step of the way."
    }
];



const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    name,
    username,
    body,
}: {
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Image
                    className="rounded-full"
                    width="32"
                    height="32"
                    alt=""
                    src={profile}
                />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">
                        {username}
                    </p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

const steps = [
    {
        title: "Step 1: Share Your Travel Preferences",
        description:
            "Tell the AI about your destination, travel dates, budget, interests, and travel style so it can tailor a personalized itinerary."
    },
    {
        title: "Step 2: Discover Best Places to Visit",
        description:
            "The AI curates must-see attractions, hidden gems, and unique experiences based on your preferences."
    },
    {
        title: "Step 3: Plan Daily Itinerary",
        description:
            "Get a detailed, day-by-day travel plan optimized for time, distance, and your chosen activities."
    },
    {
        title: "Step 4: Find Best Stays & Dining",
        description:
            "Receive handpicked recommendations for hotels, homestays, and restaurants matching your taste and budget."
    },
    {
        title: "Step 5: Get Travel Tips & Safety Info",
        description:
            "Access real-time weather updates, safety advisories, and local cultural tips to make your trip smoother."
    },
    {
        title: "Step 6: Navigate & Adjust On the Go",
        description:
            "Use live maps, transport suggestions, and instant re-planning if your schedule changes during travel."
    }
];



export default function Home() {
    const { theme } = useTheme();
    return (
        <main className="mx-auto">
            <VantaFog />
        <section className="mt-20 px-4 md:px-36 flex flex-col justify-center items-center text-center">
    <div className="group mb-5 relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
        <span
            className={cn(
                "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
            )}
            style={{
                WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "subtract",
                WebkitClipPath: "padding-box",
            }}
        />
        🤖
        <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
        <AnimatedGradientText className="text-sm font-medium">
            Your AI-Powered Personalized Guide & Decision Assistant
        </AnimatedGradientText>
        <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </div>

    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-primary mb-6">
        Navigate Life & Work <AuroraText>Smarter</AuroraText>{" "}
with a Personalized AI Guide

    </h1>

    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        Get real-time, tailored advice and step-by-step guidance for your unique goals — 
        whether it&apos;s career growth, learning a skill, planning a trip, or making big decisions. 
        Your AI agent learns from your preferences to deliver actionable, accurate, and relevant recommendations.
    </p>

    <div>
        <Link href="/search">
            <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Start My Personalized Journey
                </span>
            </ShimmerButton>
        </Link>
    </div>
</section>



            <section className="pt-20 lg:pt-32 pb-10 px-4 md:px-36 mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    How It Works
                    {/* <AuroraText>How It Works</AuroraText> */}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {steps.map((step, index) => (
                        <MagicCard
                            key={index}
                            gradientColor={
                                theme === "dark" ? "#262626" : "#D9D9D955"
                            }
                            className="rounded-xl px-5 py-4 bg-background shadow-md border border-border min-h-[180px] h-full"
                        >
                            <CardHeader className="p-0">
                                <h3 className="text-lg font-semibold text-primary">
                                    {step.title}
                                </h3>
                            </CardHeader>
                            <CardContent className="p-0 mt-2">
                                <p className="text-muted-foreground text-sm leading-snug">
                                    {step.description}
                                </p>
                            </CardContent>
                        </MagicCard>
                    ))}
                </div>
            </section>

         <section className="flex mt-10 flex-col md:flex-row items-center justify-between px-4 md:px-36 py-12">
  {/* Text Section */}
  <div className="md:w-1/2 text-center md:text-left space-y-4 order-2 md:order-1">
    <h2 className="text-3xl md:text-5xl font-bold text-primary">
      Plan Your Perfect Trip — Powered by AI.
    </h2>
    <p className="text-lg text-muted-foreground">
      Travel Guide Agent helps you discover top destinations, create personalized itineraries, and get real-time tips — so you can travel smarter, save time, and make unforgettable memories.
    </p>
    <Link href="/search">
      <ShimmerButton className="shadow-2xl">
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Plan My Trip
        </span>
      </ShimmerButton>
    </Link>
  </div>

  {/* Image Section */}
  <div className="md:w-1/2 mt-10 md:mt-0 order-1 md:order-2 flex justify-center">
    <Image
      src={travelIllustration} // Replace with your travel illustration
      alt="AI-Powered Travel Planning"
      className="w-full max-w-md h-96 object-contain"
      width={10}
      height={10}
      unoptimized
    />
  </div>
</section>



            <section className="mx-4 mt-20 md:mx-36">
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {firstRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:20s]">
                        {secondRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                </div>
            </section>

           <section className="px-4 md:px-36 mt-20">
  <Accordion
    type="single"
    collapsible
    className="w-full"
    defaultValue="item-1"
  >
    <h1 className="text-4xl font-bold">FAQ&apos;S</h1>

    <AccordionItem value="item-1">
      <AccordionTrigger>
        1. What is Travel Guide Agent?
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <p>
          Travel Guide Agent is an AI-powered platform that creates personalized travel itineraries, recommends top attractions, and offers real-time tips for any city you want to explore.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>
        2. How does it work?
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <p>
          Just enter your destination city, and Travel Guide Agent will instantly generate a customized guide with must-visit places, dining recommendations, hidden gems, and travel tips — all based on your preferences.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>
        3. Can I chat with the AI for recommendations?
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <p>
          Yes! You can chat with your AI travel assistant to get instant answers, alternative suggestions, and insider tips while planning or even during your trip.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-4">
      <AccordionTrigger>
        4. Does it work offline?
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <p>
          While the AI guide requires internet to generate your trip plan, you can save the itinerary and access it offline during your travels.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-5">
      <AccordionTrigger>
        5. Can I save my favorite spots?
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <p>
          Absolutely. You can save places to your favorites list and revisit them later, making it easy to plan multiple trips or keep track of must-see spots.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-6">
      <AccordionTrigger>
        6. Does it cover restaurants and food spots?
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <p>
          Yes! The AI suggests top-rated restaurants, cafés, street food vendors, and local specialties based on your taste and budget.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-7">
      <AccordionTrigger>
        7. Can I use it for any country?
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <p>
          Yes. Travel Guide Agent works globally — whether you&apos;re planning a weekend getaway nearby or an international vacation.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-8">
      <AccordionTrigger>
        8. Is it free to use?
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <p>
          Core features like itinerary generation and basic recommendations are free. Premium features — like advanced filters, exclusive travel tips, and priority updates — may require a paid subscription.
        </p>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-9">
      <AccordionTrigger>
        9. Can it suggest seasonal activities?
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <p>
          Yes! Travel Guide Agent takes into account the season and local events, so you get recommendations for the best time-specific activities and festivals.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</section>


        </main>
    );
}
