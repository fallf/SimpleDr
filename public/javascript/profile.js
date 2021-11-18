async function patientAppHandler(event){
    event.preventDefault();
    const p_name = document.querySelector('#p-name').value.trim();
    const p_lname = document.querySelector('#p-lname').value.trim();
    const p_email = document.querySelector('#p-email').value.trim();
    const p_dob = document.querySelector('#p-dob').value.trim();
    const p_condition = document.querySelector('#p-sym').value.trim();
    


    if (p_name && p_lname && p_email && p_dob && p_condition ){
       const response = await fetch('/api/patient',{
           method:'POST',
           body:JSON.stringify({
            p_name,
            p_lname,
            p_email,
            p_dob,
            p_condition,
            p_doc_comment
           }),
           headers:{'Content':'application/json'}
       });
       if(response.ok){
           console.log(response);
           console.log('success');
           document.location.replace('/login');
           
       } else{
           alert(response.statusText);
       }
    }
};

document.querySelector('#btn').addEventListener('submit', patientAppHandler);