"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Spines from "./Spines";

const slides = [
  {
    title: "Add a book, borrow a book, return a book",
    text: "BookNook is a small library run by its readers. Share what is on your shelf and find your next read in a few taps.",
    bg: "bg-primary",
    spines: ["#e3a82b", "#1e7f74", "#d9694f", "#9db8f5", "#f1ead6"],
  },
  {
    title: "Borrow for a few days, return when you are done",
    text: "Pick any available book, choose a return date and it is yours. Every copy you return goes straight back on the shelf.",
    bg: "bg-accent",
    spines: ["#f1ead6", "#1f2a44", "#e3a82b", "#0f4c45", "#d9694f"],
  },
  {
    title: "Your unread books deserve a second reader",
    text: "List a book with its cover, a short description and the number of copies you can share. Others can borrow it right away.",
    bg: "bg-neutral",
    spines: ["#e3a82b", "#6f9cf0", "#1e7f74", "#f1ead6", "#c23b3b"],
  },
];

export default function Banner() {
  return (
    <section aria-label="Featured">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        style={{ "--swiper-pagination-color": "#e3a82b", "--swiper-pagination-bullet-inactive-color": "#ffffff" }}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div className={`${s.bg} text-primary-content`}>
              <div className="mx-auto grid min-h-[480px] max-w-7xl items-center gap-10 px-4 py-16 md:min-h-[540px] md:grid-cols-2">
                <div className="max-w-xl">
                  <h1 className="text-4xl font-bold leading-tight md:text-5xl">{s.title}</h1>
                  <p className="mt-5 text-lg opacity-85">{s.text}</p>
                  <Link href="/books" className="btn btn-secondary btn-lg mt-8">
                    Browse Books
                  </Link>
                </div>
                <Spines colors={s.spines} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
