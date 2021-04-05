const modal = document.getElementById('model')
const modelShow = document.getElementById('add-to-bookmark')
const modelClose = document.getElementById('close-model')
const bookMarkForm = document.getElementById('form')
const websiteName = document.getElementById('website-name')
const websiteUrl  = document.getElementById('website-url')
const bookmarkContainer= document.getElementById('model-container')


// Bookmarks Array
let bookmarks = [];
// Show Model

function showModel(){
    modal.classList.add('show-model')
    websiteName.focus();
}
function closeModel(){
    modal.classList.remove('show-model')
}
function closeModel1(event){
    if(event.target=== modal){
        modal.classList.remove('show-model')
    }
    else{
        return
    }

}
modelShow.addEventListener('click', showModel)
modelClose.addEventListener('click', closeModel)
window.addEventListener('click', closeModel1)

// Validate url
function Validate(nameVal, urlVal){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameVal || !urlVal){
        alert("Please submit values of both fields...!")
        return false;
    }
    if(urlVal.match(regex)){
        alert("match")
    }
    if(!urlVal.match(regex)){
        alert("Please provid proper url!")
        return false; 
    }
    return true


}

function storeBookmark(e){
    e.preventDefault();
    const webName =websiteName.value;
    let webUrl = websiteUrl.value;
    if(!webUrl.includes('http://', 'https://')){
        webUrl =   `https://${webUrl}`
    }
    console.log(webUrl, webName)
    if(!Validate(webName, webUrl)){
        return false;
    };
    const bookmark = {
        name: webName,
        url: webUrl
    }
    bookmarks.push(bookmark);
    console.log(bookmarks)
    bookMarkForm.reset();    
}

bookMarkForm.addEventListener('submit', storeBookmark)