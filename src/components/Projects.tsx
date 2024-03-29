import Link from 'next/link'
import { ProjectProps } from '@/utils/types'
import { getDictionary } from '../locale/dictionaries'

const projectList: ProjectProps[] = [
  {
    icon: `i-simple-icons-wechat`,
    name: 'wechat-chatgpt',
    description: 'Use ChatGPT On Wechat via wechaty.',
    link: 'https://github.com/fuergaosi233/wechat-chatgpt',
  },
  {
    icon: 'i-simple-icons-unicode',
    name: 'unicode-search',
    description: 'Tool for search Nerd font unicode',
    link: 'https://github.com/RealTong/unicode-search',
  },
  {
    icon: 'i-simple-icons-docker',
    name: 'Profile',
    description: 'Self-use Profile.',
    link: 'https://github.com/RealTong/Profile',
  },
  {
    icon: 'i-simple-icons-adguard',
    name: 'streaming-unlock',
    description: 'Break through streaming restrictions.',
    link: 'https://github.com/RealTong/streaming-unlock',
  },
]

async function Projects() {
  const i18n = await getDictionary('en-US')
  return (
    <div>
      <p className={'my-4 text-3xl font-bold'}>{i18n.index.projects.title}</p>
      <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
        {projectList.map((project, index) => {
          return <Project key={index} icon={project.icon} name={project.name} description={project.description} link={project.link} />
        })}
      </div>
    </div>
  )
}

function Project({ icon, name, description, link }, key) {
  return (
    <Link
      href={link}
      target={'_blank'}
      key={key}
      className={
        'decoration-none flex min-w-min rounded-md bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100 dark:bg-gray-50/10 dark:hover:bg-gray-50/20'
      }
    >
      <div className={'flex items-center justify-center'}>
        <div className={`mr-4 text-4xl ${icon}`}></div>
        <div className={'flex-1'}>
          <p className={'font-medium leading-relaxed'}>{name}</p>
          <p className={' op-50 text-sm font-normal'}>{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default Projects
