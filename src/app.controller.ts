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
