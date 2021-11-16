
async function docLoginFormHandler(event) {
  event.preventDefault();

  const doc_email = document.querySelector('#email-login').value.trim();
  const doc_password = document.querySelector('#password-login').value.trim();

  if(doc_email && doc_password) {
    const response = await fetch('/api/doctor/login', {
      method: 'post',
      body: JSON.stringify({
        doc_email,
        doc_password
      }),
      headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok) {
      document.location.replace('/doc-profile');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.doc-login-form').addEventListener('submit', docLoginFormHandler);

