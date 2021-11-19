async function patientCommnetHandler() {
    const p_doc_comment = document.querySelector('#doc-comment').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(p_doc_comment)
      console.log(id)
    if (p_doc_comment && id) {
        const response = await fetch('/api/patient/:id', {
            method: 'PUT',
            body:JSON.stringify({
                p_doc_comment
            }),
            headers: {'Content-Type':'application/json'}
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

document.querySelector('#update-btn').addEventListener('click', patientCommnetHandler);