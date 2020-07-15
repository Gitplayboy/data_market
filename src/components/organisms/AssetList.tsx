import AssetTeaser from '../molecules/AssetTeaser'
import React from 'react'
import { QueryResult } from '@oceanprotocol/lib/dist/node/metadatastore/MetadataStore'
import Pagination from '../molecules/Pagination'
import { updateQueryStringParameter } from '../../utils'
import styles from './AssetList.module.css'
import { MetaDataMarket } from '../../@types/MetaData'
import { DDO } from '@oceanprotocol/lib'
import { oceanConfig } from '../../../app.config'

declare type AssetListProps = {
  queryResult: QueryResult
}

const AssetList: React.FC<AssetListProps> = ({ queryResult }) => {
  // TODO: restore Pagination behavior

  // Construct the urls on the pagination links. This is only for UX,
  // since the links are no <Link> they will not work by itself.
  // function hrefBuilder(pageIndex: number) {
  //   const newUrl = updateQueryStringParameter(
  //     router.asPath,
  //     'page',
  //     `${pageIndex}`
  //   )
  //   return newUrl
  // }

  // // This is what iniitates a new search with new `page`
  // // url parameter
  // function onPageChange(selected: number) {
  //   const newUrl = updateQueryStringParameter(
  //     router.asPath,
  //     'page',
  //     `${selected + 1}`
  //   )
  //   return router.push(newUrl)
  // }

  return (
    <>
      <div className={styles.assetList}>
        {queryResult && queryResult.totalResults > 0 ? (
          queryResult.results.map((ddo: DDO) => {
            const { attributes }: MetaDataMarket = new DDO(
              ddo
            ).findServiceByType('metadata')

            return (
              <AssetTeaser did={ddo.id} metadata={attributes} key={ddo.id} />
            )
          })
        ) : (
          <div className={styles.empty}>
            No data sets found in {oceanConfig.metadataStoreUri}
          </div>
        )}
      </div>
      {/* <Pagination
        totalPages={queryResult.totalPages}
        currentPage={queryResult.page}
        hrefBuilder={hrefBuilder}
        onPageChange={onPageChange}
      /> */}
    </>
  )
}

export default AssetList
