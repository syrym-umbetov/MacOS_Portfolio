import useWindowStore, { type WindowKey } from '@/app/store/windows'

interface WindowControlsProps {
  target: WindowKey
}

const WindowControls = ({ target }: WindowControlsProps) => {
  const { closeWindow } = useWindowStore()

  const handleClose = () => {
    closeWindow(target)
  }

  return (
    <div id='window-controls'>
      <button
        type='button'
        className='close'
        onClick={handleClose}
        aria-label='Close window'
        title='Close'
      />
      <button
        type='button'
        className='minimize'
        aria-label='Minimize window'
        title='Minimize'
        disabled
      />
      <button
        type='button'
        className='maximize'
        aria-label='Maximize window'
        title='Maximize'
        disabled
      />
    </div>
  )
}

export default WindowControls
