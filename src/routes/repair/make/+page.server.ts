import db from '$lib/db'
import { fail, json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { gotAllRequiredFields } from '$lib/serverfunctions.js';

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
        const data = await request.formData();
        //@ts-ignore
        console.log(data)
        let customer = data.get('customer')?.toString() || undefined

        if (!customer) {
            console.log('no customer')
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
            //@ts-ignore
            customer = await db.customer.create({
                data: toCreateCustomer
            })
        } else {
            customer = JSON.parse(customer)
        }

        const employeeId = data.get('employee').toString()
        const receivedById = data.get('receivedById').toString()
        //@ts-ignore
        const statusId = parseInt(data.get('status') as number)
        const details = data.get('details').toString()
        const password = data.get('password').toString()
        const issue = data.get('issue').toString()
        const included = data.get('included').toString()

        console.log({
            employeeId,
            customer,
            statusId,
            details,
            password,
            issue,
            included
        })

        let toCreateRepair = {
            employeeId,
            customerId: customer.id,
            details,
            password,
            issue,
            statusId,
            receivedById,
            included
        }

        // const gotAllRequired = await gotAllRequiredFields(['employeeId',
        //     'receivedById', 'customerId', 'issue'], toCreateRepair)

        // if (gotAllRequired.passed == false) {
        //     return { success: false, message: `Missing fields: ${gotAllRequired.missing.join(', ')}` }
        // }

        const repair = await db.repair.create({
            //@ts-ignore
            data: toCreateRepair
        })
        return { success: true, repairId: repair.code, }
    }
};