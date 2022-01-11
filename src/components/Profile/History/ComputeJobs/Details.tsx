import React, { ReactElement, useEffect, useState } from 'react'
import Time from '@shared/atoms/Time'
import Button from '@shared/atoms/Button'
import Modal from '@shared/atoms/Modal'
import External from '@images/external.svg'
import { retrieveDDO } from '@utils/aquarius'
import Results from './Results'
import styles from './Details.module.css'
import { useCancelToken } from '@hooks/useCancelToken'
import { useSiteMetadata } from '@hooks/useSiteMetadata'
import MetaItem from '../../../Asset/AssetContent/MetaItem'

function Asset({
  title,
  symbol,
  did
}: {
  title: string
  symbol: string
  did: string
}) {
  return (
    <div className={styles.asset}>
      <h3 className={styles.assetTitle}>
        {title}{' '}
        <a
          className={styles.assetLink}
          href={`/asset/${did}`}
          target="_blank"
          rel="noreferrer"
        >
          <External />
        </a>
      </h3>
      <p className={styles.assetMeta}>
        {symbol} | <code>{did}</code>
      </p>
    </div>
  )
}

function DetailsAssets({ job }: { job: ComputeJobMetaData }) {
  const { appConfig } = useSiteMetadata()
  const [algoName, setAlgoName] = useState<string>()
  const [algoDtSymbol, setAlgoDtSymbol] = useState<string>()
  const newCancelToken = useCancelToken()
  useEffect(() => {
    async function getAlgoMetadata() {
      const ddo = await retrieveDDO(job.algoDID, newCancelToken())
      setAlgoDtSymbol(ddo.datatokens[0].symbol)
      setAlgoName(ddo?.metadata.name)
    }
    getAlgoMetadata()
  }, [appConfig.metadataCacheUri, job.algoDID])

  return (
    <>
      <Asset
        title={job.assetName}
        symbol={job.assetDtSymbol}
        did={job.inputDID[0]}
      />
      <Asset title={algoName} symbol={algoDtSymbol} did={job.algoDID} />
    </>
  )
}

export default function Details({
  job
}: {
  job: ComputeJobMetaData
}): ReactElement {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Button style="text" size="small" onClick={() => setIsDialogOpen(true)}>
        Show Details
      </Button>
      <Modal
        title={job.statusText}
        isOpen={isDialogOpen}
        onToggleModal={() => setIsDialogOpen(false)}
      >
        <DetailsAssets job={job} />
        <Results job={job} />

        <div className={styles.meta}>
          <MetaItem
            title="Created"
            content={<Time date={job.dateCreated} isUnix relative />}
          />
          {job.dateFinished && (
            <MetaItem
              title="Finished"
              content={<Time date={job.dateFinished} isUnix relative />}
            />
          )}
          <MetaItem title="Job ID" content={<code>{job.jobId}</code>} />
          {/* {job.resultsDid && (
            <MetaItem
              title="Published Results DID"
              content={<code>{job.resultsDid}</code>}
            />
          )} */}
        </div>
      </Modal>
    </>
  )
}
