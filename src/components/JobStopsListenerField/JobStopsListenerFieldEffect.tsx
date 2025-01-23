'use client'

import { Address } from '@/payload-types'
import { useAllFormFields, useField, useForm, useFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import { reduceFieldsToValues } from 'payload/shared'

interface JobStopsListenerFieldEffectProps {
  warehouse: Address
}

const JobStopsListenerFieldEffect = ({ warehouse }: JobStopsListenerFieldEffectProps) => {
  const [addedInitialRow, setAddedInitialRow] = useState(false)
  const { addFieldRow } = useForm()
  /**
   * For some reason, `useForm()`'s `initializing` returns `true` before the entire form finishes rendering.
   * Using `useField()`'s `formInitializing` is more reliable, as it checks that the entire form has finished
   * rendering, instead of whether the renderer has finished rendering up to the listener field's position.
   *
   * Bug report: https://github.com/payloadcms/payload/issues/9263
   */
  const { formInitializing } = useField({
    path: '',
  })
  const a = useFormFields(([fields]) => fields.stops)
  console.log(a)
  const [fields] = useAllFormFields()
  const { stops } = reduceFieldsToValues(fields, true)

  useEffect(() => {
    // Don't run if form is still initializing
    if (formInitializing) {
      return
    }

    // Do nothing if the initial row has already been added
    if (addedInitialRow) {
      return
    }

    const inner = async () => {
      // `stops as unknown === 0` is a workaround for bug https://github.com/payloadcms/payload/issues/10712
      if ((stops as unknown) === 0 || stops?.length === 0) {
        // insert Warehouse as the first row, if no stops exist
        addFieldRow({
          subFieldState: {
            address: { initialValue: warehouse.id, value: warehouse.id, valid: true },
            contactNotes: {
              initialValue: warehouse.contactNotes,
              value: warehouse.contactNotes,
              valid: true,
            },
          },
          path: 'stops',
          schemaPath: 'stops',
        })
      }

      // Prevent the event from firing again after the initial row has been added
      setAddedInitialRow(true)
    }

    void inner()
  }, [warehouse, stops, addFieldRow, formInitializing, addedInitialRow])

  return <></>
}

export default JobStopsListenerFieldEffect
