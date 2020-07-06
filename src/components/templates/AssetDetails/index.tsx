import React, { useState, ReactElement, useEffect } from 'react'
import { Aquarius, Logger } from '@oceanprotocol/squid'
import { PageProps } from 'gatsby'
import { config } from '../../../config/ocean'
import Layout from '../../../components/Layout'
import { MetaDataMarket, ServiceMetaDataMarket } from '../../../@types/MetaData'
import { Alert } from '../../atoms/Alert'
import AssetContent from './AssetContent'

export default function AssetDetailsTemplate(props: PageProps): ReactElement {
  const [metadata, setMetadata] = useState<MetaDataMarket>()
  const [title, setTitle] = useState<string>()
  const [error, setError] = useState<string>()

  const { did } = props.pageContext as { did: string }

  useEffect(() => {
    async function init() {
      try {
        const aquarius = new Aquarius(config.aquariusUri, Logger)
        const ddo = await aquarius.retrieveDDO(did)

        if (!ddo) {
          setTitle('Could not retrieve asset')
          setError('The DDO was not found in Aquarius.')
          return
        }

        const { attributes }: ServiceMetaDataMarket = ddo.findServiceByType(
          'metadata'
        )

        setTitle(attributes.main.name)
        console.log(attributes)
        setMetadata(attributes)
      } catch (error) {
        setTitle('Error retrieving asset')
        setError(error.message)
      }
    }
    init()
  }, [])

  return error ? (
    <Layout title={title} noPageHeader uri={props.path}>
      <Alert title={title} text={error} state="error" />
    </Layout>
  ) : did && metadata ? (
    <Layout title={title} uri={props.path}>
      <AssetContent did={did} metadata={metadata} />
    </Layout>
  ) : null
}
