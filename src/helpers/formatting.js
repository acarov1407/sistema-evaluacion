export function formatUser(userData){
    const formatedUser = {
        firstName: userData.firstName.toString().trim(),
        secondName: userData.secondName.toString().trim(),
        surname: userData.surname.toString().trim(),
        secondSurName: userData.secondSurName.toString().trim(),
        typeDocument: parseInt(userData.typeDocument),
        documentNumber: userData.documentNumber.toString().trim(),
        phone: userData.phone.toString().trim(),
        email: userData.email.toString().trim()
    }

    if(userData.id){
        formatedUser.id = userData.id;
    }

    return formatedUser;
}