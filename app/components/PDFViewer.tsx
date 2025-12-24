'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

interface PDFViewerProps {
  file: string
}

const PDFViewer = ({ file }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [mounted, setMounted] = useState(false)
  const [ReactPDF, setReactPDF] = useState<any>(null)

  useEffect(() => {
    setMounted(true)

    // Dynamically import react-pdf only on client
    const loadPDF = async () => {
      const pdfjs = await import('react-pdf')

      // Configure worker
      pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.pdfjs.version}/build/pdf.worker.min.mjs`

      setReactPDF({
        Document: pdfjs.Document,
        Page: pdfjs.Page,
        version: pdfjs.pdfjs.version,
      })
    }

    loadPDF()
  }, [])

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages)
    },
    []
  )

  // Memoize options to prevent unnecessary reloads
  const pdfOptions = useMemo(() => {
    if (!ReactPDF) return undefined
    return {
      cMapUrl: `https://unpkg.com/pdfjs-dist@${ReactPDF.version}/cmaps/`,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${ReactPDF.version}/standard_fonts/`,
    }
  }, [ReactPDF])

  if (!mounted || !ReactPDF) {
    return <div className='p-10 text-center'>Loading PDF viewer...</div>
  }

  const { Document, Page } = ReactPDF

  return (
    <div className='overflow-auto max-h-[70vh] bg-white'>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className='p-10 text-center'>Loading PDF...</div>}
        error={
          <div className='p-10 text-center text-red-500'>
            Failed to load PDF
          </div>
        }
        options={pdfOptions}
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className='mx-auto'
        />
      </Document>
    </div>
  )
}

export default PDFViewer
