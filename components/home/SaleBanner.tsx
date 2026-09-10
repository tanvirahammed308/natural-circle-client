"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiZap } from "react-icons/fi";
import image from "./../../public/images/salebanner.png";

const SaleBanner = () => {
  return (
    <section className="w-full  px-3 py-5 sm:px-5 sm:py-6 lg:px-8">
      <div
        className="
          group relative mx-auto flex
          min-h-[520px]
          w-full
          max-w-[1720px]
          flex-col
          overflow-hidden
          rounded-[24px]
          bg-gradient-to-br
          from-[#0e4b53]
          via-[#145f67]
          to-[#0b424a]
          shadow-xl
          sm:min-h-[560px]
          sm:rounded-[28px]
          lg:min-h-[300px]
          lg:flex-row
        "
      >
        {/* Decorative Background Circle */}
        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-24
            h-72
            w-72
            rounded-full
            bg-white/5
            blur-sm
            sm:h-96
            sm:w-96
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-28
            -left-20
            h-72
            w-72
            rounded-full
            bg-yellow-300/5
            blur-sm
          "
        />

        {/* ================= IMAGE SECTION ================= */}
        <div
          className="
            relative
            h-[250px]
            w-full
            overflow-hidden
            sm:h-[280px]
            lg:h-auto
            lg:w-[45%]
          "
        >
          <Image
            src={image}
            alt="Fresh vegetables"
            fill
            priority
            sizes="
              (max-width: 639px) 100vw,
              (max-width: 1023px) 100vw,
              45vw
            "
            className="
              relative
              z-10
              object-cover
              object-left-bottom
            "
          />

          {/* Mobile curved divider */}
          <div
            className="
              absolute
              bottom-[-1px]
              left-[-5%]
              z-20
              h-12
              w-[110%]
              rounded-[50%_50%_0_0]
              bg-[#145f67]
              lg:hidden
            "
          />

          {/* Desktop curved divider */}
          <div
            className="
              absolute
              right-[-1px]
              top-[-5%]
              z-20
              hidden
              h-[110%]
              w-12
              rounded-[50%_0_0_50%]
              bg-[#145f67]
              lg:block
            "
          />

          {/* Discount Badge */}
          <div
            className="
              absolute
              bottom-[-5px]
              left-1/2
              z-30
              flex
              h-[105px]
              w-[105px]
              -translate-x-1/2
              flex-col
              items-center
              justify-center
              rounded-full
              border-4
              border-white/80
              bg-gradient-to-br
              from-yellow-300
              via-yellow-400
              to-orange-400
              text-center
              shadow-2xl
              sm:h-[115px]
              sm:w-[115px]
              lg:bottom-auto
              lg:left-[37%]
              lg:top-1/2
              lg:h-[130px]
              lg:w-[130px]
              lg:-translate-y-1/2
            "
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#145f67] sm:text-xs">
              Special
            </span>

            <span className="text-3xl font-black leading-none text-[#0e4b53] sm:text-4xl">
              20%
            </span>

            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#145f67] sm:text-xs">
              Discount
            </span>
          </div>
        </div>

        {/* ================= CONTENT SECTION ================= */}
        <div
          className="
            relative
            z-10
            flex
            w-full
            flex-1
            flex-col
            justify-center
            px-5
            pb-8
            pt-2
            sm:px-8
            sm:pb-10
            lg:w-[55%]
            lg:px-12
            lg:py-8
            xl:px-16
          "
        >
          {/* Small Label */}
          <div
            className="
              mb-3
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              bg-white/10
              px-3
              py-1.5
              text-xs
              font-semibold
              text-yellow-300
              backdrop-blur-sm
              sm:mb-4
              sm:px-4
              sm:py-2
            "
          >
            <FiZap className="text-sm" />
            <span>Fresh & Healthy</span>
          </div>

          {/* Heading */}
          <h2
            className="
              max-w-xl
              text-3xl
              font-black
              leading-[1.05]
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-4xl
              xl:text-5xl
            "
          >
            Super Sale
            <span className="block text-yellow-300">
              Vegetables
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mt-3
              max-w-lg
              text-sm
              leading-6
              text-white/75
              sm:mt-4
              sm:text-base
              sm:leading-7
            "
          >
            Get fresh and healthy vegetables at amazing prices.
            Limited time offer — grab your favorites before the
            sale ends!
          </p>

          {/* CTA */}
          <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-6">
            <Link
              href="/products"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-yellow-300
                px-5
                py-3
                text-sm
                font-bold
                text-[#0e4b53]
                shadow-lg
                shadow-black/10
                transition-colors
                duration-300
                hover:bg-yellow-400
                sm:px-6
                sm:py-3.5
              "
            >
              Shop Now
              <FiArrowRight className="text-lg" />
            </Link>

            <span className="text-xs font-medium text-white/60 sm:text-sm">
              Limited time offer
            </span>
          </div>

          {/* Bottom Highlight */}
          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-2
              border-t
              border-white/10
              pt-4
              text-xs
              text-white/60
              sm:mt-7
              sm:pt-5
            "
          >
            <span>✓ Fresh products</span>
            <span>✓ Great prices</span>
            <span>✓ Quality guaranteed</span>
          </div>
        </div>

        {/* Bottom Glow */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/2
            h-1
            w-2/3
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-yellow-300/70
            to-transparent
            blur-sm
          "
        />
      </div>
    </section>
  );
};

export default SaleBanner;