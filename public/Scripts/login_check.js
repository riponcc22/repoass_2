document.addEventListener("DOMContentLoaded", function () {
    const default_username = "admin";
    const default_password = "12345";

    const form = document.getElementById("login-form");
    const error_message = document.getElementById("error-message");

    form.addEventListener("submit", function(event){
        
        event.preventDefault();

        const user_name = document.getElementById("userName").value;
        const user_password = document.getElementById("password").value;

        if (user_name === default_username && user_password === default_password) {
           
            // if username and password matched--redirect to the busines contact list page
            window.location.href = "/contactlist";
        } else {
            
            // username or password is invalid--- it will show an error message
            error_message.textContent = "Invalid username or password. Please try again.";
        }
    });
});