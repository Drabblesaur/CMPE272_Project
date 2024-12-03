import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatar = ({ user }) => (
  <Avatar className="h-8 w-8 rounded-lg">
    <AvatarImage src={user.avatar_url} alt={user.name} />
    <AvatarFallback className="rounded-lg">
      {user.name
        .split(" ")
        .map((n) => n[0])
        .join("")}
    </AvatarFallback>
  </Avatar>
);
