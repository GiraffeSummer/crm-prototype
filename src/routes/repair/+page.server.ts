import db, { computeRepairPrice } from '$lib/db'
import { pageLimit, getPagination } from '$lib/serverfunctions'
/** @type {import('./$types').PageLoad} */
export async function load({ params, request }) {
    const search = new URL(request.url).searchParams
    let page: number = parseInt(search.get('page')) || 1;
    let limit: number = parseInt(search.get('limit')) || pageLimit;
    let customer: string = search.get('customer');

    const filter = (customer != undefined) ? { where: { customerId: customer } } : undefined

    const { maxPages, skip } = await getPagination(await db.repair.count(filter), page, limit)
    const repairs = await Promise.all((
        await db.repair.findMany({
            ...filter, include: { status: true, customer: true, employee: true, items: true,receivedBy:true }, take: limit, skip: skip
        }))
        .map(async repair => await computeRepairPrice(repair))
    );
    return {
        pagination: {
            page,
            limit,
            maxPages
        },
        repairs
    };
}