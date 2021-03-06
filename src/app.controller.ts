import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMainPage(@Res() res): string {
    return res.render('index.hbs', this.appService.getSub());
  }

  @Get('/temp')
  getTemp() {
    return { data: this.appService.getTemp() };
  }

  @Get('/gpu')
  getGpuSpeed() {
    return {
      data: this.appService.getGpuSpeed(),
    };
  }

  @Get('/cpu')
  getCpuSpeed() {
    return {
      data: this.appService.getCpuSpeed(),
    };
  }

  @Get('/volts')
  getCpuVolts() {
    return { data: this.appService.getCpuVolts() };
  }

  @Get('/throttled')
  getThrottled() {
    return { data: this.appService.getThrottled() === '0x0' ? 'No' : 'Yes' };
  }

  @Get('/mem')
  getMemory() {
    return { data: this.appService.getMemory() };
  }

  @Get('/memFree')
  getMemoryFree() {
    return { data: this.appService.getMemory().free };
  }

  @Get('/memTotal')
  getMemoryTotal() {
    return { data: this.appService.getMemory().total };
  }

  @Get('/memSwap')
  getMemorySwap() {
    return { data: this.appService.getMemory().swap };
  }

  @Get('/memSwapTotal')
  getMemorySwapTotal() {
    return { data: this.appService.getMemory().swapTotal };
  }

  @Get('/wifi')
  getWifi() {
    return { data: this.appService.getWifi() };
  }

  @Get('/wifi-speed')
  getWifiSpeed() {
    return { data: this.appService.getWifi().speed };
  }

  @Get('/wifi-signal')
  getWifiSignal() {
    return { data: this.appService.getWifi().signal };
  }
}
