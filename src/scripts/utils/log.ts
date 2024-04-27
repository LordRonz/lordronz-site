import chalk from 'chalk';
import { inspect } from 'util';

const sanitize = (...input: unknown[]) => {
  return input.map((obj) =>
    typeof obj === 'string' ? obj : inspect(obj, { colors: true, depth: null }),
  );
};

export const log = {
  error: (...data: unknown[]) => console.error(chalk.red(...sanitize(...data))),
  info: (...data: unknown[]) =>
    console.info(chalk.blueBright(...sanitize(...data))),
  success: (...data: unknown[]) =>
    console.log(chalk.greenBright(...sanitize(...data))),
  warn: (...data: unknown[]) =>
    console.warn(chalk.yellow(...sanitize(...data))),
};

export default log;
