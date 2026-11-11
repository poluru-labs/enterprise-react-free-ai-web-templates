import { useMemo, useState } from 'react'
import type { ToolNode, ToolNodeKind } from '@/core'
import { MOCK_GRAPH } from '@/features/tool-graph/data/mockGraph'
import { StatusBadge, cn, formatDuration, type StatusTone } from '@/shared'
import styles from './ToolGraphPage.module.scss'

const NODE_WIDTH = 176
const NODE_HEIGHT = 56
const COLUMN_GAP = 256
const ROW_GAP = 96
const PADDING = 24

const KIND_TONE: Record<ToolNodeKind, StatusTone> = {
  trigger: 'neutral',
  prompt: 'brand',
  tool: 'success',
  guard: 'warning',
  output: 'neutral',
}

function nodePosition(node: ToolNode) {
  return {
    x: PADDING + node.column * COLUMN_GAP,
    y: PADDING + node.row * ROW_GAP,
  }
}

export function ToolGraphPage() {
  const graph = MOCK_GRAPH
  const [selectedId, setSelectedId] = useState(graph.nodes[1]?.id ?? '')

  const nodesById = useMemo(
    () => new Map(graph.nodes.map((node) => [node.id, node])),
    [graph.nodes],
  )

  const columns = Math.max(...graph.nodes.map((node) => node.column)) + 1
  const rows = Math.max(...graph.nodes.map((node) => node.row)) + 1
  const width = PADDING * 2 + (columns - 1) * COLUMN_GAP + NODE_WIDTH
  const height = PADDING * 2 + (rows - 1) * ROW_GAP + NODE_HEIGHT

  const selected = nodesById.get(selectedId)
  const upstream = graph.edges
    .filter((edge) => edge.to === selectedId)
    .map((edge) => nodesById.get(edge.from)?.label)
  const downstream = graph.edges
    .filter((edge) => edge.from === selectedId)
    .map((edge) => nodesById.get(edge.to)?.label)
  const criticalPathMs = graph.nodes.reduce((sum, node) => sum + node.latencyMs, 0)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Tool graph</h1>
          <p className={styles.subtitle}>
            {graph.agentName} · {graph.version} · {graph.nodes.length} nodes ·{' '}
            {graph.edges.length} connections
          </p>
        </div>
        <ul className={styles.legend} aria-label="Node types">
          {(Object.keys(KIND_TONE) as ToolNodeKind[]).map((kind) => (
            <li key={kind}>
              <StatusBadge tone={KIND_TONE[kind]}>{kind}</StatusBadge>
            </li>
          ))}
        </ul>
      </header>

      <div className={styles.layout}>
        <section className={styles.canvas} aria-label="Agent tool graph">
          <svg
            className={styles.svg}
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            role="group"
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" className={styles.arrowHead} />
              </marker>
            </defs>

            {graph.edges.map((edge) => {
              const from = nodesById.get(edge.from)
              const to = nodesById.get(edge.to)
              if (!from || !to) return null

              const start = nodePosition(from)
              const end = nodePosition(to)
              const x1 = start.x + NODE_WIDTH
              const y1 = start.y + NODE_HEIGHT / 2
              const x2 = end.x
              const y2 = end.y + NODE_HEIGHT / 2
              const sameColumn = from.column === to.column
              const path = sameColumn
                ? `M ${start.x + NODE_WIDTH / 2} ${start.y} L ${end.x + NODE_WIDTH / 2} ${end.y + NODE_HEIGHT}`
                : `M ${x1} ${y1} C ${x1 + 48} ${y1}, ${x2 - 48} ${y2}, ${x2} ${y2}`
              const active = edge.from === selectedId || edge.to === selectedId

              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <path
                    d={path}
                    className={cn(styles.edge, active && styles.edgeActive)}
                    markerEnd="url(#arrow)"
                  />
                  {edge.label && (
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 - 6}
                      className={styles.edgeLabel}
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              )
            })}

            {graph.nodes.map((node) => {
              const { x, y } = nodePosition(node)
              const isSelected = node.id === selectedId

              return (
                <g
                  key={node.id}
                  transform={`translate(${x} ${y})`}
                  className={cn(styles.node, styles[node.kind], isSelected && styles.nodeSelected)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`${node.label}, ${node.kind}`}
                  onClick={() => setSelectedId(node.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setSelectedId(node.id)
                    }
                  }}
                >
                  <rect width={NODE_WIDTH} height={NODE_HEIGHT} rx={10} className={styles.nodeBox} />
                  <rect width={4} height={NODE_HEIGHT} rx={2} className={styles.nodeStripe} />
                  <text x={16} y={23} className={styles.nodeLabel}>
                    {node.label}
                  </text>
                  <text x={16} y={41} className={styles.nodeMeta}>
                    {node.kind} · {formatDuration(node.latencyMs)}
                  </text>
                </g>
              )
            })}
          </svg>
        </section>

        <aside className={styles.panel} aria-label="Node details">
          {selected ? (
            <>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>{selected.label}</h2>
                <StatusBadge tone={KIND_TONE[selected.kind]}>{selected.kind}</StatusBadge>
              </div>
              <p className={styles.panelText}>{selected.description}</p>
              <dl className={styles.details}>
                <dt>Median latency</dt>
                <dd>{formatDuration(selected.latencyMs)}</dd>
                <dt>Inputs from</dt>
                <dd>{upstream.length ? upstream.join(', ') : 'None (entry point)'}</dd>
                <dt>Outputs to</dt>
                <dd>{downstream.length ? downstream.join(', ') : 'None (terminal)'}</dd>
              </dl>
            </>
          ) : (
            <p className={styles.panelText}>Select a node to inspect it.</p>
          )}
          <p className={styles.panelFoot}>
            Sum of node latency: {formatDuration(criticalPathMs)}
          </p>
        </aside>
      </div>
    </div>
  )
}
