import LokiTransport from 'winston-loki'
import { createLogger } from 'winston'

export const logger = createLogger({
  transports: [new LokiTransport({ host: 'http://127.0.0.1:3100'})]
})

logger.debug({ message: 'test', labels: { service: 'd1' } })
logger.info({ message: 'test', labels: { service: 'd1' } })
logger.error({ message: 'test', labels: { service: 'd1' } })

setTimeout(() => process.exit(0), 10000)
