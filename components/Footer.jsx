import Link from "next/link";
import {CgDarkMode} from "react-icons/cg";
import {useI18n} from "../pages/_app";
import {useRouter} from "next/router";

function Footer() {
    const router = useRouter();
    const {locale, locales} = router
    const i18n = useI18n();

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
                <Link href="https://realtong.cn" className="underline">
                    Tong
                </Link>
                {` \u00A9 ${getYear()}`}. {i18n.footer.design_by}{' '}
                <Link href="https://ddiu.io/" className="hover:text-[#789388] underline">
                    ddiu.io
                </Link>
            </p>
            <div className={"flex flex-row-reverse w-full"}>
                <select value={locale} onChange={handleLanguageChange}
                        className={"block bg-transparent appearance-none px-4 rounded leading-tight focus:outline-none focus:shadow-outline cursor-pointer"}>
                    {
                        locales.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))
                    }
                </select>
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