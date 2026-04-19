'use client';

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface RoleGuardProps {
    allowed: string[];
    children: ReactNode;
    fallback?: ReactNode;
}

export function RoleGuard({ allowed, children, fallback = null }: RoleGuardProps) {
    const { data: session } = useSession();
    
    if (!session || !session.user || !session.user.role) {
        return <>{fallback}</>;
    }
    
    if (allowed.includes(session.user.role as string)) {
        return <>{children}</>;
    }
    
    return <>{fallback}</>;
}
