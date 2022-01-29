export const isValidJSON = (text: string) => {
    try {
        JSON.parse(text)
        return true
    } catch{
        return false
    }
}

export const compareText = (a: string, b: string) => {
    if (a < b) {
        return -1
    } else if (a > b) {
        return 1
    } else {
        return 0
    }
}