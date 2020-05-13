import AssetTeaser from '../molecules/AssetTeaser'
import React from 'react'
import { useRouter } from 'next/router'
import { QueryResult } from '@oceanprotocol/squid/dist/node/aquarius/Aquarius'
import shortid from 'shortid'
import Pagination from '../molecules/Pagination'
import { updateQueryStringParameter } from '../../utils'
import styles from './AssetList.module.css'

declare type AssetListProps = {
  queryResult: QueryResult
}

const AssetList: React.FC<AssetListProps> = ({ queryResult }) => {
  const router = useRouter()

  // Construct the urls on the pagination links. This is only for UX,
  // since the links are no <Link> they will not work by itself.
  function hrefBuilder(pageIndex: number) {
    const newUrl = updateQueryStringParameter(
      router.asPath,
      'page',
      `${pageIndex}`
    )
    return newUrl
  }

  // This is what iniitates a new search with new `page`
  // url parameter
  function onPageChange(selected: number) {
    const newUrl = updateQueryStringParameter(
      router.asPath,
      'page',
      `${selected + 1}`
    )
    return router.push(newUrl)
  }

  return (
    <>
      <div className={styles.assetList}>
        {queryResult.results &&
          queryResult.results.map(ddo => (
            <AssetTeaser ddo={ddo} key={shortid.generate()} />
          ))}
      </div>
      <Pagination
        totalPages={queryResult.totalPages}
        currentPage={queryResult.page}
        hrefBuilder={hrefBuilder}
        onPageChange={onPageChange}
      />
    </>
  )
}

export default AssetList