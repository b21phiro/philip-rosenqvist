export function validateEmail(email: string): boolean {
    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    return emailRegex.test(email);
}

export function validateEmpty(input: string): boolean {
    return input.trim() !== "";
}