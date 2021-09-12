import { Injectable } from '@nestjs/common';
import { CommandService } from './command.service';

const BIN = '/opt/vc/bin/';
const WIFI_CMD = `iwconfig`;
const TEMP_CMD = `${BIN}vcgencmd measure_temp`;
const GPUSPEED_CMD = `${BIN}vcgencmd measure_clock core`;
const CPUSPEED_CMD = `${BIN}vcgencmd measure_clock arm`;
const CPUTHROTTLED_CMD = `${BIN}vcgencmd get_throttled`;
const CPUVOLTS_CMD = `${BIN}vcgencmd measure_volts`;

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
    return this.command.tryExec(TEMP_CMD);
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
}
