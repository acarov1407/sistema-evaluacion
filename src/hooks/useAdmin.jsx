

function useAdmin() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(!user) return false;
    
    return user.role.toLowerCase() === 'admin';

}

export default useAdmin