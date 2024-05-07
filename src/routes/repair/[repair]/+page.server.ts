import db from '$lib/db'
import { json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import Currency from 'currency.js'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const data = [db.repairStatus.findMany({}), db.employee.findMany({ where: { active: true } }), db.customer.findMany({})]
    const [statusses, employees, customers] = await Promise.all(data)
    const repair = await db.repair.findFirst({
        where: {
            OR: [
                {
                    code: params.repair
                },
                {
                    id: parseInt(params.repair) || 0
                }
            ]
        }, include: { status: true, customer: true, employee: true, items: true, receivedBy: true }
    });
    if (repair == null) {
        throw redirect(304, '/repair')
    }
    return {
        statusses,
        repair,
        customers,
        employees
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    removeitem: async ({ cookies, request }) => {
        const data = await request.formData();
        const itemId = parseInt(data.get('itemId').toString());
        const deleted = await db.repairItem.delete({ where: { id: itemId } })

        return { success: true }
    },
    additem: async ({ cookies, request }) => {
        const data = await request.formData();
        const repairId = parseInt(data.get('repairId').toString());
        const itemName = data.get('name').toString();
        const price = Currency(data.get('price').toString(), { decimal: ',' })
        const child = data.get('child')?.toString() == 'on';

        if (price.intValue > 100_000_00) {//not bigger than 100.000
            return { success: false, message: "number too big" }
        }

        await db.repairItem.create({
            data: {
                repairId,
                name: itemName,
                child,
                price: price.intValue
            }
        })
        return { success: true }
    },
    edit: async ({ cookies, request }) => {
        const data = await request.formData();
        const repairId = parseInt(data.get('repairId').toString())
        const employeeId = data.get('employee').toString()
        const receivedById = data.get('receivedById').toString()
        const statusId = parseInt(data.get('status').toString())
        const details = data.get('details').toString()
        const password = data.get('password').toString()
        const issue = data.get('issue').toString()
        const included = data.get('included').toString()

        let toCreateRepair = {
            employeeId,
            details,
            password,
            issue,
            statusId,
            receivedById,
            included
        }
        const repair = await db.repair.update({
            where: { id: repairId },
            data: toCreateRepair
        })
        return { success: true, repairId: repair.code, }
    },
};