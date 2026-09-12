



const hamIcon = document.querySelector('.hamburger-icon');
const menuSwitch = document.getElementById('menu-switch');

export function MenuFeature(scrollY) {

    if (!hamIcon || !menuSwitch) return;

    const scrollThreshold = 80;

    if (scrollY > scrollThreshold) {
        hamIcon.classList.add('is-visible');
    } else {
        hamIcon.classList.remove('is-visible');

        if (menuSwitch.checked) {
            menuSwitch.checked = false;
        }
    }
}
