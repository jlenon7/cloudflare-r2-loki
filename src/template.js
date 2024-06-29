import { File, Path } from '@athenna/common'
import { ViewImpl } from '@athenna/view'

const view = new ViewImpl()

export async function createForR2() {
  const content = await view.renderRawByPath(Path.resources('templates/loki-r2.edge'), process.env)

  return new File(Path.pwd('loki-config.yaml'), content).setContent(content)
}

export async function createForFilesystem() {
  const content = await view.renderRawByPath(Path.resources('templates/loki-fs.edge'), process.env)

  return new File(Path.pwd('loki-config.yaml'), content).setContent(content)
}
