export function refactorName(name) {
    const fname = name.split(" ")[0];
    return fname.toLowerCase();
}

export function containsSpecialCharactersOrWhiteSpace(str) {
    // Check for white space
    if (/\s/.test(str)) {
        return true;
    }

    // Check for special characters
    var specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialChars.test(str)) {
        return true;
    }

    return false;
}
