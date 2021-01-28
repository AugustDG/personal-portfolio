const { disableBodyScroll, clearAllBodyScrollLocks, enableBodyScroll } = require('body-scroll-lock');
const $ = require('jquery-browserify');
require('jquery-mousewheel')($);

$(function loadCompleted() {
    $('#burger').on("click", () => requestAnimationFrame(openMobileMenu));

    $('#img-modal').on("click", (e) => closeModalImage(e));
    $('#img-grid').on("mousewheel", (e, d) => scrollImgGrid(e));
    $('[id=img-child]').each((i, obj) => $(obj).on("click", (e) => openModalImage(e)));

    $('[id=hotdog]').each((i, obj) => $(obj).on("click", () => requestAnimationFrame(closeMobileMenu)));

    $(window).on("scroll", () => requestAnimationFrame(updateHeaderBg));

    updateHeaderBg();
    activeUnderline();
})

function openMobileMenu() {
    $('#mobile-menu').addClass('h-screen');
}

function closeMobileMenu() {
    $('#mobile-menu').removeClass('h-screen');
}

function scrollImgGrid(e) {
    $(e.currentTarget).scrollLeft($(e.currentTarget).scrollLeft() - e.deltaY * 100);

    e.preventDefault();
}

function openModalImage(e) {
    var modal = $('#img-modal');
    modal.children().first().attr('src', $(e.target).attr('src'));
    modal.children().first().attr('alt', $(e.target).attr('alt'));
    disableBodyScroll(modal);
    modal.removeClass('pointer-events-none opacity-0');
    modal.addClass('pointer-events-auto opacity-100');
}

function closeModalImage(e) {
    if (e.target.id == "img-modal") {
        clearAllBodyScrollLocks();
        $(e.target).addClass('pointer-events-none opacity-0');
        $(e.target).removeClass('pointer-events-auto opacity-100');
    }
}

function updateHeaderBg() {
    if (document.location.pathname == "/") {
        if (window.pageYOffset > 0) {
            $('#header').removeClass('bg-transparent');
            $('#header').addClass('shadow-md bg-black-500');
        }
        else {
            $('#header').removeClass('shadow-md bg-black-500');
            $('#header').addClass('bg-transparent');
        }
    }
}

//underlines the active page
function activeUnderline() {
    $('[id=header-line]').each((index, obj) => {
        if ($(obj).parent().attr("href") === window.location.pathname) {
            $(obj).addClass('w-full');
            $(obj).removeClass('w-0');
        }
        else {
            $(obj).removeClass('w-full');
            $(obj).addClass('w-0');
        }
    })
}
