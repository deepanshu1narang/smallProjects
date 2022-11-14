let dataBaseArray = JSON.parse(localStorage.getItem("dataRec"));
dataBaseArray.forEach( (data) => {
  localStorage.setItem("db", data);
});


function validName(str){
    return(
        /^[A-Za-z\s]*$/.test(str) && /[A-Za-z]/.test(str)
    );
}