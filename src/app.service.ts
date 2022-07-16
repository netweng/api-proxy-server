import { Injectable } from '@nestjs/common';
import { HttpService} from '@nestjs/axios'

export type TargetServer =  {
  url: string;
  credentials: string;
  headers: object;
  method: string;
  body: string;
}

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }
  async proxyServer(targetServer: TargetServer) {
    const data = await this.httpService.axiosRef.request({
      url: targetServer.url,
      method: targetServer.method,
      headers: targetServer.headers as any,
      data: targetServer.body
    }).catch(err => {
      return err.response;
    });
    return data?.data;
  }
}
