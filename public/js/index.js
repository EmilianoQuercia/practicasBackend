
const elementExists = (id) => document.getElementById(id) !== null;

elementExists('signup') &&
    document.getElementById('signup').addEventListener('click', function () {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const age = document.getElementById('age').value;

        const data = { firstName, lastName, email, password, age }
        console.log(data)

        fetch('/registro', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
    })

elementExists('send') &&
    document.getElementById('send').addEventListener('click', function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const data = { email, password }
        fetch(`/login/user/?email=${email}&password=${password}`)
        .then(() => fetch('/login/perfil').then(response => response.json()))
    })