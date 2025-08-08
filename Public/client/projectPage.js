const dropdownBtn = document.querySelector('.dropdown-btn');



// show the nav dropdown
dropdownBtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
});



// close the nav dropdown 
window.addEventListener('click', (event) => {
    if (!event.target.matches('.dropdown-btn')) {
    if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
    }
    }
});