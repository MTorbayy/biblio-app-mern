import { useEffect, useState } from 'react'

export default function Flash() {
    let [visibility, setVisibility] = useState(false)
    let [message, setMessage] = useState('')
    let [type, setType] = useState('')


  return (
    visibility && <div class="alert alert-dismissible alert-primary mt-3">
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button> {message}
  </div>
  )
}
