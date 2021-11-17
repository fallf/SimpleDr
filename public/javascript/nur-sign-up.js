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
          document.location.replace("/home")
      } else {
          alert(response.statusText);
      }
    }
  };

  document.querySelector('.nur-signup-form').addEventListener('submit', nurSignupFormHandler);