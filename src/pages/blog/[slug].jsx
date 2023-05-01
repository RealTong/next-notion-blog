import { getBlocks, getPage, getPosts } from '../../lib/notion'
import Copyright from '../../components/blog/Copyright'
import NotionRenderer from '../../components/blog/NotionRenderer'
import probeImageSize from '../../lib/imaging'
import Header from '../../components/blog/Header'
import Footer from '../../components/Footer'
import { highlight } from '../../lib/shiki'
import Head from 'next/head'

function Post(props) {
  const host = 'realtong.cn'
  const page = props.page
  if (!page) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>{page.properties.name.title[0].plain_text}</title>
      </Head>
      <Header />
      <div className={'debug w-full p-6 dark:bg-[#212121] dark:text-gray-300'}>
        <main className={'mx-auto border p-3 md:max-w-3xl'}>
          <div>
            <h1 className={'text-3xl font-bold'}>{page.properties.name.title[0].plain_text}</h1>
          </div>
          <div>
            {props.blocks.map((block) => {
              return (
                <div className={'my-3'} key={block.id}>
                  <NotionRenderer block={block} />
                </div>
              )
            })}
            <Copyright link={`https://${host}/blog/${page.properties.slug.rich_text[0].text.content}`} page={page} />
          </div>
          <div className={'flex h-full w-full min-w-0 flex-col justify-between bg-[#FFF] p-6 dark:bg-[#212121] dark:text-gray-300'}></div>
          <Footer />
        </main>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const db = await getPosts()
  return {
    paths: db.map((p) => ({
      params: { slug: p.properties.slug.rich_text[0].text.content },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const supportLang = [
    'abap',
    'actionscript-3',
    'ada',
    'apache',
    'apex',
    'apl',
    'applescript',
    'ara',
    'asm',
    'astro',
    'awk',
    'ballerina',
    'bat',
    'batch',
    'berry',
    'be',
    'bibtex',
    'bicep',
    'blade',
    'c',
    'cadence',
    'cdc',
    'clarity',
    'clojure',
    'clj',
    'cmake',
    'cobol',
    'codeql',
    'ql',
    'coffee',
    'cpp',
    'crystal',
    'csharp',
    'c#',
    'cs',
    'css',
    'cue',
    'd',
    'dart',
    'dax',
    'diff',
    'docker',
    'dream-maker',
    'elixir',
    'elm',
    'erb',
    'erlang',
    'erl',
    'fish',
    'fsharp',
    'f#',
    'fs',
    'gherkin',
    'git-commit',
    'git-rebase',
    'glsl',
    'gnuplot',
    'go',
    'graphql',
    'groovy',
    'hack',
    'haml',
    'handlebars',
    'hbs',
    'haskell',
    'hs',
    'hcl',
    'hlsl',
    'html',
    'http',
    'imba',
    'ini',
    'properties',
    'java',
    'javascript',
    'js',
    'jinja-html',
    'jison',
    'json',
    'json5',
    'jsonc',
    'jsonnet',
    'jssm',
    'fsl',
    'jsx',
    'julia',
    'kotlin',
    'latex',
    'less',
    'liquid',
    'lisp',
    'logo',
    'lua',
    'make',
    'makefile',
    'markdown',
    'md',
    'marko',
    'matlab',
    'mdx',
    'mermaid',
    'nginx',
    'nim',
    'nix',
    'objective-c',
    'objc',
    'objective-cpp',
    'ocaml',
    'pascal',
    'perl',
    'php',
    'plsql',
    'postcss',
    'powerquery',
    'powershell',
    'ps',
    'ps1',
    'prisma',
    'prolog',
    'proto',
    'pug',
    'jade',
    'puppet',
    'purescript',
    'python',
    'py',
    'r',
    'raku',
    'perl6',
    'razor',
    'rel',
    'riscv',
    'rst',
    'ruby',
    'rb',
    'rust',
    'rs',
    'sas',
    'sass',
    'scala',
    'scheme',
    'scss',
    'shaderlab',
    'shader',
    'shellscript',
    'bash',
    'console',
    'sh',
    'shell',
    'zsh',
    'smalltalk',
    'solidity',
    'sparql',
    'sql',
    'ssh-config',
    'stata',
    'stylus',
    'styl',
    'svelte',
    'swift',
    'system-verilog',
    'tasl',
    'tcl',
    'tex',
    'toml',
    'tsx',
    'turtle',
    'twig',
    'typescript',
    'ts',
    'v',
    'vb',
    'cmd',
    'verilog',
    'vhdl',
    'viml',
    'vim',
    'vimscript',
    'vue-html',
    'vue',
    'wasm',
    'wenyan',
    '文言',
    'wgsl',
    'xml',
    'xsl',
    'yaml',
    'yml',
    'zenscript',
  ]
  const slug = params.slug
  const database = await getPosts(slug)
  const post = database[0]
  const page = await getPage(post.id) //bug?
  const blocks = await getBlocks(post.id) //bug?
  // 探测图片尺寸
  await Promise.all(
    blocks
      .filter((block) => block.type === 'image')
      .map(async (block) => {
        const { type } = block
        const value = block[type]
        const src = value.type === 'external' ? value.external.url : value.file.url

        const { width, height } = await probeImageSize(src)
        value['dim'] = { width, height }
        block[type] = value
      })
  )
  // 渲染Code block
  await Promise.all(
    blocks
      .filter((block) => block.type === 'code')
      .map(async (block) => {
        const { type } = block
        const value = block[type]
        value['dom'] = await highlight(value.rich_text[0].plain_text, 'github-dark', supportLang.includes(value.language) ? value.language : 'bash')
        block[type] = value
      })
  )
  return {
    props: {
      page,
      blocks,
    },
    revalidate: 60 * 60 * 24, // blog内容属于不易变更的内容, 一天更新一次(主要是写的垃圾也没人看)
  }
}

export default Post
