import { AiOutlineArrowRight } from 'react-icons/ai'
import { useCallback, useState } from 'react'

async function auth(password) {
  const response = await fetch('/api/protection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
    }),
  })
  if (response.status === 200) {
    localStorage.setItem('auth', 'true')
    return true
  } else {
    return false
  }
}

function Protection() {
  const [password, setPassword] = useState('')

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleAuth = useCallback(async () => {
    const result = await auth(password)
    console.log('result: ', result)
    if (result) {
      window.location.href = '/'
    } else {
      alert('Wrong password!')
    }
  }, [password])

  return (
    <div className={'flex h-screen max-h-screen w-full items-center justify-center'}>
      <div className={'max-w-fit text-center'}>
        <p className={'text-2xl text-gray-500'}>Access is limited! </p>
        <div className={'relative mt-4 h-10 w-full'}>
          <input
            className={'h-full w-full bg-gray-100 pl-2 outline-0 focus:border-0 focus:bg-gray-200'}
            type="password"
            alt={'password input'}
            onChange={handlePassword}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAuth()
              }
            }}
          />
          <button className={'absolute top-0 right-0 flex h-full w-10 items-center justify-center text-xl hover:bg-gray-300'} onClick={handleAuth}>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Protection
