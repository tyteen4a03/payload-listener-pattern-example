'use client'

import { useAllFormFields, useField } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import { reduceFieldsToValues } from 'payload/shared'

const JobStopsLastStopListenerField = () => {
  const [previousLastStopId, setPreviousLastStopId] = useState('')

  const [fields, dispatchFields] = useAllFormFields()
  const { stops, lastStopContactName } = reduceFieldsToValues(fields, true)
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

  useEffect(() => {
    // Don't run if form is still initializing
    if (formInitializing) {
      return () => {}
    }

    // Why we need this variable: https://devtrium.com/posts/async-functions-useeffect#note-on-fetching-data-inside-useeffect
    let inflight = true

    const dispatchNewValue = (value: string) => {
      // Prevent infinite loops
      if (lastStopContactName !== value) {
        dispatchFields({
          type: 'UPDATE',
          path: 'lastStopContactName',
          value,
        })
      }
    }

    const inner = async () => {
      // `stops as unknown === 0` is a workaround for bug https://github.com/payloadcms/payload/issues/10712
      if (!stops || (stops as unknown) === 0 || stops?.length === 0) {
        // Emit a default value
        dispatchNewValue('Nobody')
        return
      }

      const lastStop = stops[stops.length - 1]
      if (!lastStop.address) {
        // they haven't filled out the address dropdown yet
        return
      }

      if (lastStop.address === previousLastStopId) {
        // Prevent infinite loops
        return
      }

      // Other sanity checks omitted for brevity - also you should be using SWR or TanStack Query to manage this API call
      const results = await (
        await fetch(`/api/addresses?where[id][equals]=${lastStop.address as string}`)
      ).json()

      if (inflight) {
        dispatchNewValue(results.docs[0].contactName)
        setPreviousLastStopId(lastStop.address as string)
      }
    }

    void inner()

    return () => {
      inflight = false
    }
  }, [stops, lastStopContactName, formInitializing, previousLastStopId, dispatchFields])

  return <></>
}

export default JobStopsLastStopListenerField
