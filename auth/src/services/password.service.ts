import { scrypt, randomBytes, scryptSync } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptSync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}

// import bcrypt from "bcrypt";

// export class Password {
//   static async toHash(password: string) {
//     const salt = await bcrypt.genSalt(10);
//     password = await bcrypt.hash(password, salt);
//     return password;
//   }

//   static async compare(storedPassword: string, suppliedPassword: string) {
//     return await bcrypt.compare(storedPassword, suppliedPassword);
//   }
// }
