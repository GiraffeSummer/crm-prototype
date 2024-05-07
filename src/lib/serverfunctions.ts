import db from '$lib/db'

export const pageLimit = 10

export async function getPagination(itemCount: number, page: number, limit: number = pageLimit) {
    const maxPages = Math.ceil(itemCount / limit)

    if (page < 1) page = 1;
    if (page > maxPages) page = maxPages;

    let skip = Math.max((page - 1) * limit, 0);

    return {
        skip,
        page,
        limit,
        maxPages
    }
}

export async function gotAllRequiredFields(fieldNames: string[], data: any): Promise<{ passed: boolean, missing: string[] }> {

    const returnObject = fieldNames.reduce((c, x) => {
        if (x in data) {
            const val = data[x]?.trim() || data[x]
            if (val == undefined || val == '') {
                c.missing.push(x)
            }
        } else {
            c.missing.push(x)
        }
        return c
    }, {
        passed: null,
        missing: []
    })

    returnObject.passed = returnObject.missing.length == 0

    return returnObject;
}