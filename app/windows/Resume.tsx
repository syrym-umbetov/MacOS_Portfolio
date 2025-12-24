'use client'

import WindowWrapper from '@/app/hoc/WindowWrapper'
import { WindowControls } from '@/app/components'
import { Download } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import PDFViewer with SSR disabled
const PDFViewer = dynamic(() => import('@/app/components/PDFViewer'), {
  ssr: false,
  loading: () => <div className='p-10 text-center'>Loading PDF viewer...</div>,
})

const Resume = () => {
  return (
    <>
      <div id='window-header'>
        <WindowControls target='resume' />
        <h2>Resume.pdf</h2>

        <a
          href='/files/resume.pdf'
          download
          className='cursor-pointer'
          title='Download resume'
        >
          <Download className='icon' />
        </a>
      </div>
      <PDFViewer file='/files/resume.pdf' />
    </>
  )
}

const ResumeWindow = WindowWrapper(Resume, 'resume')
export default ResumeWindow
