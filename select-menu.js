function menu_setup() {
    const menu_link_ele = menu_ele.querySelectorAll("a");

    const add_classes = [
        "underline",
        "hover:text-blue-300",
        "hover:text-2xl",
        "mr-1"
    ];

    for (let link_ele of menu_link_ele) {
        for (let addClass of add_classes) {
            link_ele.classList.add(addClass);
        }
    }
};