import useWindowStore, { WindowKey } from '@/app/store/windows'

const WindowControls = ({ target }: { target: WindowKey }) => {
  const { closeWindow } = useWindowStore()
  return (
    <div id='window-controls'>
      <div className='close' onClick={() => closeWindow(target)} />
      <div className='minimize' />
      <div className='maximize' />
    </div>
  )
}

export default WindowControls
