import db from '$lib/db'
import { json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

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
        }, include: { status: true, customer: true, employee: true, items: true ,receivedBy:true}
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