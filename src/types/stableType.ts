/** Stable types for the complexity table */
const Stable = {
    Yes: "Yes",
    No: "No",
} as const

export type StableType = typeof Stable[keyof typeof Stable]

export default Stable