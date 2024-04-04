$(document).ready(function () {
    $("#contact-form").submit(function (e) {
        e.preventDefault(); // Menghentikan pengiriman formulir standar

        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();

        $.ajax({
            type: "POST",
            url: "https://api.emailjs.com/api/v1.0/email/send",
            data: JSON.stringify({
                service_id: "service_8579njx",
                template_id: "template_imtyq1e",
                user_id: "yOTMwm3jp9GIWnAKI",
                template_params: {
                    "from_name": name,
                    "from_email": email,
                    "to_email": "sawaggy2@gmail.com",
                    "subject": subject,
                    "message_html": message
                }
            }),
            contentType: "application/json",
            success: function (response) {
                console.log("Email sent successfully", response);
                $("#sent-message").show();
                $("#contact-form")[0].reset();
            },
            error: function (error) {
                console.error("Email sending failed", error);
                $("#error-message").html("Error: " + error.responseText).show();
            }
        });
    });
});