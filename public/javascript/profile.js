

async function patientAppHandler(event){
    event.preventDefault();
    const p_name = document.querySelector('#p-name').value.trim();
    const p_lname = document.querySelector('#p-lname').value.trim();
    const p_email = document.querySelector('#p-email').value.trim();
    const p_dob = document.querySelector('#p-dob').value.trim();
    const p_condition = document.querySelector('#p-sym').value.trim();
    const user_id_string = document.querySelector('#as-doc-id').value.trim();
    const user_id = parseInt(user_id_string);


    if (p_name && p_lname && p_email && p_dob && p_condition && user_id){
       const response = await fetch('/api/patient',{
           method:'POST',
           body:JSON.stringify({
            p_name,
            p_lname,
            p_email,
            p_dob,
            p_condition,
            p_doc_comment,
            user_id
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

async function patientCommnetHandler(event) {
    event.preventDefault
    const p_doc_comment = document.querySelector('#doc-comment').value.trim();

    if (p_doc_comment) {
        const response = await fetch('/api/patient/:id', {
            method: 'PUT',
            body:JSON.stringify({
                p_doc_comment
            }),
            headers: {'Content':'application/json'}
        });
        if(response.ok){
            console.log(response);
            console.log('success');
            document.location.replace('/profile');
            
        } else{
            alert(response.statusText);
        }
    }
};



document.querySelector('#btn').addEventListener('submit', patientAppHandler);
// document.querySelector('#up-date-btn').addEventListener('submit', patientCommnetHandler);