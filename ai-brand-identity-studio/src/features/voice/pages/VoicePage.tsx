import { useMemo, useState } from 'react'
import {
  SAMPLE_COPY,
  TONE_BY_CHANNEL,
  VOCABULARY,
  VOICE_ATTRIBUTES,
} from '@/features/voice/data/mockVoice'
import { StatusBadge } from '@/shared'
import styles from './VoicePage.module.scss'

const SCALE = [1, 2, 3, 4, 5] as const

function findIssues(copy: string) {
  const lower = copy.toLowerCase()
  const issues = VOCABULARY.filter((rule) =>
    new RegExp(`\\b${rule.avoid.replace('-', '\\-')}\\b`).test(lower),
  )
  const exclamations = (copy.match(/!/g) ?? []).length
  return { issues, exclamations }
}

export function VoicePage() {
  const [copy, setCopy] = useState(SAMPLE_COPY)
  const { issues, exclamations } = useMemo(() => findIssues(copy), [copy])
  const total = issues.length + (exclamations > 0 ? 1 : 0)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Voice guidelines</h1>
        <p className={styles.subtitle}>
          How the brand sounds across channels, with a vocabulary check you can
          run on any draft before it ships.
        </p>
      </header>

      <section className={styles.attributes} aria-label="Voice attributes">
        {VOICE_ATTRIBUTES.map((attribute) => (
          <article key={attribute.id} className={styles.attribute}>
            <h2 className={styles.trait}>{attribute.trait}</h2>
            <dl className={styles.pairs}>
              <dt>We are</dt>
              <dd>{attribute.weAre}</dd>
              <dt>We are not</dt>
              <dd>{attribute.weAreNot}</dd>
            </dl>
            <p className={styles.example}>“{attribute.example}”</p>
          </article>
        ))}
      </section>

      <div className={styles.split}>
        <section className={styles.panel} aria-labelledby="tone-heading">
          <h2 id="tone-heading" className={styles.panelTitle}>
            Tone by channel
          </h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Channel</th>
                <th scope="col">Formality</th>
                <th scope="col">Warmth</th>
              </tr>
            </thead>
            <tbody>
              {TONE_BY_CHANNEL.map((row) => (
                <tr key={row.channel}>
                  <td>
                    <span className={styles.channel}>{row.channel}</span>
                    <span className={styles.guidance}>{row.guidance}</span>
                  </td>
                  <td>
                    <span className={styles.dots} aria-label={`${row.formality} of 5`}>
                      {SCALE.map((n) => (
                        <span key={n} className={n <= row.formality ? styles.dotOn : styles.dot} />
                      ))}
                    </span>
                  </td>
                  <td>
                    <span className={styles.dots} aria-label={`${row.warmth} of 5`}>
                      {SCALE.map((n) => (
                        <span key={n} className={n <= row.warmth ? styles.dotOn : styles.dot} />
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.panel} aria-labelledby="check-heading">
          <div className={styles.panelHead}>
            <h2 id="check-heading" className={styles.panelTitle}>
              Copy check
            </h2>
            <StatusBadge tone={total === 0 ? 'success' : 'warning'}>
              {total === 0 ? 'on voice' : `${total} issue${total === 1 ? '' : 's'}`}
            </StatusBadge>
          </div>
          <label className={styles.label} htmlFor="copy-input">
            Paste a draft
          </label>
          <textarea
            id="copy-input"
            className={styles.textarea}
            rows={5}
            value={copy}
            onChange={(event) => setCopy(event.target.value)}
          />
          <ul className={styles.issues} aria-live="polite">
            {issues.map((rule) => (
              <li key={rule.avoid} className={styles.issue}>
                <span>
                  <s>{rule.avoid}</s> → <strong>{rule.prefer}</strong>
                </span>
                <span className={styles.reason}>{rule.reason}</span>
              </li>
            ))}
            {exclamations > 0 && (
              <li className={styles.issue}>
                <span>
                  <strong>{exclamations}</strong> exclamation mark{exclamations === 1 ? '' : 's'}
                </span>
                <span className={styles.reason}>Keep emphasis in the words, not punctuation.</span>
              </li>
            )}
            {total === 0 && <li className={styles.clean}>No vocabulary issues found.</li>}
          </ul>
        </section>
      </div>
    </div>
  )
}
