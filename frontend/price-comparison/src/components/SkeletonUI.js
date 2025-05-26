import React, { useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { UserContext } from '../App'
import './components-css/SkeletonUI.css'

export default function SkeletonUI({ count }) {
  const { theme, toggleTheme } = useContext(UserContext)

    return (
        Array(count)
        .fill(0)
        .map((item) => 
        
        <div className='skeleton-body'>
            <div className="skeleton-image">
                <Skeleton className='skeleton-img' baseColor={theme==='light' ? "" : "#333332"} highlightColor={theme==='light' ? "" : "#5c5b5a"} height={200} width={200} />
            </div>
            <div className="skeleton-name">
                <Skeleton className='skeleton-item' baseColor={theme==='light' ? "" : "#333332"} highlightColor={theme==='light' ? "" : "#5c5b5a"} height={30} width={500}/>
                <Skeleton className='skeleton-item' baseColor={theme==='light' ? "" : "#333332"} highlightColor={theme==='light' ? "" : "#5c5b5a"} height={30} width={500}/>
                <Skeleton className='skeleton-item' baseColor={theme==='light' ? "" : "#333332"} highlightColor={theme==='light' ? "" : "#5c5b5a"} height={30} width={500}/>
            </div>
            <div className="skeleton-details">

            </div>
        </div>
        )
    )
}
