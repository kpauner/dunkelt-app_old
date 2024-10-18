import { CharacterResponseType } from "@/types/characters";
import { Session } from "next-auth";

// Utility function to check if the current user is the owner of the character
export function isCharacterOwner(
  character: CharacterResponseType,
  session: Session | null
): boolean {
  return session?.user?.id === character.userId;
}

// Higher-order component for conditional rendering based on character ownership
export function withCharacterOwnership<P extends object>(
  children: React.ReactNode,
  session: Session | null,
  character: CharacterResponseType
): React.FC<P> {
  return function WithCharacterOwnership(props: P) {
    if (isCharacterOwner(character, session)) {
      return children;
    }
    return null;
  };
}
