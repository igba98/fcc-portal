import { InternalSidebar } from '@/components/layout/InternalSidebar';

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex bg-background overflow-hidden">
      <InternalSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
