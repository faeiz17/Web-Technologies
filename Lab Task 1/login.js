function Loginbtn() {
    var loginbtn = document.getElementById("loginbtn");
    loginbtn.onclick = checkCredentials;
}

window.onload = Loginbtn;

function checkCredentials() {
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    if (username === "admin" && password === "admin") {
        console.log(username, password);
        window.location.href = "admin.html";
    } else {
        console.log("Invalid credentials");
    }
}

