import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get } from 'svelte/store';

export function navigateToPageMod(modifier: number) {
    return () => {
        const _page =
            (parseInt(get(page).url.searchParams.get('page')) || 1) + modifier;

        return navigateToPage(_page)();
    };
}
export function navigateToPage(pageNr: number) {
    return () => {
        get(page).url.searchParams.set('page', `${pageNr}`);
        goto(`?${get(page).url.searchParams.toString()}`, {
            invalidateAll: true,
        });
    }
}