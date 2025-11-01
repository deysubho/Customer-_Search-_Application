type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: any }

export function cn(...inputs: ClassValue[]) {
  // lightweight fallback implementation of clsx that handles strings, numbers, arrays and object maps
  const classes: string[] = []

  const walk = (input: ClassValue) => {
    if (!input && input !== 0) return
    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input))
      return
    }
    if (Array.isArray(input)) {
      input.forEach(walk)
      return
    }
    if (typeof input === "object") {
      for (const key in input as Record<string, any>) {
        if ((input as Record<string, any>)[key]) classes.push(key)
      }
    }
  }

  inputs.forEach(walk)

  return classes.join(" ")
}