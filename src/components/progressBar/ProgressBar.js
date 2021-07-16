import React, { useEffect } from 'react'
import useStorage from '../../hooks/useStorage'

import './progressBar.css'

const ProgressBar = ({ file, setFile, setUrl, partSelected }) => {

    const { url, progress } = useStorage(file, partSelected)

    useEffect(() => {
        if(url) {
            setFile(null)
            setUrl(url)
        } 
    }, [url, setFile, setUrl])

    return (
        <div className="progress-bar" style={{ width: progress + '%' }}></div>
    )
}

export default ProgressBar;
