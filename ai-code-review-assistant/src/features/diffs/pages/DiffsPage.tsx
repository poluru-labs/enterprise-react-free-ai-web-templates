import { useMemo, useState } from 'react'
import type { ReviewComment, Severity } from '@/core'
import { MOCK_COMMENTS, MOCK_PR } from '@/features/diffs/data/mockPullRequest'
import { Button, DiffView, SeverityBadge, SEVERITY_ORDER, cn, diffLines } from '@/shared'
import styles from './DiffsPage.module.scss'

export function DiffsPage() {
  const pr = MOCK_PR
  const [activePath, setActivePath] = useState(pr.files[0].path)
  const [comments, setComments] = useState<ReviewComment[]>(MOCK_COMMENTS)
  const [draftLine, setDraftLine] = useState<number | null>(null)
  const [draft, setDraft] = useState('')
  const [draftSeverity, setDraftSeverity] = useState<Severity>('medium')

  const file = pr.files.find((item) => item.path === activePath) ?? pr.files[0]
  const lines = useMemo(() => diffLines(file.before, file.after), [file])
  const added = lines.filter((line) => line.kind === 'add').length
  const removed = lines.filter((line) => line.kind === 'remove').length
  const fileComments = comments.filter((comment) => comment.file === file.path)
  const openCount = comments.filter((comment) => !comment.resolved).length

  const toggleResolved = (id: string) =>
    setComments((current) =>
      current.map((comment) => (comment.id === id ? { ...comment, resolved: !comment.resolved } : comment)),
    )

  const submit = () => {
    if (draftLine === null || !draft.trim()) return
    setComments((current) => [
      ...current,
      {
        id: `c-${Date.now()}`,
        file: file.path,
        line: draftLine,
        author: 'You',
        body: draft.trim(),
        severity: draftSeverity,
        resolved: false,
      },
    ])
    setDraft('')
    setDraftLine(null)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            #{pr.number} · {pr.branch}
          </p>
          <h1 className={styles.title}>{pr.title}</h1>
          <p className={styles.subtitle}>
            Opened by {pr.author} · {pr.files.length} files · {openCount} open comments. Click a
            line number to comment on that line.
          </p>
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.files} aria-label="Changed files">
          {pr.files.map((item) => {
            const count = comments.filter((comment) => comment.file === item.path && !comment.resolved).length
            return (
              <button
                key={item.path}
                type="button"
                className={cn(styles.file, item.path === file.path && styles.fileActive)}
                aria-current={item.path === file.path ? 'true' : undefined}
                onClick={() => {
                  setActivePath(item.path)
                  setDraftLine(null)
                }}
              >
                <span className={styles.filePath}>{item.path}</span>
                {count > 0 && <span className={styles.fileCount}>{count}</span>}
              </button>
            )
          })}
        </nav>

        <section className={styles.diff} aria-label={`Diff for ${file.path}`}>
          <div className={styles.diffHead}>
            <code>{file.path}</code>
            <span className={styles.stat}>
              <span className={styles.plus}>+{added}</span> <span className={styles.minus}>−{removed}</span>
            </span>
          </div>
          <DiffView
            lines={lines}
            label={`Changes in ${file.path}`}
            selectedLine={draftLine}
            onLineSelect={(line) => setDraftLine(line.newNumber)}
            renderAfter={(line) => {
              if (line.newNumber === null) return null
              const here = fileComments
                .filter((comment) => comment.line === line.newNumber)
                .sort((a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity))
              const drafting = draftLine === line.newNumber
              if (here.length === 0 && !drafting) return null
              return (
                <div className={styles.thread}>
                  {here.map((comment) => (
                    <article key={comment.id} className={cn(styles.comment, comment.resolved && styles.resolved)}>
                      <div className={styles.commentHead}>
                        <SeverityBadge severity={comment.severity} />
                        <span className={styles.author}>{comment.author}</span>
                        <button
                          type="button"
                          className={styles.resolve}
                          onClick={() => toggleResolved(comment.id)}
                        >
                          {comment.resolved ? 'Reopen' : 'Resolve'}
                        </button>
                      </div>
                      <p className={styles.body}>{comment.body}</p>
                    </article>
                  ))}
                  {drafting && (
                    <div className={styles.composer}>
                      <label className={styles.srOnly} htmlFor="draft-comment">
                        Comment on line {draftLine}
                      </label>
                      <textarea
                        id="draft-comment"
                        className={styles.textarea}
                        rows={3}
                        value={draft}
                        placeholder={`Comment on line ${draftLine}`}
                        onChange={(event) => setDraft(event.target.value)}
                        autoFocus
                      />
                      <div className={styles.composerActions}>
                        <select
                          className={styles.select}
                          aria-label="Severity"
                          value={draftSeverity}
                          onChange={(event) => setDraftSeverity(event.target.value as Severity)}
                        >
                          {SEVERITY_ORDER.map((severity) => (
                            <option key={severity} value={severity}>
                              {severity}
                            </option>
                          ))}
                        </select>
                        <Button size="sm" variant="ghost" onClick={() => setDraftLine(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={submit} disabled={!draft.trim()}>
                          Add comment
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )
            }}
          />
        </section>
      </div>
    </div>
  )
}
