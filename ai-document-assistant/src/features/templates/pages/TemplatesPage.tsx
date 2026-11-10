import { MOCK_TEMPLATES } from '@/features/templates/data/mockTemplates'
import { formatDate } from '@/shared/utils/format'
import styles from './TemplatesPage.module.scss'

export function TemplatesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Templates</h1>
        <p className={styles.subtitle}>
          Reusable starters by category. Leela Poluru approves version bumps.
        </p>
      </header>

      <div className={styles.grid}>
        {MOCK_TEMPLATES.map((tpl) => (
          <article key={tpl.id} className={styles.card}>
            <p className={styles.eyebrow}>
              {tpl.id} · {tpl.category}
            </p>
            <h2 className={styles.cardTitle}>{tpl.name}</h2>
            <dl className={styles.meta}>
              <div>
                <dt>Version</dt>
                <dd>v{tpl.version}</dd>
              </div>
              <div>
                <dt>Uses</dt>
                <dd>{tpl.uses}</dd>
              </div>
              <div>
                <dt>Owner</dt>
                <dd>{tpl.owner}</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>{formatDate(tpl.updatedAt)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  )
}
