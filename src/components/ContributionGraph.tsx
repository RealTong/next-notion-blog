'use client'

import { useCallback, useEffect, useState } from 'react'
import GitHubCalendar from 'react-github-calendar'
import { GitHubUsername } from '../utils/consts'

function GetContributionGraph() {
  const [graphSize, setGraphSize] = useState<'small' | 'medium' | 'large'>()

  useEffect(() => {
    function handleWindowsWidthChange() {
      if (window.innerWidth < 512) {
        setGraphSize('small')
      } else if (window.innerWidth < 672) {
        setGraphSize('medium')
      } else {
        setGraphSize('large')
      }
    }

    window.addEventListener('resize', handleWindowsWidthChange)
    // useEffect 卸载函数
    return () => window.removeEventListener('resize', handleWindowsWidthChange)
  }, [])

  const transformData = useCallback(
    (contributions) => {
      const currentYear = new Date().getFullYear()
      const currentMonth = new Date().getMonth()
      let data = []
      switch (graphSize) {
        case 'small':
          // 最近 2 个月
          data = contributions.slice(-60)
          break
        case 'medium':
          // 最近 6 个月
          data = contributions.slice(-180)
          break
        case 'large':
          // 最近 1 年
          data = contributions.slice(-365)
          break
        default:
          // 全部
          data = contributions
          break
      }
      return data
    },
    [graphSize]
  )

  return (
    <div className={'w-full flex justify-center p-2'}>
      <GitHubCalendar
        username={GitHubUsername}
        transformData={transformData}
        hideColorLegend={true}
        hideMonthLabels={true}
        hideTotalCount={true}
        weekStart={1}
      ></GitHubCalendar>
    </div>
  )
}

export default GetContributionGraph
