import db from '$lib/db'
import { json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    console.log(params.customer)
    const customer = await db.customer.findFirst({
        where: {
            OR: [
                {
                    id: params.customer
                }
            ]
        }, include: { repairs: { include: { status: true, employee: true, items: true } } }
    });
    if (customer == null) {
        throw redirect(304, '/customer')
    }
    console.log(customer)
    return {
        customer,
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    edit: async ({ cookies, request }) => {
        const data = await request.formData();
        const customerId = data.get('customerId').toString()
        const firstName = data.get('firstName').toString()
        const lastName = data.get('lastName').toString()
        const email = data.get('email').toString()
        const phone = data.get('phone').toString()
        const details = data.get('details').toString()

        let toCreateRepair = {
            firstName,
            lastName,
            email,
            phone,
            details,
        }

        const repair = await db.customer.update({
            where: { id: customerId },
            data: toCreateRepair
        })
        return { success: true, repairId: repair.id, }
    },
};