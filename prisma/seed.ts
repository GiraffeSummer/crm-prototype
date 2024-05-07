import { PrismaClient } from '@prisma/client'
//@ts-ignore
import '../src/globals.ts'
import { serials, batch } from './uuids.js'
//@ts-ignore
import namegenerator from '../src/test/nameGenerator/generator.ts'
// import userData from "../src/lib/data.json" assert { type: "json" }


const states = [
    { id: 1, name: 'Open' },
    { id: 2, name: 'Kapot' },
    { id: 3, name: 'Verkoopbaar' },
    { id: 4, name: 'Verkocht' }
]

const repairStates = [
    { id: 1, name: 'Open' },
    { id: 2, name: 'Onder handen' },
    { id: 3, name: 'Wacht op onderdelen' },
    { id: 4, name: 'Wacht op klant' },
    { id: 5, name: 'Kan worden opgehaald' },
    { id: 6, name: 'Wacht op betaling' },
    { id: 7, name: 'Afgerond' }
]

const employees = [
    { name: 'user', active: false },
    { name: 'admin', active: true },
    { name: 'employee', active: true },
    { name: 'guest', active: true }
];


const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)

    for (const p of states) {
        const state = await prisma.status.upsert({ where: { id: p.id }, create: p, update: p })

        console.log(`Created state with id: ${state.name}`)
    }

    for (const p of repairStates) {
        const state = await prisma.repairStatus.upsert({ where: { id: p.id }, create: p, update: p })

        console.log(`Created repair state with id: ${state.name}`)
    }


    for (const p of employees) {
        const state = await prisma.employee.create({ data: { name: p.name, active: p.active } })
        console.log(`Created employee: ${state.name}`)
    }

    for (let i = 0; i < 10; i++) {
        //Customer
        const names = namegenerator().split(' ')
        await prisma.customer.create({
            data: {
                firstName: names[0],
                lastName: names[1],
                phone: '0123456789',
                email: 'example@example.com'
            }
        })
    }

    if (false) { //skip product seeding (not implemented)
        for (let index = 0; index < 20; index++) {
            const product = {
                serial: serials[index],
                batch: batch[index],
                name: namegenerator(),
                comment: '',
                status: {
                    connect: {
                        id: 1,
                    },
                },
            }

            //@ts-ignore
            await prisma.product.upsert({ where: { serial: product.serial }, create: product, update: product })
        }
    }

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })