window.onload = () => {
    if (!sessionStorage.name) {
        location.href = '/login';
    } else {
        const logOut = document.querySelector('.logout');
        if (logOut) {
            logOut.onclick = () => {
                sessionStorage.clear();
                location.href = '/login'; // Redirect to login after logout
            };
        }
    }
};
