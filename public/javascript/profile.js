

async function patientAppHandler(event){
   event.preventDefault();
    const p_name = document.querySelector('#p-name').value.trim();
    const p_lname = document.querySelector('#p-lname').value.trim();
    const p_email = document.querySelector('#p-email').value.trim();
    const p_dob = document.querySelector('#p-dob').value.trim();
    const p_condition = document.querySelector('#p-sym').value.trim();
    const user_id = document.querySelector('#as-doc-id').value.trim();
    // const user_id = parseInt(user_id_string);


    if (p_name && p_lname && p_email && p_dob && p_condition && user_id){
       const response = await fetch('/api/patient',{
           method:'post',
           body:JSON.stringify({
            p_name,
            p_lname,
            p_email,
            p_dob,
            p_condition,
            user_id
           }),
           headers:{'Content-Type':'application/json'}
       });
       if(response.ok){
           console.log(response);
           console.log('success');
           document.location.reload();
           
       } else{
           alert(response.statusText);
       }
    }
};





document.querySelector('#btn').addEventListener('click', patientAppHandler);
