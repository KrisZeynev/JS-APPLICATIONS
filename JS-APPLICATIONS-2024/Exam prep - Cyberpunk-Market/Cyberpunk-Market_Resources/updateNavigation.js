export function updateNavigation() {
    if (localStorage.getItem('email')) {
        document.querySelector('div.user').style.display = 'inline-block'
        document.querySelector('div.guest').style.display = 'none'
    } else {
        document.querySelector('div.user').style.display = 'none'
        document.querySelector('div.guest').style.display = 'inline-block'
    }
}