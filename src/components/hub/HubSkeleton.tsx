import { Skeleton } from '@/components/ui/skeleton'

export function HubSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <section>
        <Skeleton className="h-6 w-48 mt-8 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </section>
      <section>
        <Skeleton className="h-6 w-48 mt-8 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </section>
    </div>
  )
}
