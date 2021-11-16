async function docSignupFormHandler(event) {
    event.preventDefault();
    const doc_name = document.querySelector('#name-signup').value.trim();
    const doc_last_name = document.querySelector('#lname-signup').value.trim();
    const doc_username = document.querySelector('#username-signup').value.trim();
    const doc_email = document.querySelector('#email-signup').value.trim();
    const doc_password = document.querySelector('#password-signup').value.trim();
  
    if (doc_name && doc_last_name && doc_username && doc_email && doc_password) {
      const response = await fetch('/api/doctor/', {
        method: 'post',
        body: JSON.stringify({
          doc_name,
          doc_last_name,
          doc_username,
          doc_email,
          doc_password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if(response.ok) {
          console.log('success');
          document.location.replace("/")
      } else {
          alert(response.statusText);
      }
    }
};

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
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

async function nurSignupFormHandler(event) {
  event.preventDefault();
  const nur_name = document.querySelector('#nur-name-signup').value.trim();
  const nur_last_name = document.querySelector('#nur-lname-signup').value.trim();
  const nur_username = document.querySelector('#nur-username-signup').value.trim();
  const nur_email = document.querySelector('#nur-email-signup').value.trim();
  const nur_password = document.querySelector('#nur-password-signup').value.trim();

  if (nur_name && nur_last_name && nur_username && nur_email && nur_password) {
    const response = await fetch('/api/nurse/', {
      method: 'post',
      body: JSON.stringify({
        nur_name,
        nur_last_name,
        nur_username,
        nur_email,
        nur_password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok) {
        console.log('success');
        document.location.replace("/")
    } else {
        alert(response.statusText);
    }
  }
};

async function nurLoginFormHandler(event) {
  event.preventDefault();

  const nur_email = document.querySelector('#nur-email-login').value.trim();
  const nur_password = document.querySelector('#nur-password-login').value.trim();

  if(nur_email && nur_password) {
    const response = await fetch('/api/nurse/login', {
      method: 'post',
      body: JSON.stringify({
        nur_email,
        nur_password
      }),
      headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok) {
      //#####replace nurse homepage route here

      document.location.replace('/nurse-home');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.doc-signup-form').addEventListener('submit', docSignupFormHandler);
document.querySelector('.doc-login-form').addEventListener('submit', docLoginFormHandler);
document.querySelector('.nur-signup-form').addEventListener('submit', nurSignupFormHandler);
document.querySelector('.nur-login-form').addEventListener('submit', nurLoginFormHandler);