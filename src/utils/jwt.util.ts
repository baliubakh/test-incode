import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

const { TOKEN_SECRET } = config;

class JwtUtil {
  public generateAccessToken(email: string, role: string) {
    return jwt.sign({ email, role }, TOKEN_SECRET as string, {
      expiresIn: "1h",
    });
  }

  public validateToken(token: string): JwtPayload | string {
    try {
      return jwt.verify(token, TOKEN_SECRET as string);
    } catch (e) {
      return { status: 401, message: "Invalid Token" };
    }
  }
}

export const jwtUtil = new JwtUtil();
