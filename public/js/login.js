document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const mailAddressInput = document.getElementById("mailAddress");
    const passwordInput = document.getElementById("password");
    
    const usernameError = document.getElementById("usernameError");
    const mailAddressError = document.getElementById("mailAddressError");
    // const passwordError = document.getElementById("passwordError");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let formValues = {
            username: usernameInput.value,
            mailAddress: mailAddressInput.value,
        };

        let formErrors = validate(formValues);

        // エラーメッセージの表示
        usernameError.textContent = formErrors.username || "";
        mailAddressError.textContent = formErrors.mailAddress || "";

        // エラーがなければ成功メッセージを表示
        if (Object.keys(formErrors).length === 0) {
            successMessage.style.display = "block";
            console.log(formValues);
        } else {
            successMessage.style.display = "none";
        }
    });

    function validate(values) {
        const errors = {};
        const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

        if (!values.username) {
            errors.username = "ユーザー名を入力してください。";
        }
        if (!values.mailAddress) {
            errors.mailAddress = "メールアドレスを入力してください。";
        } else if (!regex.test(values.mailAddress)) {
            errors.mailAddress = "正しいメールアドレスを入力してください";
        }

        return errors;
    }
});
