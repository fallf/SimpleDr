const Role  = require('../../models/Role');


async function docSignupFormHandler(event) {
    event.preventDefault();
    
    Role.findAll({
      attributes:[
          'id',
          'name'
      ]
    })
    .then(dbRoleData => {
    console.log(dbRoleData, 'hello')
    const roleIdArray = [];
    })
    .catch(err =>{
      console.log(err);
    })

    // const name = document.querySelector('#name-signup').value.trim();
    // const last_name = document.querySelector('#lname-signup').value.trim();
    // const username = document.querySelector('#username-signup').value.trim();
    // const email = document.querySelector('#email-signup').value.trim();
    // const password = document.querySelector('#password-signup').value.trim();
    // const docRole = document.querySelector('#doc-role-signup');
    // const nurRole = document.querySelector('#nur-role-signup');

    // docRole.checked = 1
    // nurRole.checked = 2
  
    // if (name && last_name && username && email && password && docRole) {
    //   const response = await fetch('/api/user/', {
    //     method: 'post',
    //     body: JSON.stringify({
    //       name,
    //       last_name,
    //       username,
    //       email,
    //       password,
    //       role_id
    //     }),
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    //   if(response.ok) {
    //       console.log('success');
    //       document.location.replace("/login")
    //   } else {
    //       alert(response.statusText);
    //   }
    // } else if (name && last_name && username && email && password && nurRole) {
    //   const response = await fetch('/api/user/', {
    //     method: 'post',
    //     body: JSON.stringify({
    //       name,
    //       last_name,
    //       username,
    //       email,
    //       password,
    //       role_id
    //     }),
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    //   if(response.ok) {
    //       console.log('success');
    //       document.location.replace("/login")
    //   } else {
    //       alert(response.statusText);
    //   }
    // }
};
  

document.querySelector('.user-signup-form').addEventListener('submit', docSignupFormHandler);
