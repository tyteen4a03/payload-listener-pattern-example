'use client'

import { useField, useForm, useFormFields } from '@payloadcms/ui'
import { useEffect } from 'react'

const NumberAdderListenerField = () => {
  const numberOne = useFormFields(([fields]) => fields.numberOne)
  const numberTwo = useFormFields(([fields]) => fields.numberTwo)
  const { dispatchFields } = useForm()
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
    if (formInitializing) {
      // Don't run if form is still initializing
      return
    }

    console.log('my listener is being run')

    const newValue = parseFloat(numberOne.value as string) + parseFloat(numberTwo.value as string)
    if (Number.isNaN(newValue)) {
      return
    }

    dispatchFields({
      type: 'UPDATE',
      path: 'numberThree',
      value: newValue,
    })
  }, [numberOne.value, numberTwo.value, dispatchFields, formInitializing])

  return <></>
}

export default NumberAdderListenerField
