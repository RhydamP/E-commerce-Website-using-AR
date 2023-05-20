var users = [];

$(document).ready(function () {
    // Load data from Excel spreadsheet
    $.ajax({
        url: "users.xlsx",
        dataType: "binary",
        success: function (data) {
            var workbook = XLSX.read(data, { type: "binary" });
            var sheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[sheetName];
            users = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        }
    });
});

function login() {
    var email = $("#email").val();
    var password = $("#password").val();

    // Find user in Excel spreadsheet
    var user = users.find(function (row) {
        return row[0] === email && row[1] === password;
    });

    if (user) {
        alert("Login successful.");
        window.open("index.html");
    } else {
        alert("Incorrect email or password.");
    }
}

function register() {
    var email = $("#reg-email").val();
    var password = $("#reg-password").val();

    // Check if email already exists in Excel spreadsheet
    var existingUser = users.find(function (row) {
        return row[0] === email;
    });

    if (existingUser) {
        alert("Email already registered.");
    } else {
        // Add new user to Excel spreadsheet
        users.push([email, password]);
        alert("Registration successful.");
        // Create new workbook and worksheet
        var workbook = XLSX.utils.book_new();
        var worksheet = XLSX.utils.aoa_to_sheet(users);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        // Convert workbook to binary Excel file and download
        var wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
        saveAs(blob, "users.xlsx");
    }
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
}
