
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
  
        document.location.replace('/nurse-profile');
      } else {
        alert(response.statusText);
      }
    }
  }

  document.querySelector('.nur-login-form').addEventListener('submit', nurLoginFormHandler);