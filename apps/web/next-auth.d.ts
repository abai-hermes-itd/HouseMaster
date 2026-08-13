import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      realm: string;   // "admin" | "user" (контур, ADR-0004)
      domain: string;  // hd из Google Workspace токена
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    realm?: string;
    domain?: string;
  }
}
