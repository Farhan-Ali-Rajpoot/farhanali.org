const menuSwitch = document.getElementById('menu-switch');


export function ToggleMenu(e) {

    if (e.target.closest('#menu a')) {

        if (!menuSwitch) return false;
        menuSwitch.checked = false;

        return true;
    }

    return false;
}