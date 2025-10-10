import type { Member } from "@/types/data/member";

interface Props {
  member: Member;
}

function MemberCard({ member }: Props) {
  return (
    <div
      key={member.name}
      className="flex flex-col items-center space-y-4 transition hover:scale-105"
    >
      <div className="relative h-40 w-40 overflow-hidden rounded-full">
        <img src={member.img} alt={member.name} className="object-cover" />
      </div>
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold text-blue-500">{member.name}</h3>
        <p className="text-sm text-blue-500 font-medium">{member.role}</p>
      </div>
    </div>
  );
}

export default MemberCard;
