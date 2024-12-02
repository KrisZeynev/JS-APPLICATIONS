export function showNavigation() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userNav = document.querySelector('#user');
    const guestNav = document.querySelector('#guest');
    const nameSpan = document.querySelector('.email span');

    
    if (user) {
        userNav.style.display = 'inline';
        guestNav.style.display = 'none';
        nameSpan.textContent = user.email;
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline';
        nameSpan.textContent = 'guest';
    }
}

export function showContent(section) {
    const mainEl = document.querySelector("main");
    let sectionsToHide = ['#register-view', '#login-view', '#home-view'];

    if (section) {
        mainEl.appendChild(document.querySelector(section));
        sectionsToHide = sectionsToHide.filter(x => x != section)
        // console.log(sectionsToHide);
        
    } else {
        mainEl.appendChild(document.querySelector("#home-view"));
        sectionsToHide = sectionsToHide.filter(x => x != '#home-view')
    }

    sectionsToHide.forEach(section => document.querySelector(section).style.display = 'none')
}