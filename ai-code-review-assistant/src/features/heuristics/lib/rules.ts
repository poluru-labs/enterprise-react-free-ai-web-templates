import type { HeuristicMatch, HeuristicRule } from '@/core'

export const HEURISTIC_RULES: HeuristicRule[] = [
  {
    id: 'sql-interpolation',
    name: 'SQL built with string interpolation',
    category: 'security',
    severity: 'critical',
    pattern: '(select|insert|update|delete)\\b[^\\n]*(\\$\\{|\'\\s*\\+|"\\s*\\+)',
    flags: 'i',
    message: 'Use parameterized queries instead of concatenating input into SQL.',
  },
  {
    id: 'hardcoded-secret',
    name: 'Hard-coded secret',
    category: 'security',
    severity: 'critical',
    pattern: '(api[_-]?key|secret|password|token)\\s*[:=]\\s*[\'"][^\'"]{8,}[\'"]',
    flags: 'i',
    message: 'Load secrets from the server environment or a secret manager.',
  },
  {
    id: 'eval',
    name: 'Dynamic code execution',
    category: 'security',
    severity: 'high',
    pattern: '\\beval\\s*\\(|new\\s+Function\\s*\\(',
    message: 'eval and new Function execute arbitrary strings; remove or sandbox.',
  },
  {
    id: 'inner-html',
    name: 'Unsanitized HTML injection',
    category: 'security',
    severity: 'high',
    pattern: '\\.innerHTML\\s*=|dangerouslySetInnerHTML',
    message: 'Sanitize HTML (for example with DOMPurify) before inserting it.',
  },
  {
    id: 'console-log',
    name: 'Console logging left in',
    category: 'maintainability',
    severity: 'low',
    pattern: '\\bconsole\\.(log|debug)\\(',
    message: 'Remove debug logging or route it through the app logger.',
  },
  {
    id: 'any-type',
    name: 'Explicit any',
    category: 'maintainability',
    severity: 'medium',
    pattern: ':\\s*any\\b|as\\s+any\\b',
    message: 'Replace any with a specific type or unknown plus narrowing.',
  },
  {
    id: 'empty-catch',
    name: 'Swallowed error',
    category: 'bug',
    severity: 'medium',
    pattern: 'catch\\s*(\\([^)]*\\))?\\s*\\{\\s*\\}',
    message: 'Empty catch blocks hide failures; log or rethrow.',
  },
  {
    id: 'todo',
    name: 'Unresolved TODO',
    category: 'style',
    severity: 'info',
    pattern: '\\b(TODO|FIXME|HACK)\\b',
    message: 'Track follow-ups in an issue and link it here.',
  },
  {
    id: 'loose-equality',
    name: 'Loose equality',
    category: 'bug',
    severity: 'low',
    pattern: '[^=!]==[^=]|!=[^=]',
    message: 'Use === and !== to avoid type coercion surprises.',
  },
]

export function scan(source: string, rules: HeuristicRule[]): HeuristicMatch[] {
  const matches: HeuristicMatch[] = []
  const lines = source.split('\n')
  for (const rule of rules) {
    const regex = new RegExp(rule.pattern, rule.flags)
    lines.forEach((text, index) => {
      if (regex.test(text)) {
        matches.push({ ruleId: rule.id, line: index + 1, excerpt: text.trim() })
      }
    })
  }
  return matches
}

export const SAMPLE_SOURCE = [
  "const API_KEY = 'demo-not-a-real-key-0000'",
  '',
  'export async function search(term: any) {',
  '  // TODO: paginate results',
  '  const sql = "select * from users where name = \'" + term + "\'"',
  '  try {',
  '    const rows = await db.query(sql)',
  '    if (rows.length == 0) return []',
  '    console.log(rows)',
  '    resultsEl.innerHTML = rows.map(render).join("")',
  '    return rows',
  '  } catch (e) {}',
  '}',
].join('\n')
