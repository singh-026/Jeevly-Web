const avatarTones = ["bg-navy text-white", "bg-accent-soft text-navy", "bg-navy-100 text-navy", "bg-navy-700 text-white"];

type Member = { name: string; role: string };

export function TeamGrid({ members }: { members: Member[] }) {
  return (
    <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {members.map((member, i) => (
        <li key={member.name} className="flex flex-col items-center rounded-card border border-line bg-surface p-6 text-center">
          <span
            aria-hidden="true"
            className={`grid size-20 place-items-center rounded-full text-xl font-bold ${avatarTones[i % avatarTones.length]}`}
          >
            {initials(member.name)}
          </span>
          <p className="mt-4 font-semibold text-navy">{member.name}</p>
          <p className="text-sm text-muted">{member.role}</p>
        </li>
      ))}
    </ul>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}
