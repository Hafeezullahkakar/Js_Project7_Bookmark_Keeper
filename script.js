const modal = document.getElementById('model')
const modelShow = document.getElementById('add-to-bookmark')
const modelClose = document.getElementById('close-model')
const bookMarkForm = document.getElementById('form')
const websiteName = document.getElementById('website-name')
const websiteUrl  = document.getElementById('website-url')
const bookmarkContainer= document.getElementById('bookmarks-container')


// Bookmarks Array
let bookmarks = [];
// Show Model & close modal
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
       return true;
        }
    if(!urlVal.match(regex)){
        alert("Please provid proper url!")
        return false; 
    }
    return true


}

// Fetch locally sotored bookmarks 
function fetchBookmarks(){
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }
    else{
        //create bookmarks arrya
        bookmarks = [{
            name: 'Prisma Insigth',
            url: 'https://parismainsights.tect'
        }]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    buildBookmark();
}

//Delete Bookmark
function deleteBookmark(url){
    bookmarks.forEach((bookmark,index)=>{
        if(bookmark.url === url){
            bookmarks.splice(index, 1); 
        }
    })
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks();
    bookMarkForm.reset();  

}
//Build Bookmark DOM
function buildBookmark(){
    //Remove bookmarks
bookmarkContainer.textContent = ''
 //Build items
 bookmarks.forEach((bookmark)=>{
    const {name, url} = bookmark;
    //Create item element
    const item = document.createElement('div')
    item.classList.add('item')
    //Close icon
    const closeIcon = document.createElement('i')
    closeIcon.classList.add('fas', 'fa-times-circle')
    closeIcon.setAttribute('title', 'Delete Bookmark')
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`)
    //Creating link elements
    const link = document.createElement('a')
    link.setAttribute('href', `${url}`)
    link.setAttribute('target', '_blank')
    link.textContent = name;    
    //Appending bookmarks
    item.append(link, closeIcon)
    bookmarkContainer.appendChild(item)        
    })
}

//Storing Bookmarks in local Storage
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
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    fetchBookmarks()
    bookMarkForm.reset();    
    websiteName.focus() 
}

bookMarkForm.addEventListener('submit', storeBookmark)

//on load fetch bookmarks
fetchBookmarks();