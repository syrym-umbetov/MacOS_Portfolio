import Image from 'next/image'
import logo from '@/public/images/logo.svg'
import { navIcons, navLinks } from '@/constants'
import useWindowStore, { WindowKey } from '@/app/store/windows'

export default function Navbar() {
  const { openWindow } = useWindowStore()
  return (
    <nav>
      <div>
        <Image src={logo} alt='logo' />
        <p className='font-bold'>Syrym&#39;s portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type as WindowKey)}>
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className='icon-hover' alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        <time>
          {new Date()
            .toLocaleString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
            .replace(/,/g, '')}
        </time>
      </div>
    </nav>
  )
}
