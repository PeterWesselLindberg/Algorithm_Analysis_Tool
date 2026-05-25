const generateRandomValue = (length: number = 10, hasDuplicates: boolean = true, targetExists: boolean = false, forceRootValue: boolean = false) => {
    const min: number = 1
    const max: number = 30

    let values: number[] = []

    //FORCE ROOT VALUE
    if (forceRootValue) {
        const rootValue =
            Math.floor(Math.random() * (max - min + 1)) + min

        values.push(rootValue)
    }

    // ENSURE TARGET EXISTS
    let target: number | null = null

    if (targetExists) {
        target = Math.floor(Math.random() * (max - min + 1)) + min

        // if root already exists, avoid conflict if no duplicates allowed
        if (!hasDuplicates) {
           values.push(target)
        }
    }

    // GENERATE REMAINING VALUES
    const used = new Set<number>(values)

    while (values.length < length) {

        const value =
        Math.floor(Math.random() * (max - min + 1)) + min

        if (!hasDuplicates && used.has(value)) {
            continue
        }

        values.push(value)
        used.add(value)
    }

    // IF TARGET EXISTS BUT NOT INSERTED YET
    if (targetExists && !values.includes(target!)) {
        const index =
            Math.floor(Math.random() * values.length)

        values[index] = target!
    }

    return {
        values,
        target
    }
}

export default generateRandomValue