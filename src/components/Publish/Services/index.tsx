import Input from '@shared/Form/Input'
import { Field, useFormikContext } from 'formik'
import React, { ReactElement, useEffect } from 'react'
import IconDownload from '@images/download.svg'
import IconCompute from '@images/compute.svg'
import content from '../../../../content/publish/form.json'
import { getFieldContent } from '../_utils'
import { FormPublishData } from '../_types'

const accessTypeOptionsTitles = getFieldContent(
  'access',
  content.services.fields
).options

const accessTypeOptions = [
  {
    name: accessTypeOptionsTitles[0].toLowerCase(),
    title: accessTypeOptionsTitles[0],
    icon: <IconDownload />
  },
  {
    name: accessTypeOptionsTitles[1].toLowerCase(),
    title: accessTypeOptionsTitles[1],
    icon: <IconCompute />
  }
]

export default function ServicesFields(): ReactElement {
  // connect with Form state, use for conditional field rendering
  const { values, setFieldValue } = useFormikContext<FormPublishData>()

  // Auto-change access type based on algo privacy boolean.
  // Could be also done later in transformPublishFormToDdo().
  useEffect(() => {
    setFieldValue(
      'services[0].access',
      values.services[0].algorithmPrivacy === true ? 'compute' : 'download'
    )
  }, [values.services[0].algorithmPrivacy])

  return (
    <>
      {values.metadata.type === 'algorithm' ? (
        <Field
          {...getFieldContent('algorithmPrivacy', content.services.fields)}
          component={Input}
          name="services[0].algorithmPrivacy"
        />
      ) : (
        <Field
          {...getFieldContent('access', content.services.fields)}
          component={Input}
          name="services[0].access"
          options={accessTypeOptions}
        />
      )}
      <Field
        {...getFieldContent('dataTokenOptions', content.services.fields)}
        component={Input}
        name="services[0].dataTokenOptions"
      />
      <Field
        {...getFieldContent('providerUrl', content.services.fields)}
        component={Input}
        name="services[0].providerUrl"
      />
      <Field
        {...getFieldContent('files', content.services.fields)}
        component={Input}
        name="services[0].files"
      />
      <Field
        {...getFieldContent('links', content.services.fields)}
        component={Input}
        name="services[0].links"
      />
      <Field
        {...getFieldContent('timeout', content.services.fields)}
        component={Input}
        name="services[0].timeout"
      />
    </>
  )
}
