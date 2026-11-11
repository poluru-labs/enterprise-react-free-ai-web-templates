import type { DiffLine, Severity } from '@/core'

export function diffLines(before: string, after: string): DiffLine[] {
  const a = before.split('\n')
  const b = after.split('\n')
  const lcs: number[][] = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0))

  for (let i = a.length - 1; i >= 0; i -= 1) {
    for (let j = b.length - 1; j >= 0; j -= 1) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1])
    }
  }

  const lines: DiffLine[] = []
  let i = 0
  let j = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      lines.push({ kind: 'context', oldNumber: i + 1, newNumber: j + 1, text: a[i] })
      i += 1
      j += 1
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      lines.push({ kind: 'remove', oldNumber: i + 1, newNumber: null, text: a[i] })
      i += 1
    } else {
      lines.push({ kind: 'add', oldNumber: null, newNumber: j + 1, text: b[j] })
      j += 1
    }
  }
  while (i < a.length) {
    lines.push({ kind: 'remove', oldNumber: i + 1, newNumber: null, text: a[i] })
    i += 1
  }
  while (j < b.length) {
    lines.push({ kind: 'add', oldNumber: null, newNumber: j + 1, text: b[j] })
    j += 1
  }
  return lines
}

export function toUnifiedPatch(file: string, before: string, after: string): string {
  const lines = diffLines(before, after)
  const oldCount = before.split('\n').length
  const newCount = after.split('\n').length
  const body = lines
    .map((line) => `${line.kind === 'add' ? '+' : line.kind === 'remove' ? '-' : ' '}${line.text}`)
    .join('\n')
  return `--- a/${file}\n+++ b/${file}\n@@ -1,${oldCount} +1,${newCount} @@\n${body}\n`
}

export const SEVERITY_ORDER: Severity[] = ['critical', 'high', 'medium', 'low', 'info']

export function severityRank(severity: Severity): number {
  return SEVERITY_ORDER.indexOf(severity)
}
