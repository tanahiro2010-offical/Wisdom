const title_ele = document.querySelector("#title");
const menu_ele = document.querySelector("#select-menu");
const phrase_ele = document.querySelector("#phrase");
const description_ele = document.querySelector("#description");
const load_screen_ele = document.querySelector("#load-screen");
const main_screen_ele = document.querySelector("#main-screen");

(() => {
    const host = location.host;
    const url = "//" + host + "/_api/config.json";
    console.log(url);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onloadend = (() => {
        const res = xhr.responseText;
        console.log(res);
        let config;

        try {
            config = JSON.parse(res);
        } catch {
            document.body.innerHTML = "<h1 class='text-center text-3xl mt-10'>APIがうまく機能していない可能性があります<br>5秒後にリロードします</h1>";
            sleep(5000);
            location.reload();
        }
        console.log(config);

        // ロード画面を映している間にサイトの情報を書き込む
        (() => { // タイトルを書き込み
            const title_config = config['title'];
            const title_link_ele = title_ele.querySelector("a");
            title_link_ele.innerText = title_config['innerText'];
            title_link_ele.href = title_config['link'];
            
            for (let className of title_config['style']) {
                title_ele.classList.add(className);
            }
        })();

        (()=> { // メニューを書き込み
            const menu_config = config['menu'];
            
            for (let menu_obj of menu_config) {
                const text = Object.keys(menu_obj)[0];
                const link = menu_obj[text];
                console.log(text + " : " + link);

                const link_ele = document.createElement('a');
                link_ele.innerText = text;
                link_ele.href = link;
                
                menu_ele.appendChild(link_ele);
            }
        })();

        menu_setup();

        // ロード画面を消し、メインスクリーンを表示させる
        load_screen_ele.classList.remove("flex");
        load_screen_ele.classList.add("hidden");

        main_screen_ele.classList.remove("hidden");
    });
})();
