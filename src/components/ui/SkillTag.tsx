interface Props {
  skill: string
  index?: number
}

export function SkillTag({ skill, index = 0 }: Props) {
  return (
    <span
      className="inline-block px-3 py-1 text-xs font-mono font-medium rounded-full border border-surface-border bg-surface-subtle text-ink-secondary hover:border-accent hover:text-accent transition-colors duration-200 cursor-default"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {skill}
    </span>
  )
}
