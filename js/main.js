//global variable
var BookMarkName = document.getElementById("BookMarkName")
var BookMarkURL = document.getElementById("BookMarkURL")
var currentIndex
// console.log(BookMarkName , BookMarkURL );

var list =[]
if(JSON.parse(localStorage.getItem('list'))!=null){
    list=JSON.parse(localStorage.getItem('list'))
    display()
 }


//create
function addbookmark(){
 if(validationInput(BookMarkName ) && validationInput(BookMarkURL )){
    var singleBookmark={
        namee:BookMarkName.value,
        URL:BookMarkURL.value,
    }
    list.push(singleBookmark)
    localStorage.setItem('list' , JSON.stringify(list))
    clearInput()
    display()
 }else{
    document.getElementById('SubmitBtn').addEventListener("click" ,SubmitBtn() )
    
 }
}


//display data
function display(){
    var cartona =''
    for(var i = 0 ; i<list.length ; i++){
        cartona +=`  

        <tr>
            <td class="text-capitalize">${i+1}</td>
            <td class="text-capitalize">${list[i].namee}</td>
          
              <td>
               <button class="btn1  px-3 py-2 rounded-2 ">
                <a href="${list[i].URL}" target="_blank" >
                    <i class="fa-solid fa-eye"></i> 
                      Visit
                </a>
                </button>
            </td>
            <td>
                <button onclick="deletebookmark(${i})" class="btn2  px-3 py-2 rounded-2">
                    <i class="fa-solid fa-trash"></i> 
                        Delete
                </button>
            </td>
        </tr>`

        
    }
    document.getElementById("bodydata").innerHTML =cartona
}


//clear inputs
function clearInput(){
    BookMarkName.value = ''
    BookMarkURL.value = ''
    BookMarkName.classList.remove('is-valid')
    BookMarkURL.classList.remove('is-valid')
}


//delete
function deletebookmark(index){
    list.splice(index , 1)
    localStorage.setItem('list' , JSON.stringify(list))
    display()
}



function validationInput(element ){
    var text=element.value

    var regex={
        BookMarkName:/^[a-z0-9 _-]{3,15}$/i ,
        BookMarkURL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%\+.~#?&\/\/=]*)/,
    }

    if(regex[element.id].test(text)){
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
      
        return true

    }else{
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')

        return false
    }
}



function SubmitBtn(){
  Swal.fire({
  html: `
  <div class="circles d-flex gap-2 mb-3">
      <i class="fa-solid fa-circle text-danger"></i>
      <i class="fa-solid fa-circle text-warning"></i>
      <i class="fa-solid fa-circle text-success"></i>
</div>
<p class="fw-semibold fs-4 fw-bold text-start mb-3">
    Site Name or Url is not valid , please Follow The Rules below : 
</p>
<div>
    <p class="text-start"> <i class="fa-regular fa-circle-right p-2 text-danger"></i>
        Site name must contain at least 3 characters
    </p>
    <p class="text-start"> <i class="fa-regular fa-circle-right p-2 text-danger"></i>
        Site URL must be a valid one
    </p>
</div>`,
confirmButtonColor: "#ff5252",
  });
}