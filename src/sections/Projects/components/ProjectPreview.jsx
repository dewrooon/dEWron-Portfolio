import { useState } from 'react'

export default function ProjectPreview({ imageUrl, title }) {
  const [failedUrl, setFailedUrl] = useState(null)
  return (
    <div className="project-preview">
      {imageUrl && failedUrl !== imageUrl
        ? <img className="project-preview__image" src={imageUrl} alt={title} loading="lazy" onError={() => setFailedUrl(imageUrl)} />
        : <div className="project-preview__placeholder" aria-hidden="true"><span>&lt;/&gt;</span><p>{title}</p></div>}
    </div>
  )
}
