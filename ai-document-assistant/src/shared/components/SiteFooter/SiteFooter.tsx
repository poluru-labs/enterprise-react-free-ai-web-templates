import styles from './SiteFooter.module.scss'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p>
        Created by{' '}
        <a href="https://polurus.com" target="_blank" rel="noreferrer">
          Subrahmanyam Poluru
        </a>
      </p>
      <p>
        Built with{' '}
        <a
          href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react"
          target="_blank"
          rel="noreferrer"
        >
          @poluru-labs/enterprise-design-system-react
        </a>
      </p>
    </footer>
  )
}
