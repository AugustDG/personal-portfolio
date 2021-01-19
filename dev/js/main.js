const headerClassList = document.querySelector('#header').classList;

var ticking = false;

function updateHeader() {
    // reset the tick so we can
    // capture the next onScroll

    if (window.pageYOffset > 0) {
        headerClassList.remove('bg-transparent');
        headerClassList.add('shadow-md', 'bg-black-500');
    }
    else {
        headerClassList.remove('shadow-md', 'bg-black-500');
        headerClassList.add('bg-transparent');
    }
}

//underlines the active page
document.querySelectorAll('#header-line').forEach((link) => {
    console.log(link)
    if (link.parentElement.getAttribute("href") === window.location.pathname) {
        link.classList.add('w-full');
        link.classList.remove('w-0');
    }
    else {
        link.classList.remove('w-full');
        link.classList.add('w-0');
    }
})

window.addEventListener('scroll', () => requestAnimationFrame(updateHeader), false);