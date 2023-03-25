import {TbBrandDocker, TbBrandWechat} from "react-icons/tb";
import {SiAdguard} from "react-icons/si";

const projectList = [
    {
        icon: <TbBrandWechat/>,
        name: "wechat-chatgpt",
        description: "Use ChatGPT On Wechat via wechaty.",
        link: "https://github.com/fuergaosi233/wechat-chatgpt"
    },
    {
        icon: <TbBrandDocker/>,
        name: "Profile",
        description: "Self-use Profile.",
        link: "https://github.com/RealTong/Profile"
    },
    {
        icon: <SiAdguard/>,
        name: "streaming-unlock",
        description: "Break through streaming restrictions.",
        link: "https://github.com/RealTong/streaming-unlock"
    }
]

function Projects() {
    return (
        <div>
            <p className={"my-4 text-3xl font-bold"}>Projects</p>
            <div className={"grid gap-4 grid-cols-1 sm:grid-cols-2"}>
                {
                    projectList.map((project, index) => {
                        return (
                            <Project
                                key={index}
                                icon={project.icon}
                                name={project.name}
                                description={project.description}
                                link={project.link}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

function Project({icon, name, description, link},key) {
    return (
        <a href={link}
           target={"_blank"}
           key={key}
           className={"flex px-4 py-3 min-w-min rounded-md bg-gray-50 transition-colors decoration-none hover:bg-gray-100 dark:bg-gray-50/10 dark:hover:bg-gray-50/20"}
        >
            <div className={"flex items-center justify-center"}>
                <div className={"mr-4 text-4xl"}>{icon}</div>
                <div className={"flex-1"}>
                    <p className={"font-medium leading-relaxed"}>{name}</p>
                    <p className={" op-50 font-normal text-sm"}>{description}</p>
                </div>
            </div>
        </a>
    )
}

export default Projects;