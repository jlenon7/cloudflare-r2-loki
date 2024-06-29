import { Path } from '@athenna/common'
import { EnvHelper } from '@athenna/config'
import { createForR2, createForFilesystem } from '#src/template'

EnvHelper.resolveFilePath(Path.pwd('.env'))

if (process.argv.includes('r2')) {
  console.log('Creating loki-config.yaml for Cloudflare R2')
  await createForR2()
  console.log('Done!')
}

if (process.argv.includes('r2')) {
  console.log('Creating loki-config.yaml for local filesystem')
  await createForFilesystem()
  console.log('Done!')
}
