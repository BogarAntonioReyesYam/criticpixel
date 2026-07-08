import { useTheme } from '../context/ThemeContext';

const SkeletonPulse = ({ className = '' }) => {
  const { theme } = useTheme();
  return (
    <div 
      className={`animate-pulse rounded ${className}`}
      style={{ 
        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'
      }}
    />
  );
};

export const GameCardSkeleton = () => {
  const { theme } = useTheme();
  return (
    <div className="rounded-xl overflow-hidden"
         style={{ 
           backgroundColor: theme === 'dark' ? '#1d1d1d' : '#ffffff',
           border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`
         }}>
      <SkeletonPulse className="aspect-[3/4]" />
      <div className="p-3 space-y-2">
        <SkeletonPulse className="h-4 w-3/4" />
        <div className="flex justify-between">
          <SkeletonPulse className="h-3 w-1/3" />
          <SkeletonPulse className="h-3 w-1/4" />
        </div>
      </div>
    </div>
  );
};

export const GameGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <GameCardSkeleton key={i} />
    ))}
  </div>
);

export const GameDetailsSkeleton = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="relative h-[60vh] min-h-[400px] animate-pulse"
           style={{ backgroundColor: theme === 'dark' ? '#1d1d1d' : '#f0f0f0' }} />
      
      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column */}
          <div className="lg:col-span-1 space-y-6">
            <SkeletonPulse className="aspect-[3/4] rounded-2xl" />
            <SkeletonPulse className="h-48 rounded-2xl" />
          </div>
          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            <SkeletonPulse className="h-12 w-2/3" />
            <SkeletonPulse className="h-6 w-1/2" />
            <SkeletonPulse className="h-32 rounded-2xl" />
            <SkeletonPulse className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SectionSkeleton = () => (
  <div className="space-y-4">
    <SkeletonPulse className="h-8 w-1/3" />
    <SkeletonPulse className="h-4 w-2/3" />
    <SkeletonPulse className="h-64 rounded-2xl" />
  </div>
);
