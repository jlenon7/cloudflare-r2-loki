import { logger } from '#src/logger'

logger.debug({ message: 'test', labels: { service: 'd1' } })
logger.info({ message: 'test', labels: { service: 'd1' } })
logger.error({ message: 'test', labels: { service: 'd1' } })

setTimeout(() => process.exit(0), 20000)
