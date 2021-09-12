import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class CommandService {
  tryExec(cmd = '', def = 'Unknown') {
    try {
      const out = execSync(cmd);
      return this.grab(out.toString('utf8')).value;
    } catch (err) {
      return def;
    }
  }

  private grab(stdout = '') {
    // frequency=20
    const output = /(\S+)=(\w+)/.exec(stdout);
    return {
      key: output?.[1],
      value: output?.[2],
    };
  }
}
