
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
          document.location.replace("/home")
      } else {
          alert(response.statusText);
      }
    }
};
  

document.querySelector('.doc-signup-form').addEventListener('submit', docSignupFormHandler);
