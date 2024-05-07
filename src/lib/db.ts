import { PrismaClient } from '@prisma/client'
import type { Repair, RepairItem } from '@prisma/client'
import { customAlphabet } from "nanoid";
const prisma = new PrismaClient().$extends({
    query: {
        repair: {
            async create({ model, operation, args, query }) {
                args.data.code = customAlphabet('1234567890')(6)

                return query(args)
            },
        },
    },
})

export default prisma

// Define a type that needs a first and last name
type hasItems = {
    items: RepairItem[]
}

// Extend the T generic with the fullName attribute
type WithPrice<T> = T & {
    price: number
}

export function computeRepairPrice<Repair extends hasItems>(
    repair: Repair
): WithPrice<Repair> {
    return {
        ...repair,
        price: repair.items.reduce((c, i) => c + i.price, 0),
    }
}