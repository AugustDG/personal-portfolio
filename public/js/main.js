$(function () {
    console.log('running! 4')
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = 'views/' + $(this).data('include') + '.html';
        $(this).load(file, loadCompleted);
    })
})

function loadCompleted(event, xhr, settings) {
    console.log('running! 3')
    $('#burger').on("click", () => requestAnimationFrame(openMobileMenu));

    $('#hotdog').each((index, obj) => { $(obj).on("click", () => requestAnimationFrame(closeMobileMenu)) });

    $(window).on("scroll", () => requestAnimationFrame(updateHeader));

    activeUnderline();
    updateHeader();
}



function openMobileMenu() {
    console.log('running! 2')
    $('#mobile-menu').addClass('h-screen');
}

function closeMobileMenu() {
    $('#mobile-menu').removeClass('h-screen');
}

function updateHeader() {
    console.log('running!')
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
    $('#header-line').each((index, obj) => {
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