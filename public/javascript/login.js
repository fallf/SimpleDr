async function userLoginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if(email && password) {
    console.log(password)
    const response = await fetch('/api/user/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
}

function userSignupRoute() {

  
  document.location.replace("/signup")
};

document.querySelector('#user-login-form').addEventListener('submit', userLoginFormHandler);
document.querySelector('#user-signup').addEventListener('click', userSignupRoute);