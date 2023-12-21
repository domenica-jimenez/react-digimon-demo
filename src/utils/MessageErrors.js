export const firebaseErrors = (errorType) => {
    const errorList = {
        "auth/weak-password": "The password entered is invalid.",
        "auth/invalid-email": "The email entered is invalid.",
        "auth/email-already-in-use": "The entered email already has an account.",
        "auth/invalid-credential": "The credentials entered are not correct.",
        "auth/missing-password": "No password has been entered.",
        "auth/not-verificated-email": "The email has not been verified.",
    };
    return errorList[errorType] || "Error en Firebase.";
}