document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const mailAddressInput = document.getElementById("mailAddress");
    
    const usernameError = document.getElementById("usernameError");
    const mailAddressError = document.getElementById("mailAddressError");
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

        // エラーがなければ成功メッセージを表示し、トップページにリダイレクト
        if (Object.keys(formErrors).length === 0) {
            console.log(formValues);

            // セッションストレージにログイン成功フラグを保存
            sessionStorage.setItem('loginSuccess', 'true');

            // トップページにリダイレクト
            window.location.href = "/";
        } else {
            successMessage.style.display = "none";
        }
    });

    function validate(values) {
        const errors = {};
        const regex = /^[a-zA-Z0-9_.+-]+@st\.omu\.ac\.jp$/; // @st.omu.ac.jp ドメインに限定

        if (!values.username) {
            errors.username = "ユーザー名を入力してください。";
        }
        if (!values.mailAddress) {
            errors.mailAddress = "メールアドレスを入力してください。";
        } else if (!regex.test(values.mailAddress)) {
            errors.mailAddress = "@st.omu.ac.jp のメールアドレスを入力してください";
        }

        return errors;
    }
});
