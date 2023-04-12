import {CgDarkMode} from "react-icons/cg";

function Footer() {
    const i18n = {
            "index": {
                "header": {
                    "title": "Header",
                    "hello": "Hello",
                    "description": "I'm Tong.",
                    "identity": "\uD83C\uDF92 Student / \uD83D\uDCBB Web Developer",
                    "hobby": "I like making interesting projects."
                },
                "activity": {
                    "title": "Activity"
                },
                "projects": {
                    "title": "Projects"
                },
                "latestPosts": {
                    "title": "Latest Posts"
                }
            },
            "footer": {
                "copyright": "Copyright",
                "design_by": "Design by"
            }
        }
    ;

    function handleLanguageChange(e) {
        const lang = e.target.value;
        console.log(lang)
        router.push(router.asPath, router.asPath, {locale: lang})


    }

    const toggleTheme = () => {
        const html = document.querySelector("html");
        html.classList.toggle("dark");
    }
    return (
        <footer className={"flex mt-10"}>
            <p className={`w-full text-left`}>
                {i18n.footer.copyright}{' '}
                <a href="https://realtong.cn" className="underline">
                    Tong
                </a>
                {` \u00A9 ${getYear()}`}. {i18n.footer.design_by}{' '}
                <a href="https://ddiu.io/" className="hover:text-[#789388] underline">
                    ddiu.io
                </a>
            </p>
            <div className={"flex flex-row-reverse w-full"}>
                {/*<select value={locale} onChange={handleLanguageChange}*/}
                {/*        className={"block bg-transparent appearance-none px-4 rounded leading-tight focus:outline-none focus:shadow-outline cursor-pointer"}>*/}
                {/*    {*/}
                {/*        locales.map((lang) => (*/}
                {/*            <option key={lang} value={lang}>*/}
                {/*                {lang}*/}
                {/*            </option>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</select>*/}
            </div>
            <button className={"text-2xl border-gray-300 p-2 rounded leading-tight"} onClick={toggleTheme} aria-label={"主题切换器"}>
                <CgDarkMode/>
            </button>
        </footer>
    )
}

function getYear() {
    return new Date().getFullYear();
}

export default Footer;