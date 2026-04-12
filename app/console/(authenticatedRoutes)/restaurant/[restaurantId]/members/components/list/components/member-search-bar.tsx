'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconLoader2, IconSearch } from "@tabler/icons-react";
import { Input } from "@/lib/components/ui/input";
import { useLocale } from "@/lib/hooks/use-locale";

type MemberSearchBarProps = {
    initialValue?: string;
};

export default function MemberSearchBar({
    initialValue = "",
}: MemberSearchBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { messages } = useLocale();
    const memberListTranslations = messages.console.restaurant.members.list;
    const [value, setValue] = useState(initialValue);
    const [debouncedValue, setDebouncedValue] = useState(initialValue.trim().toLowerCase());
    const normalizedValue = value.trim().toLowerCase();
    const isSearching = normalizedValue !== debouncedValue;

    useEffect(() => {
        setValue(initialValue);
        setDebouncedValue(initialValue.trim().toLowerCase());
    }, [initialValue]);

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            const nextSearch = value.trim();
            const currentSearch = searchParams.get("search") ?? "";

            if (nextSearch === currentSearch) {
                setDebouncedValue(nextSearch.toLowerCase());
                return;
            }

            const params = new URLSearchParams(searchParams.toString());

            if (nextSearch) {
                params.set("search", nextSearch);
            } else {
                params.delete("search");
            }

            router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname);
            setDebouncedValue(nextSearch.toLowerCase());
        }, 500);

        return () => window.clearTimeout(timeout);
    }, [pathname, router, searchParams, value]);

    return (
        <div className="relative">
            {isSearching ? (
                <IconLoader2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            ) : (
                <IconSearch className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            )}
            <Input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={memberListTranslations.searchPlaceholder}
                className="pl-9"
            />
        </div>
    );
}
