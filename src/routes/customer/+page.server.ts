import db from '$lib/db'
import { getPagination, pageLimit } from '$lib/serverfunctions'

/** @type {import('./$types').PageLoad} */
export async function load({ params, request }) {
    const search = new URL(request.url).searchParams
    let page: number = parseInt(search.get('page')) || 1;
    let limit: number = parseInt(search.get('limit')) || pageLimit;

    const { maxPages, skip } = await getPagination(await db.customer.count(), page, limit)
    const customers = await db.customer.findMany({ include: { repairs: true }, take: limit, skip: skip })

    return {
        pagination: {
            page,
            limit,
            maxPages
        },
        customers
    };
}


