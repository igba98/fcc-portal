import { ExternalSidebar } from '@/components/layout/ExternalSidebar';

export default function ExternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex bg-background overflow-hidden">
      <ExternalSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
