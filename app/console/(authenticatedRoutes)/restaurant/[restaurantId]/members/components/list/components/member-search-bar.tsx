'use client'

import { IconLoader2, IconSearch } from "@tabler/icons-react";
import { Input } from "@/lib/components/ui/input";

type MemberSearchBarProps = {
    isSearching: boolean;
    value: string;
    onChange: (value: string) => void;
};

export default function MemberSearchBar({
    isSearching,
    value,
    onChange,
}: MemberSearchBarProps) {
    return (
        <div className="relative">
            {isSearching ? (
                <IconLoader2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            ) : (
                <IconSearch className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            )}
            <Input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Chercher un utilisateur"
                className="pl-9"
            />
        </div>
    );
}
