import { motion } from 'framer-motion';

const shimmer = 'animate-pulse bg-gray-200 dark:bg-white/5';

export const GameCardSkeleton = () => (
  <div className="bg-white dark:bg-[#1d1d1d] rounded-xl overflow-hidden border border-gray-200 dark:border-white/5">
    <div className={`aspect-[3/4] ${shimmer}`} />
    <div className="p-3 space-y-2">
      <div className={`h-4 ${shimmer} rounded w-3/4`} />
      <div className="flex justify-between">
        <div className={`h-3 ${shimmer} rounded w-1/3`} />
        <div className={`h-3 ${shimmer} rounded w-1/4`} />
      </div>
    </div>
  </div>
);

export const GameGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <GameCardSkeleton key={i} />
    ))}
  </div>
);

export const GameDetailsSkeleton = () => (
  <div className="min-h-screen">
    {/* Hero skeleton */}
    <div className="relative h-[60vh] min-h-[400px] bg-white dark:bg-[#1d1d1d] animate-pulse" />
    
    {/* Content skeleton */}
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`aspect-[3/4] ${shimmer} rounded-2xl`} />
          <div className={`h-48 ${shimmer} rounded-2xl`} />
        </div>
        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`h-12 ${shimmer} rounded w-2/3`} />
          <div className={`h-6 ${shimmer} rounded w-1/2`} />
          <div className={`h-32 ${shimmer} rounded-2xl`} />
          <div className={`h-48 ${shimmer} rounded-2xl`} />
        </div>
      </div>
    </div>
  </div>
);

export const SectionSkeleton = () => (
  <div className="space-y-4">
    <div className={`h-8 ${shimmer} rounded w-1/3`} />
    <div className={`h-4 ${shimmer} rounded w-2/3`} />
    <div className={`h-64 ${shimmer} rounded-2xl`} />
  </div>
);
