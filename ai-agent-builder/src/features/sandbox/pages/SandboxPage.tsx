import { useEffect, useRef, useState } from 'react'
import type { RunStatus, SandboxRun } from '@/core'
import { MOCK_RUNS, SCENARIOS, buildSteps } from '@/features/sandbox/data/mockRuns'
import {
  Button,
  StatusBadge,
  cn,
  formatDuration,
  formatRelativeTime,
  type StatusTone,
} from '@/shared'
import styles from './SandboxPage.module.scss'

const RUN_TONE: Record<RunStatus, StatusTone> = {
  passed: 'success',
  failed: 'danger',
  running: 'brand',
}

const SIMULATED_RUN_MS = 1500

export function SandboxPage() {
  const [runs, setRuns] = useState<SandboxRun[]>(MOCK_RUNS)
  const [selectedId, setSelectedId] = useState(MOCK_RUNS[0]?.id ?? '')
  const [scenario, setScenario] = useState<string>(SCENARIOS[0])
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const selected = runs.find((run) => run.id === selectedId)
  const isRunning = runs.some((run) => run.status === 'running')
  const finished = runs.filter((run) => run.status !== 'running')
  const passRate = finished.length
    ? Math.round((finished.filter((run) => run.status === 'passed').length / finished.length) * 100)
    : 0

  const startRun = () => {
    const nextNumber = 1043 + runs.length - MOCK_RUNS.length
    const id = `run-${nextNumber}`
    const failed = scenario.toLowerCase().includes('refund')

    setRuns((current) => [
      {
        id,
        scenario,
        agentVersion: 'v1.9.0-rc.1',
        status: 'running',
        tokens: 0,
        durationMs: 0,
        startedAt: new Date().toISOString(),
        triggeredBy: 'You',
        steps: [],
      },
      ...current,
    ])
    setSelectedId(id)

    timer.current = window.setTimeout(() => {
      const steps = buildSteps(scenario, failed)
      setRuns((current) =>
        current.map((run) =>
          run.id === id
            ? {
                ...run,
                status: failed ? 'failed' : 'passed',
                tokens: 2400 + Math.round(Math.random() * 1200),
                durationMs: steps.reduce((sum, step) => sum + step.durationMs, 0),
                steps,
              }
            : run,
        ),
      )
    }, SIMULATED_RUN_MS)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Sandbox test runs</h1>
          <p className={styles.subtitle}>
            Replay scenarios against a candidate version with mocked tools before
            promoting it. Pass rate across recent runs: {passRate}%.
          </p>
        </div>
        <div className={styles.runner}>
          <select
            className={styles.select}
            aria-label="Scenario"
            value={scenario}
            onChange={(event) => setScenario(event.target.value)}
          >
            {SCENARIOS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Button onClick={startRun} disabled={isRunning}>
            {isRunning ? 'Running…' : 'Run test'}
          </Button>
        </div>
      </header>

      <div className={styles.layout}>
        <ul className={styles.runList} aria-label="Recent runs">
          {runs.map((run) => (
            <li key={run.id}>
              <button
                type="button"
                className={cn(styles.runItem, run.id === selectedId && styles.runItemActive)}
                aria-current={run.id === selectedId ? 'true' : undefined}
                onClick={() => setSelectedId(run.id)}
              >
                <span className={styles.runTop}>
                  <span className={styles.runId}>{run.id}</span>
                  <StatusBadge tone={RUN_TONE[run.status]}>{run.status}</StatusBadge>
                </span>
                <span className={styles.runScenario}>{run.scenario}</span>
                <span className={styles.runMeta}>
                  {run.agentVersion} · {formatRelativeTime(run.startedAt)}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <section className={styles.trace} aria-label="Run trace" aria-live="polite">
          {selected ? (
            <>
              <div className={styles.traceHeader}>
                <h2 className={styles.traceTitle}>{selected.scenario}</h2>
                <StatusBadge tone={RUN_TONE[selected.status]}>{selected.status}</StatusBadge>
              </div>
              <dl className={styles.stats}>
                <div>
                  <dt>Version</dt>
                  <dd>{selected.agentVersion}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{selected.status === 'running' ? '—' : formatDuration(selected.durationMs)}</dd>
                </div>
                <div>
                  <dt>Tokens</dt>
                  <dd>{selected.status === 'running' ? '—' : selected.tokens.toLocaleString()}</dd>
                </div>
                <div>
                  <dt>Triggered by</dt>
                  <dd>{selected.triggeredBy}</dd>
                </div>
              </dl>

              {selected.status === 'running' ? (
                <p className={styles.pending}>Executing steps in the sandbox…</p>
              ) : (
                <ol className={styles.steps}>
                  {selected.steps.map((step) => (
                    <li key={step.id} className={cn(styles.step, styles[step.status])}>
                      <div className={styles.stepTop}>
                        <span className={styles.stepNode}>{step.node}</span>
                        <span className={styles.stepTime}>{formatDuration(step.durationMs)}</span>
                      </div>
                      <p className={styles.stepNote}>{step.note}</p>
                    </li>
                  ))}
                </ol>
              )}
            </>
          ) : (
            <p className={styles.pending}>Select a run to view its trace.</p>
          )}
        </section>
      </div>
    </div>
  )
}
