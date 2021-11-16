import Button from '@shared/atoms/Button'
import { InputProps } from '@shared/FormInput'
import { generateNftOptions } from '@utils/nft'
import { useField } from 'formik'
import React, { ReactElement, useEffect } from 'react'
import Refresh from '@images/refresh.svg'
import styles from './index.module.css'

export default function Nft(props: InputProps): ReactElement {
  const [field, meta, helpers] = useField(props.name)

  // Generate on first mount
  useEffect(() => {
    if (field.value?.name !== '') return

    const nftOptions = generateNftOptions()
    helpers.setValue({ ...nftOptions })
  }, [field.value?.name])

  return (
    <div className={styles.nft}>
      <figure className={styles.image}>
        <img src={field?.value?.image} width="128" height="128" />
        <Button
          style="text"
          size="small"
          className={styles.refresh}
          title="Generate new image"
          onClick={(e) => {
            e.preventDefault()
            const nftOptions = generateNftOptions()
            helpers.setValue({ ...nftOptions })
          }}
        >
          <Refresh />
        </Button>
      </figure>

      <div className={styles.token}>
        <strong>{field?.value?.name}</strong> —{' '}
        <strong>{field?.value?.symbol}</strong>
        <br />
        {field?.value?.description}
      </div>
    </div>
  )
}
