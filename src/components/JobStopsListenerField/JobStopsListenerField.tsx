import type { UIFieldServerComponent } from 'payload'
import JobStopsListenerFieldEffect from './JobStopsListenerFieldEffect'

const JobStopsListenerField: UIFieldServerComponent = async ({ payload }) => {
  const warehouse =
    (
      await payload.find({
        collection: 'addresses',
        where: {
          type: {
            equals: 'warehouse',
          },
        },
        limit: 1,
      })
    ).docs[0] ?? null

  if (!warehouse) {
    return null
  }

  return <JobStopsListenerFieldEffect warehouse={warehouse} />
}

export default JobStopsListenerField
