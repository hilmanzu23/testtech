/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

export async function encodePassword(password: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hashSync(password, salt);
}

export async function comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
