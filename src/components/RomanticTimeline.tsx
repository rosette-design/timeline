"use client";

import { Collection, Moment, User } from "@/lib/supabase";
import {
  HiMapPin,
  HiClock,
  HiCheckCircle,
  HiHeart,
  HiSparkles,
  HiArrowUp,
} from "react-icons/hi2";
import MediaDisplay from "@/components/MediaDisplay";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { differenceInYears, addYears, isAfter } from "date-fns";

interface TimelineItemProps {
  moment: Moment;
  index: number;
  isAnniversary: boolean;
}

interface CountdownProps {
  targetDate: string;
}

interface RomanticTimelineProps {
  collection: Collection;
  user: User | null;
  moments: Moment[];
}

// Anniversary countdown component
function AnniversaryCountdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);

      let nextAnniversary = target;

      // If the date has passed this year, calculate next anniversary
      if (isAfter(now, target)) {
        const yearsPassed = differenceInYears(now, target);
        nextAnniversary = addYears(target, yearsPassed + 1);
      }

      const totalSeconds = Math.floor(
        (nextAnniversary.getTime() - now.getTime()) / 1000
      );

      if (totalSeconds <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 mt-6 border border-pink-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <HiHeart className="text-pink-500 text-xl" />
        <h4 className="font-semibold text-pink-800">Anniversary</h4>
      </div>
      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="bg-white/50 rounded-lg p-3">
          <motion.div
            className="text-2xl font-bold text-pink-600"
            key={timeLeft.days}
            initial={{ scale: 1.2, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {timeLeft.days}
          </motion.div>
          <div className="text-xs text-pink-500">
            {timeLeft.days === 1 ? "Day" : "Days"}
          </div>
        </div>
        <div className="bg-white/50 rounded-lg p-3">
          <motion.div
            className="text-2xl font-bold text-pink-600"
            key={timeLeft.hours}
            initial={{ scale: 1.2, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {timeLeft.hours}
          </motion.div>
          <div className="text-xs text-pink-500">
            {timeLeft.hours === 1 ? "Hour" : "Hours"}
          </div>
        </div>
        <div className="bg-white/50 rounded-lg p-3">
          <motion.div
            className="text-2xl font-bold text-pink-600"
            key={timeLeft.minutes}
            initial={{ scale: 1.2, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {timeLeft.minutes}
          </motion.div>
          <div className="text-xs text-pink-500">
            {timeLeft.minutes === 1 ? "Min" : "Mins"}
          </div>
        </div>
        <div className="bg-white/50 rounded-lg p-3">
          <motion.div
            className="text-2xl font-bold text-pink-600"
            key={timeLeft.seconds}
            initial={{ scale: 1.2, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {timeLeft.seconds}
          </motion.div>
          <div className="text-xs text-pink-500">
            {timeLeft.seconds === 1 ? "Sec" : "Secs"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Individual timeline item component
function TimelineItem({ moment, index, isAnniversary }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className={`relative flex items-center ${
        isLeft
          ? "justify-center md:justify-start"
          : "justify-center md:justify-end"
      } ${index > 0 ? "mt-8 md:-mt-12" : ""}`}
    >
      {/* Timeline dot */}
      <motion.div
        className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-10 ${
          isAnniversary
            ? "bg-gradient-to-r from-pink-400 to-rose-400 ring-4 ring-pink-200"
            : "bg-gradient-to-r from-blue-400 to-purple-400 ring-4 ring-blue-200"
        }`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      />

      {/* Content card */}
      <motion.div
        className={`w-full max-w-md mx-4 ${
          isLeft ? "md:mr-auto" : "md:ml-auto"
        } relative`}
        style={{ zIndex: 20 + index }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div
          className={`bg-white backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200/50 ${
            isAnniversary ? "ring-2 ring-pink-200" : ""
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <motion.h3
                className={`text-xl font-bold bg-gradient-to-r ${
                  isAnniversary
                    ? "from-pink-600 to-rose-600"
                    : "from-blue-600 to-purple-600"
                } bg-clip-text text-transparent`}
                layoutId={`title-${moment.id}`}
              >
                {moment.title}
              </motion.h3>
              <div className="flex items-center gap-2 mt-1">
                <HiClock className="text-gray-400 text-sm" />
                <span className="text-sm text-gray-500">
                  {new Date(moment.started_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            {isAnniversary && (
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <HiSparkles className="text-pink-500 text-xl" />
              </motion.div>
            )}
          </div>

          {/* Category badge */}
          {moment.category && (
            <motion.span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                isAnniversary
                  ? "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800"
                  : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {moment.category}
            </motion.span>
          )}

          {/* Media */}
          {moment.media_url && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mb-4 overflow-hidden rounded-2xl"
            >
              <MediaDisplay
                url={moment.media_url}
                alt={moment.title}
                title={moment.title}
                className="!mb-0"
              />
            </motion.div>
          )}

          {/* Content */}
          {moment.content && (
            <p className="text-gray-700 mb-4 leading-relaxed">
              {moment.content}
            </p>
          )}

          {/* Location */}
          {(moment.city || moment.country) && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <HiMapPin className="text-red-400" />
              <span>
                {[moment.city, moment.country].filter(Boolean).join(", ")}
              </span>
            </div>
          )}

          {/* Completion status */}
          {moment.completed_at && (
            <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
              <HiCheckCircle />
              <span>
                Completed on{" "}
                {new Date(moment.completed_at).toLocaleDateString()}
              </span>
            </div>
          )}

          {/* Anniversary countdown */}
          {isAnniversary && (
            <AnniversaryCountdown targetDate={moment.started_at} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Hero section component
function HeroSection({
  collection,
  user,
}: {
  collection: Collection;
  user: User | null;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-rose-400/10" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 px-4"
      >
        <motion.h1
          className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight py-2"
          style={{
            backgroundSize: "200% 200%",
            lineHeight: "1.1",
            fontFamily: "var(--font-dancing-script), cursive",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {collection.name}
        </motion.h1>

        {user && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 mb-8"
          >
            A love story by {user.name}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-2 text-gray-500"
        >
          <HiHeart className="text-pink-500" />
          <span>Scroll to explore</span>
          <HiHeart className="text-pink-500" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// Main timeline component
export default function RomanticTimeline({
  collection,
  user,
  moments,
}: RomanticTimelineProps) {
  // Identify anniversary moments
  const anniversaryKeywords = [
    "anniversary",
    "wedding",
    "married",
    "engagement",
    "proposal",
  ];
  const momentsWithAnniversary = moments.map((moment) => ({
    ...moment,
    isAnniversary:
      moment.category?.toLowerCase().includes("anniversary") ||
      anniversaryKeywords.some(
        (keyword) =>
          moment.title.toLowerCase().includes(keyword) ||
          moment.category?.toLowerCase().includes(keyword)
      ),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Hero Section */}
      <HeroSection collection={collection} user={user} />

      {/* Timeline Section */}
      <section className="relative py-20 px-4">
        {/* Fixed background image for the entire page */}
        <div
          className="fixed inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "url(/images/background.avif)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              The Story of Us
            </h2>
            <p className="text-lg text-gray-600">
              {moments.length} beautiful moments and counting...
            </p>
          </motion.div>

          {moments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <HiHeart className="text-6xl text-pink-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">
                Your love story is waiting to be written...
              </p>
            </motion.div>
          ) : (
            <div className="relative">
              {/* Vertical timeline line - only spans the timeline items */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-pink-200 via-blue-200 to-purple-200 rounded-full"
                style={{
                  top: "2rem",
                  bottom: "2rem",
                  height: `calc(100% - 4rem)`,
                  WebkitMask:
                    "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                  mask: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                }}
              />

              <div className="space-y-0">
                {momentsWithAnniversary.map((moment, index) => (
                  <TimelineItem
                    key={moment.id}
                    moment={moment}
                    index={index}
                    isAnniversary={moment.isAnniversary}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex justify-center pb-20 relative z-20"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <HiArrowUp className="transition-transform group-hover:-translate-y-1" />
          Back to Top
        </button>
      </motion.div>
    </div>
  );
}
