function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username == "" || password == "") {
        alert("Please fill in all fields.");
        return false;
    }
    else if (username != "hello" || password != "hello") {
        alert("Invalid login credentials.");
        return false;
    }
    else {
        alert("Login successful.");
        window.open('index.html');
        return true;
    }
}
