import {TbBrandDocker, TbBrandWechat} from "react-icons/tb";
import {SiAdguard} from "react-icons/si";

function Projects() {
    return (
        <div>
            <h1>Projects</h1>
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
    )
}

const projectList = [
    {
        icon: <TbBrandWechat/>,
        name: "wechat-chatgpt",
        description: "Use ChatGPT On Wechat via wechaty",
        link: "https://github.com/fuergaosi233/wechat-chatgpt"
    },
    {
        icon: <TbBrandDocker/>,
        name: "Profile",
        description: "Self-use Profile",
        link: "https://github.com/RealTong/Profile"
    },
    {
        icon: <TbBrandDocker/>,
        name: "Project 1",
        description: "This is a project",
        link: ""
    },
    {
        icon: <SiAdguard/>,
        name: "streaming-unlock",
        description: "Break through streaming restrictions with Adguard Home and Sniproxy",
        link: "https://github.com/RealTong/streaming-unlock"
    }
]
function Project({icon, name, description, link,key}){
    return (

        <a href={link} target={"_blank"}>
            <div key={key}>
                {icon}
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
        </a>
    )
}

export default Projects;