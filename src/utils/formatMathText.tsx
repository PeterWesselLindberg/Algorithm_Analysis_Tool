const formatMathText = (text: string) => {
    const regex = /(\^\{([^}]*)\}|_\{([^}]*)\})/g

    const result: React.ReactNode[] = []
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
        result.push(text.slice(lastIndex, match.index))

        if (match[2]) {
            result.push(
                <sup key={match.index}>
                    {match[2]}
                </sup>
            )
        }

        if (match[3]) {
            result.push(
                <sub key={match.index}>
                    {match[3]}
                </sub>
            )
        }

        lastIndex = regex.lastIndex
    }

    result.push(text.slice(lastIndex))

    return result
}
export default formatMathText