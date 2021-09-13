import { Injectable } from '@nestjs/common';
import { CommandService } from './command.service';

const BIN = '/opt/vc/bin/';
const WIFI_CMD = `iwconfig`;
const TEMP_CMD = `${BIN}vcgencmd measure_temp`;
const GPUSPEED_CMD = `${BIN}vcgencmd measure_clock core`;
const CPUSPEED_CMD = `${BIN}vcgencmd measure_clock arm`;
const CPUTHROTTLED_CMD = `${BIN}vcgencmd get_throttled`;
const CPUVOLTS_CMD = `${BIN}vcgencmd measure_volts`;
const MEMORY_CMD = `free -m | awk 'NR==2{print $7,$2} NR==3{print $2,$3}'`;

@Injectable()
export class AppService {
  constructor(private readonly command: CommandService) {}

  getSub(): any {
    return {
      temp: this.getTemp(),
      wifi: this.getWifi(),
      cpuSpeed: this.getCpuSpeed(),
      volts: this.getCpuVolts(),
      throttled: this.getThrottled(),
      memory: this.getMemory(),
    };
  }

  getCpuSpeed() {
    const res = this.command.tryExec(CPUSPEED_CMD);
    if (res === 'Unknown') {
      return res;
    }
    const speed = parseInt(res) / 1000 / 1000 / 1000;
    return `${speed.toFixed(2)} GHz`;
  }

  getGpuSpeed() {
    const res = this.command.tryExec(GPUSPEED_CMD);
    if (res === 'Unknown') {
      return res;
    }
    const speed = parseInt(res) / 1000 / 1000 / 1000;
    return `${speed.toFixed(2)} GHz`;
  }

  getCpuVolts() {
    return this.command.tryExec(CPUVOLTS_CMD);
  }

  getThrottled() {
    return this.command.tryExec(CPUTHROTTLED_CMD);
  }

  getTemp() {
    return this.command.tryExec(TEMP_CMD).replace(`'C`, '');
  }

  getWifi() {
    const wifi = this.command.tryExec(WIFI_CMD);
    if (wifi === 'Unknown') {
      return {
        speed: wifi,
        signal: wifi,
      };
    }
    const speedRegex = /Bit Rate=(\d+\s+(Mb|Gb)\/s)/g;
    const signalRegex = /Signal level=(-?\d+\s+dBm)/g;
    const speed = speedRegex.exec(wifi)[1];
    const signal = signalRegex.exec(wifi)[1];
    return {
      signal,
      speed,
    };
  }

  getMemory() {
    const mem = this.command.exec(MEMORY_CMD);
    if (mem === 'Unknown') {
      return {
        swap: mem,
        free: mem,
        total: mem,
      };
    }
    const rows = mem?.split('\n').map((val) => val.split(/\s+/));
    return {
      swap: rows?.[1]?.[1],
      swapTotal: rows?.[1]?.[0],
      free: rows?.[0]?.[0],
      total: rows?.[0]?.[1],
    };
  }
}
