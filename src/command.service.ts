import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class CommandService {
  exec(cmd = '', def = 'Unknown') {
    try {
      const out = execSync(cmd);
      return out.toString('utf8');
    } catch (err) {
      return def;
    }
  }

  tryExec(cmd = '', def = 'Unknown') {
    try {
      const out = execSync(cmd);
      return this.grab(out.toString('utf8')).value;
    } catch (err) {
      return def;
    }
  }

  private grab(stdout = '') {
    const output = /(\S+)=(\S+)/.exec(stdout);
    return {
      key: output?.[1],
      value: output?.[2],
    };
  }
}
