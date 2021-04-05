const modal = document.getElementById('model')
const modelShow = document.getElementById('add-to-bookmark')
const modelClose = document.getElementById('close-model')
const bookMarkForm = document.getElementById('form')
const websiteName = document.getElementById('website-name')
const websiteUrl  = document.getElementById('website-url')
const bookmarkContainer= document.getElementById('model-container')

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