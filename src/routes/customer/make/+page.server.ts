import db from '$lib/db'
import { json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const statusses = await db.repairStatus.findMany({});
    const employees = await db.employee.findMany({ where: { active: true } })
    const customers = await db.customer.findMany({})
    return {
        employees,
        customers,
        statusses,
        //product
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ cookies, request }) => {
        console.log('make customer')
        const data = await request.formData();
        //@ts-ignore
        const firstName = data.get('firstName').toString()
        const lastName = data.get('lastName').toString()
        const email = data.get('email').toString()
        const phone = data.get('phone').toString()
        const details = data.get('details').toString()


        let toCreateCustomer = {
            firstName,
            lastName,
            email,
            phone,
            details
        }


        const customer = await db.customer.create({
            //@ts-ignore
            data: toCreateCustomer
        })
        return { success: true, customerId: customer.id, }
    }
};