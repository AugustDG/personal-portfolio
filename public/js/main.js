const headerClassList = document.querySelector('#header').classList;
const menuClassList = document.querySelector('#menu').classList;
const mobileMenuClassList = document.querySelector('#mobile-menu').classList;
const burger = document.querySelector('#burger');
const close = document.querySelectorAll('#close');

burger.addEventListener('click', () => requestAnimationFrame(openMobileMenu), false);

close.forEach((obj) => { obj.addEventListener('click', () => requestAnimationFrame(closeMobileMenu), false); });

window.addEventListener('scroll', () => requestAnimationFrame(updateHeader), false);

function openMobileMenu() {
    mobileMenuClassList.add('h-screen');
}

function closeMobileMenu() {
    mobileMenuClassList.remove('h-screen');
}

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